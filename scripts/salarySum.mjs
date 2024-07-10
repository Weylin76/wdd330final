export function calculateTotalSalary(employeeList) {
    return employeeList.reduce((total, employee) => total + employee.salary, 0);
}

export function displayTotalSalary(totalSalary) {
    const allWagesElement = document.getElementById('allWages');
    if (allWagesElement) {
        allWagesElement.textContent = `$${totalSalary.toLocaleString()}`;
    }
}

