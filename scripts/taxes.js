document.addEventListener('DOMContentLoaded', async function () {
    const basePath = window.location.pathname.includes('/pages/') ? '../partials/' : 'partials/';
    await loadPartial(`${basePath}header.html`, 'header-content');
    await loadPartial(`${basePath}footer.html`, 'footer-content');

    // Retrieve employee data from session storage
    const storedEmployees = sessionStorage.getItem('employees');
    if (storedEmployees) {
        const employees = JSON.parse(storedEmployees);
        displayEmployees(employees);
    } else {
        console.error('No employee data found in session storage.');
    }
});

function displayEmployees(employees) {
    const taxOutput = document.getElementById('tax-output');
    taxOutput.innerHTML = '';

    employees.forEach(employee => {
        const annualTax = calculateAnnualTax(employee.salary);
        const taxPerPayPeriod = (annualTax / 26).toFixed(2);

        const employeeDiv = document.createElement('div');
        employeeDiv.className = 'employee-info';

        employeeDiv.innerHTML = `
            <h3>${employee.name.first} ${employee.name.last}</h3>
            <img src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
            <div>Salary: $${employee.salary.toLocaleString()}</div>
            <div>Annual Tax: $${annualTax.toLocaleString()}</div>
            <div>Tax per Pay Period: $${taxPerPayPeriod}</div>
        `;

        taxOutput.appendChild(employeeDiv);
    });
}

function calculateAnnualTax(salary) {
    const brackets = [
        { rate: 0.1, cap: 9950 },
        { rate: 0.12, cap: 40525 },
        { rate: 0.22, cap: 86375 },
        { rate: 0.24, cap: 164925 },
        { rate: 0.32, cap: 209425 },
        { rate: 0.35, cap: 523600 },
        { rate: 0.37, cap: Infinity }
    ];

    let tax = 0;
    let previousCap = 0;

    for (const bracket of brackets) {
        if (salary > bracket.cap) {
            tax += (bracket.cap - previousCap) * bracket.rate;
        } else {
            tax += (salary - previousCap) * bracket.rate;
            break;
        }
        previousCap = bracket.cap;
    }

    return tax;
}

async function loadPartial(file, elementId) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to fetch ${file}`);
        
        const data = await response.text();
        const element = document.getElementById(elementId);
        if (element) element.innerHTML = data;
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
}































