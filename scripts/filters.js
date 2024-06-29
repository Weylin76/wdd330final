document.addEventListener('DOMContentLoaded', () => {
    console.log('filters.js loaded');
    const searchInput = document.getElementById('search-input');
    const output = document.getElementById('output');

    // Store employees in session storage (replace this part with your actual data fetching logic)
    if (!sessionStorage.getItem('employees')) {
        const employees = [
            {name: {first: 'Eric', last: 'Calderón'}, picture: {large: 'https://randomuser.me/api/portraits/men/1.jpg'}, salary: 130114, department: 'HR'},
            {name: {first: 'Janet', last: 'Hart'}, picture: {large: 'https://randomuser.me/api/portraits/women/1.jpg'}, salary: 116488, department: 'Marketing'},
            {name: {first: 'Ralph', last: 'Jackson'}, picture: {large: 'https://randomuser.me/api/portraits/men/2.jpg'}, salary: 170210, department: 'Sales'},
            {name: {first: 'Ethan', last: 'Taylor'}, picture: {large: 'https://randomuser.me/api/portraits/men/3.jpg'}, salary: 117825, department: 'HR'},
            {name: {first: 'Christoph', last: 'Hausmann'}, picture: {large: 'https://randomuser.me/api/portraits/men/4.jpg'}, salary: 222326, department: 'Finance'},
            {name: {first: 'Milad', last: 'Kamari'}, picture: {large: 'https://randomuser.me/api/portraits/men/5.jpg'}, salary: 149424, department: 'Marketing'},
            {name: {first: 'Alice', last: 'Johnson'}, picture: {large: 'https://randomuser.me/api/portraits/women/2.jpg'}, salary: 135000, department: 'HR'},
            {name: {first: 'John', last: 'Doe'}, picture: {large: 'https://randomuser.me/api/portraits/men/6.jpg'}, salary: 160000, department: 'Engineering'},
        ];
        sessionStorage.setItem('employees', JSON.stringify(employees));
    }

    function displayEmployees(employeeList) {
        output.innerHTML = ''; // Clear previous results
        console.log('Displaying employees:', employeeList);
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

    function filterEmployees() {
        console.log('Filtering employees');
        const searchTerm = searchInput.value.toLowerCase();
        console.log('Search term:', searchTerm);

        const storedEmployees = sessionStorage.getItem('employees');
        if (storedEmployees) {
            const employees = JSON.parse(storedEmployees);

            const filtered = employees.filter(employee => {
                const fullName = `${employee.name.first.toLowerCase()} ${employee.name.last.toLowerCase()}`;
                return fullName.includes(searchTerm);
            });

            console.log('Filtered employees:', filtered);
            displayEmployees(filtered);
        } else {
            console.error('No employee data found in session storage.');
        }
    }

    // Event listener for keyup on the search input
    searchInput.addEventListener('keyup', filterEmployees);

    // Display all employees initially
    const storedEmployees = sessionStorage.getItem('employees');
    if (storedEmployees) {
        const employees = JSON.parse(storedEmployees);
        displayEmployees(employees);
    }
});
