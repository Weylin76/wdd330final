document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('tax-output');

    // Function to calculate federal taxes based on salary
    function calculateFederalTax(salary) {
        const brackets = [
            { rate: 0.10, limit: 9875 },
            { rate: 0.12, limit: 40125 },
            { rate: 0.22, limit: 85525 },
            { rate: 0.24, limit: 163300 },
            { rate: 0.32, limit: 207350 },
            { rate: 0.35, limit: 518400 },
            { rate: 0.37, limit: Infinity }
        ];

        let tax = 0;
        let previousLimit = 0;

        for (const bracket of brackets) {
            if (salary <= bracket.limit) {
                tax += (salary - previousLimit) * bracket.rate;
                break;
            } else {
                tax += (bracket.limit - previousLimit) * bracket.rate;
                previousLimit = bracket.limit;
            }
        }

        return tax;
    }

    // Function to display employees with tax information
    function displayEmployeesWithTax(employeeList) {
        output.innerHTML = ''; // Clear previous results
        employeeList.forEach(employee => {
            const salary = employee.salary;
            const annualTax = calculateFederalTax(salary);
            const taxPerPayPeriod = annualTax / 26;

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
            salaryDiv.textContent = `Salary: $${salary.toLocaleString()}`;
            employeeDiv.appendChild(salaryDiv);

            // Annual Tax
            const annualTaxDiv = document.createElement('div');
            annualTaxDiv.textContent = `Annual Tax: $${annualTax.toFixed(2)}`;
            employeeDiv.appendChild(annualTaxDiv);

            // Tax per Pay Period
            const taxPerPayPeriodDiv = document.createElement('div');
            taxPerPayPeriodDiv.textContent = `Tax per Pay Period: $${taxPerPayPeriod.toFixed(2)}`;
            employeeDiv.appendChild(taxPerPayPeriodDiv);

            // Append to the output container
            output.appendChild(employeeDiv);
        });
    }

    // Retrieve employee data from session storage
    const storedEmployees = sessionStorage.getItem('employees');
    if (storedEmployees) {
        const employees = JSON.parse(storedEmployees);
        displayEmployeesWithTax(employees);
    } else {
        console.error('No employee data found in session storage.');
    }
});
































