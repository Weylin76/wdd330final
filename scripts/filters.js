document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const filterDepartment = document.getElementById('filter-department');
    const applyFiltersButton = document.getElementById('apply-filters');
    const output = document.getElementById('output');
    let employees = []; // Store fetched employees data

    // Function to fetch and display employees
    async function fetchAndDisplayEmployees() {
        const url = 'https://randomuser.me/api/?results=10';
        try {
            const response = await fetch(url);
            const data = await response.json();
            employees = data.results.map(employee => ({
                ...employee,
                department: getRandomDepartment(), // Assign a random department to each employee
                salary: Math.floor(Math.random() * (250000 - 50000 + 1) + 50000) // Assign a random salary
            }));
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
            salaryDiv.textContent = `Salary: ${employee.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
            employeeDiv.appendChild(salaryDiv);

            // Department
            const departmentDiv = document.createElement('div');
            departmentDiv.textContent = `Department: ${employee.department}`;
            employeeDiv.appendChild(departmentDiv);

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
        const selectedDepartment = filterDepartment.value;

        const filtered = employees.filter(employee => {
            const fullName = `${employee.name.first} ${employee.name.last}`.toLowerCase();
            let matchesSearch = fullName.includes(searchTerm);
            let matchesDepartment = selectedDepartment ? employee.department === selectedDepartment : true;

            return matchesSearch && matchesDepartment;
        });

        displayEmployees(filtered);
    }

    // Event listener for the apply filters button
    applyFiltersButton.addEventListener('click', filterEmployees);

    // Event listener for the search input to filter as you type
    searchInput.addEventListener('input', filterEmployees);

    // Fetch and display employees on page load
    fetchAndDisplayEmployees();
});


