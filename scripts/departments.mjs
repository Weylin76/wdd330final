export function assignDepartments(employees) {
    const departments = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance'];
    
    return employees.map(employee => {
        employee.department = departments[Math.floor(Math.random() * departments.length)];
        return employee;
    });
}
