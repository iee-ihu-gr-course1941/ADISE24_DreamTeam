// Function to check user login status and redirect accordingly
async function checkLoginAndRedirect() {
    try {
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/session', {
            credentials: 'include' // Include cookies for authentication
        });
        const data = await response.json();

        const currentPath = window.location.pathname;

        if (data.loggedIn) {
            // User is logged in
            if (currentPath.endsWith('index.html') || currentPath === '/') {
                // Redirect to dashboard if on index.html
                window.location.href = 'dashboard.html';
            }
        } else {
            // User is not logged in
            if (!currentPath.endsWith('index.html') && currentPath !== '/') {
                // Redirect to index.html if on any other page
                window.location.href = 'index.html';
            }
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        // Optionally, handle the error by redirecting to a generic error page
        // window.location.href = 'error.html';
    }
}

// Execute the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', checkLoginAndRedirect);
