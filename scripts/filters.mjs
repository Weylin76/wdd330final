import { displayEmployees } from './loadPartials.mjs';

document.addEventListener('DOMContentLoaded', () => {
    console.log('filters.mjs loaded');
    const searchInput = document.getElementById('search-input');
    const output = document.getElementById('output');
    let employees = JSON.parse(sessionStorage.getItem('employees'));

    if (!employees) {
        console.error('No employee data found in session storage.');
    } else {
        console.log('Displaying employees:', employees);
        displayEmployees(employees, 'home-view');
    }

    function displayEmployees(employeeList, viewClass) {
        output.innerHTML = ''; // Clear previous results
        output.className = `employee-list ${viewClass}`; // Set the appropriate class
        console.log('Displaying employees:', employeeList);
        employeeList.forEach(employee => {
            // Create a container for each employee's info
            const employeeDiv = document.createElement('div');
            employeeDiv.classList.add('employee-card'); // Apply the card class

            // Name
            const nameDiv = document.createElement('h3');
            nameDiv.textContent = `${employee.name.first} ${employee.name.last}`;
            employeeDiv.appendChild(nameDiv);

            // Image
            const image = document.createElement('img');
            image.setAttribute('src', employee.picture.large);
            image.setAttribute('alt', `Picture of ${employee.name.first} ${employee.name.last}`);
            image.classList.add('employee-image'); // Apply the image class
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

    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredEmployees = employees.filter(employee => {
            const fullName = `${employee.name.first.toLowerCase()} ${employee.name.last.toLowerCase()}`;
            return fullName.includes(searchTerm);
        });
        console.log('Filtered employees:', filteredEmployees);
        displayEmployees(filteredEmployees, 'filtered-view');
    });
});
