import { displayEmployeeTaxes } from './loadPartials.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('tax-output');

    // Retrieve employee data from session storage
    const storedEmployees = sessionStorage.getItem('employees');
    if (storedEmployees) {
        const employees = JSON.parse(storedEmployees);
        displayEmployeeTaxes(employees);
    } else {
        console.error('No employee data found in session storage.');
    }
});

export function displayEmployeeTaxes(employees) {
    const output = document.getElementById('tax-output');
    if (output) {
        output.innerHTML = employees.map(employee => {
            const annualTax = calculateFederalTax(employee.salary);
            const taxPerPayPeriod = (annualTax / 26).toFixed(2);

            return `
                <div class="employee-card">
                    <img src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}" />
                    <h3>${employee.name.first} ${employee.name.last}</h3>
                    <p>Salary: $${employee.salary.toLocaleString()}</p>
                    <p>Annual Tax: $${annualTax.toLocaleString()}</p>
                    <p>Tax per Pay Period: $${taxPerPayPeriod}</p>
                </div>
            `;
        }).join('');
    }
}

export function calculateFederalTax(salary) {
    const brackets = [
        { rate: 0.10, limit: 9950 },
        { rate: 0.12, limit: 40525 },
        { rate: 0.22, limit: 86375 },
        { rate: 0.24, limit: 164925 },
        { rate: 0.32, limit: 209425 },
        { rate: 0.35, limit: 523600 },
        { rate: 0.37, limit: Infinity }
    ];

    let tax = 0;
    for (let i = 0; i < brackets.length; i++) {
        const { rate, limit } = brackets[i];
        if (salary > limit) {
            tax += rate * limit;
            salary -= limit;
        } else {
            tax += rate * salary;
            break;
        }
    }

    return tax;
}
