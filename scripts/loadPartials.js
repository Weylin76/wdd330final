document.addEventListener('DOMContentLoaded', async function () {
    // Determine the base path for the partials
    const basePath = window.location.pathname.includes('/pages/') ? '../partials/' : 'partials/';

    // Load header and footer partials
    await loadPartial(`${basePath}header.html`, 'header-content');
    await loadPartial(`${basePath}footer.html`, 'footer-content');
});

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
























