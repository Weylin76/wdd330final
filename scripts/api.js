document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch employees from the API and store in sessionStorage
    async function fetchAndStoreEmployees() {
        const url = 'https://randomuser.me/api/?results=10';
        try {
            const response = await fetch(url);
            const data = await response.json();
            const employees = data.results.map(employee => {
                employee.salary = Math.floor(Math.random() * (250000 - 50000 + 1) + 50000); // Assign random salary
                return employee;
            });

            // Store employees data in sessionStorage
            sessionStorage.setItem('employees', JSON.stringify(employees));

            console.log('Stored employees:', employees); // Check stored data
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }

    // Fetch and store employees when the page loads
    fetchAndStoreEmployees();
});



