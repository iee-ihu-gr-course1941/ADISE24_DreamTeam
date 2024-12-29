// Function to check user login status and redirect accordingly// Function to check user login status and redirect accordingly
function checkLoginStatusAndRedirect() {
    const username = getCookie("username"); // Assuming 'username' cookie holds login info

    const currentPath = window.location.pathname;

    if (username) {
        // User is logged in, log the username
        console.log('Logged in as:', username);

        // Redirect to dashboard if on index.html or home page
        if (currentPath.endsWith('index.html') || currentPath === '/') {
            window.location.href = 'dashboard.html';
        }
    } else {
        // User is not logged in
        console.log('User is not logged in');

        // Redirect to index.html if on any other page
        if (!currentPath.endsWith('index.html') && currentPath !== '/') {
            window.location.href = 'index.html';
        }
    }
}

// Execute the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', checkLoginStatusAndRedirect);



