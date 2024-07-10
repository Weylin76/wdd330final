import { assignDepartments } from './departments.mjs';
import { calculateTotalSalary, displayTotalSalary } from './salarySum.mjs';

export async function loadPartial(file, elementId) {
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

export async function fetchAndStoreEmployees() {
    const url = 'https://randomuser.me/api/?results=12';
    try {
        const response = await fetch(url);
        const data = await response.json();
        let employees = data.results.map(employee => {
            employee.salary = Math.floor(Math.random() * (250000 - 50000 + 1) + 50000); // Assign random salary
            return employee;
        });

        // Assign departments to employees
        employees = assignDepartments(employees);

        // Store employees data in sessionStorage
        sessionStorage.setItem('employees', JSON.stringify(employees));

        console.log('Stored employees:', employees); // Check stored data
    } catch (error) {
        console.error('Error fetching employee data:', error);
    }
}

export function displayEmployees(employeeList) {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Clear previous results
    employeeList.forEach(employee => {
        const employeeCard = document.createElement('div');
        employeeCard.classList.add('employee-info');

        const name = `${employee.name.first} ${employee.name.last}`;
        const imgSrc = employee.picture.large;

        employeeCard.innerHTML = `
            <img src="${imgSrc}" alt="Picture of ${name}" class="employee-image">
            <h3>${name}</h3>
            <p>Salary: $${employee.salary.toLocaleString()}</p>
            <p>Department: ${employee.department}</p>
        `;

        output.appendChild(employeeCard);
    });

    const totalSalary = calculateTotalSalary(employeeList);
    displayTotalSalary(totalSalary);
}

function updateFooterDate() {
    const dateElement = document.getElementById('current-date');
    const currentDate = new Date().toLocaleDateString();
    dateElement.textContent = currentDate;
}

document.addEventListener('DOMContentLoaded', async function () {
    // Determine the base path for the partials
    const basePath = window.location.pathname.includes('/pages/') ? '../partials/' : 'partials/';

    // Load header, nav, and footer partials
    await loadPartial(`${basePath}header.html`, 'header-content');
    await loadPartial(`${basePath}nav.html`, 'nav-content');
    await loadPartial(`${basePath}footer.html`, 'footer-content');

    // Update footer date
    updateFooterDate();

    // Check if we have employee data in sessionStorage
    let employees = JSON.parse(sessionStorage.getItem('employees'));

    // If we don't have employee data, fetch it
    if (!employees) {
        await fetchAndStoreEmployees();
        employees = JSON.parse(sessionStorage.getItem('employees'));
    }

    // Load employee data for the current page
    if (window.location.pathname.includes('taxes.html')) {
        displayEmployeeTaxes(employees);
    } else {
        displayEmployees(employees);
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

