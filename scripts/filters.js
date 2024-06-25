document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const filterSalary = document.getElementById('filter-salary');
    const filterDepartment = document.getElementById('filter-department');
    const applyFiltersButton = document.getElementById('apply-filters');
    const output = document.getElementById('output') || document.getElementById('tax-output');
    let employees = []; // Store fetched employees data

    // Check which page we're on
    const isTaxPage = window.location.pathname.includes('taxes.html');

    // Function to fetch and display employees
    async function fetchAndDisplayEmployees() {
        const url = 'https://randomuser.me/api/?results=10';
        try {
            const response = await fetch(url);
            const data = await response.json();
            employees = data.results; // Store data
            displayEmployees(employees); // Display all employees initially
        } catch (error) {
            console.error('Error fetching employee data:', error);
            output.textContent = 'Failed to load employee data.';
        }
    }

    // Function to display employees based on filters
    function displayEmployees(filteredEmployees) {
        output.innerHTML = ''; // Clear previous results
        filteredEmployees.forEach(employee => {
            const salary = Math.floor(Math.random() * (250000 - 50000 + 1) + 50000); // Random salary between 50,000 and 250,000

            // Create a container for each employee's info
            const employeeDiv = document.createElement('div');
            employeeDiv.classList.add('employee-info');

            // Name
            const nameDiv = document.createElement('div');
            nameDiv.textContent = `${employee.name.first} ${employee.name.last}`;
            employeeDiv.appendChild(nameDiv);

            // Image
            const image = document.createElement('img');
            image.setAttribute('src', employee.picture.large);
            image.setAttribute('alt', `Picture of ${employee.name.first} ${employee.name.last}`);
            employeeDiv.appendChild(image);

            // Salary
            const salaryDiv = document.createElement('div');
            salaryDiv.textContent = `Salary: ${salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
            employeeDiv.appendChild(salaryDiv);

            // Department (only on index page)
            if (!isTaxPage) {
                const department = getRandomDepartment(); // Function to assign a random department
                const departmentDiv = document.createElement('div');
                departmentDiv.textContent = `Department: ${department}`;
                employeeDiv.appendChild(departmentDiv);
            }

            // Append to the output container
            output.appendChild(employeeDiv);
        });
    }

    // Function to get a random department
    function getRandomDepartment() {
        const departments = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance'];
        return departments[Math.floor(Math.random() * departments.length)];
    }

    // Filter employees based on search and selected filters
    function filterEmployees() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSalaryRange = filterSalary.value;
        const selectedDepartment = filterDepartment.value;

        const filtered = employees.filter(employee => {
            const fullName = `${employee.name.first} ${employee.name.last}`.toLowerCase();
            const salary = Math.floor(Math.random() * (250000 - 50000 + 1) + 50000);
            const department = getRandomDepartment();

            let matchesSearch = fullName.includes(searchTerm);
            let matchesSalary = true;
            let matchesDepartment = true;

            if (selectedSalaryRange) {
                const [minSalary, maxSalary] = selectedSalaryRange.split('-').map(Number);
                matchesSalary = salary >= minSalary && salary <= maxSalary;
            }

            if (selectedDepartment && !isTaxPage) {
                matchesDepartment = department === selectedDepartment;
            }

            return matchesSearch && matchesSalary && (matchesDepartment || isTaxPage);
        });

        displayEmployees(filtered);
    }

    // Event listener for the apply filters button
    applyFiltersButton.addEventListener('click', filterEmployees);

    // Fetch and display employees on page load
    fetchAndDisplayEmployees();
});


