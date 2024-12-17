// Function to dynamically update the title of the page
function setTitle(title) {
    document.title = title;
}

// Function to load HTML content from a URL into a specified container
function loadHTMLContent(containerId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error('Error loading the file:', error));
}

// Set title dynamically based on the page
document.addEventListener('DOMContentLoaded', function () {
    // Set title (you can modify this logic to match your page structure)
    const pageTitle = document.title || "Default Title"; // Default if not set
    setTitle(pageTitle);

    // Load header and footer content
    loadHTMLContent('header', 'components/header.html');
    loadHTMLContent('footer', 'components/footer.html');
});
