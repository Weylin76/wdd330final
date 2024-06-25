document.addEventListener('DOMContentLoaded', () => {
    const taxOutput = document.getElementById('tax-output');

    // Function to get employees from sessionStorage
    function getEmployeesFromStorage() {
        const employees = sessionStorage.getItem('employees');
        return employees ? JSON.parse(employees) : [];
    }

    // Function to display employees
    function displayEmployees(employees) {
        taxOutput.innerHTML = ''; // Clear previous results
        employees.forEach(employee => {
            console.log('Employee data:', employee); // Log employee object to verify salary

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
            salaryDiv.textContent = `Salary: ${employee.salary ? employee.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A'}`;
            console.log('Salary Div:', salaryDiv.textContent); // Log salaryDiv to check its content
            employeeDiv.appendChild(salaryDiv);

            // Append to the output container
            taxOutput.appendChild(employeeDiv);
        });
    }

    // Load and display employees from sessionStorage
    const employees = getEmployeesFromStorage();
    if (employees.length > 0) {
        displayEmployees(employees);
    } else {
        taxOutput.textContent = 'No employee data found. Please visit the main page first.';
    }
});



























