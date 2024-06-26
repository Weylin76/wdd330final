document.addEventListener('DOMContentLoaded', () => {
    async function fetchAndStoreEmployees() {
        const url = 'https://randomuser.me/api/?results=12';
        try {
            const response = await fetch(url);
            const data = await response.json();
            const employees = data.results.map(employee => {
                employee.salary = Math.floor(Math.random() * (250000 - 50000 + 1) + 50000); // Assign random salary
                employee.department = getRandomDepartment(); // Assign random department
                return employee;
            });

            // Store employees data in sessionStorage
            sessionStorage.setItem('employees', JSON.stringify(employees));

            console.log('Stored employees:', employees); // Check stored data
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }

    // Fetch and store employees when the page loads if not already stored
    if (!sessionStorage.getItem('employees')) {
        fetchAndStoreEmployees();
    } else {
        console.log('Employees data already in sessionStorage.');
    }

    // Function to get a random department
    function getRandomDepartment() {
        const departments = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance'];
        return departments[Math.floor(Math.random() * departments.length)];
    }
});





