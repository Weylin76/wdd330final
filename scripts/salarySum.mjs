export function calculateTotalSalary(employees) {
    return employees.reduce((total, employee) => total + employee.salary, 0);
}

export function displayTotalSalary(totalSalary) {
    const allWagesElement = document.getElementById('allWages');
    allWagesElement.textContent = `$${totalSalary.toLocaleString()}`;
}
