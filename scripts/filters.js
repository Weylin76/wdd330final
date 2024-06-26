document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const filterDepartment = document.getElementById('filter-department');
    const applyFiltersButton = document.getElementById('apply-filters');
    const output = document.getElementById('output');
    let employees = [];

    // Retrieve employee data from session storage
    const storedEmployees = sessionStorage.getItem('employees');
    if (storedEmployees) {
        employees = JSON.parse(storedEmployees);
        displayEmployees(employees); // Display all employees initially
    } else {
        console.error('No employee data found in session storage.');
    }

    // Display employees based on the provided list
    function displayEmployees(employeeList) {
        output.innerHTML = ''; // Clear previous results
        employeeList.forEach(employee => {
            // Create a container for each employee's info
            const employeeDiv = document.createElement('div');
            employeeDiv.classList.add('employee-info');

            // Name
            const nameDiv = document.createElement('h3');
            nameDiv.textContent = `${employee.name.first} ${employee.name.last}`;
            employeeDiv.appendChild(nameDiv);

            // Image
            const image = document.createElement('img');
            image.setAttribute('src', employee.picture.large);
            image.setAttribute('alt', `Picture of ${employee.name.first} ${employee.name.last}`);
            employeeDiv.appendChild(image);

            // Salary
            const salaryDiv = document.createElement('div');
            salaryDiv.textContent = `Salary: $${employee.salary.toLocaleString()}`;
            employeeDiv.appendChild(salaryDiv);

            // Department
            const departmentDiv = document.createElement('div');
            departmentDiv.textContent = `Department: ${employee.department}`;
            employeeDiv.appendChild(departmentDiv);

            // Append to the output container
            output.appendChild(employeeDiv);
        });
    }

    // Filter employees based on search and selected filters
    function filterEmployees() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedDepartment = filterDepartment.value;

        const filtered = employees.filter(employee => {
            const fullName = `${employee.name.first} ${employee.name.last}`.toLowerCase();
            const department = employee.department;

            let matchesSearch = fullName.includes(searchTerm);
            let matchesDepartment = true;

            if (selectedDepartment) {
                matchesDepartment = department === selectedDepartment;
            }

            return matchesSearch && matchesDepartment;
        });

        displayEmployees(filtered);
    }

    // Event listener for the apply filters button
    applyFiltersButton.addEventListener('click', filterEmployees);
});






