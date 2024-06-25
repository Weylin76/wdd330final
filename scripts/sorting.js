document.addEventListener('DOMContentLoaded', () => {
    const sortOptions = document.getElementById('sort-options');
    const output = document.getElementById('output') || document.getElementById('tax-output');
    let employees = []; // Store fetched employees data

    // Fetch and display employees
    async function fetchAndDisplayEmployees() {
        const url = 'https://randomuser.me/api/?results=10';
        try {
            const response = await fetch(url);
            const data = await response.json();
            employees = data.results; // Store the fetched employee data
            displayEmployees(employees); // Display all employees initially
        } catch (error) {
            console.error('Error fetching employee data:', error);
            output.textContent = 'Failed to load employee data.';
        }
    }

    // Display employees based on the provided list
    function displayEmployees(employeeList) {
        output.innerHTML = ''; // Clear previous results
        employeeList.forEach(employee => {
            // Use existing or compute a salary for sorting
            const salary = employee.salary || computeRandomSalary();

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

            // Append to the output container
            output.appendChild(employeeDiv);
        });
    }

    // Compute a random salary once and store it for consistency
    function computeRandomSalary() {
        return Math.floor(Math.random() * (250000 - 50000 + 1) + 50000);
    }

    // Sorting function
    function sortEmployees(criteria) {
        let sortedEmployees = [...employees]; // Clone array to sort
        switch (criteria) {
            case 'name-asc':
                sortedEmployees.sort((a, b) => a.name.first.localeCompare(b.name.first));
                break;
            case 'name-desc':
                sortedEmployees.sort((a, b) => b.name.first.localeCompare(a.name.first));
                break;
            case 'salary-asc':
                sortedEmployees.sort((a, b) => (a.salary || computeRandomSalary()) - (b.salary || computeRandomSalary()));
                break;
            case 'salary-desc':
                sortedEmployees.sort((a, b) => (b.salary || computeRandomSalary()) - (a.salary || computeRandomSalary()));
                break;
            default:
                // No sorting
                break;
        }
        displayEmployees(sortedEmployees);
    }

    // Event listener for sort options
    sortOptions.addEventListener('change', () => {
        sortEmployees(sortOptions.value);
    });

    // Fetch and display employees on page load
    fetchAndDisplayEmployees();
});
