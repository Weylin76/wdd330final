document.addEventListener('DOMContentLoaded', async () => {
    let employees = JSON.parse(sessionStorage.getItem('employees'));

    // If no employees in session storage, fetch and store them
    if (!employees) {
        await fetchAndStoreEmployees();
        employees = JSON.parse(sessionStorage.getItem('employees'));
    }

    // Display employees on page load
    if (window.location.pathname.includes('taxes.html')) {
        displayEmployeeTaxes(employees);
    } else {
        displayEmployees(employees);
    }
});






