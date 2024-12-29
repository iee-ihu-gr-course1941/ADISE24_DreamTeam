// Function to check if the user is logged in
function checkIfLoggedIn() {
    fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/session', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' // Optional, add more headers if needed
        }
    })
    .then(response => response.json())
    .then(data => {
        // Redirect based on login status
        if (data.loggedIn) {
            if (window.location.pathname === '/login.html' || window.location.pathname === '/register.html') {
                window.location.href = 'dashboard.html'; // Redirect to dashboard if logged in
            } else {
                displayUsername(data.username); // Display username if logged in
            }
        } else {
            if (window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html') {
                window.location.href = 'login.html'; // Redirect to login if not logged in
            }
        }
    })
    .catch(error => {
        console.error('Error checking login status:', error);
        window.location.href = 'login.html'; // Redirect to login if an error occurs
    });
}

// Function to display username in the account tab
function displayUsername(username) {
    const usernameElement = document.getElementById('username');
    const logoutButton = document.getElementById('logoutButton');
    
    if (usernameElement) {
        usernameElement.textContent = username;
    }
    
    if (logoutButton) {
        logoutButton.style.display = 'block'; // Show logout button if logged in
    }
}

// Function to handle logout
async function handleLogout() {
    try {
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/logout', {
            method: 'POST',
            credentials: 'include' // Send cookies with the request
        });

        if (response.ok) {
            window.location.href = 'login.html';  // Redirect to login page after logout
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

// Event listener for logout button
document.addEventListener('DOMContentLoaded', () => {
    checkIfLoggedIn(); // Check login status on page load
    
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout); // Attach logout handler
    }
});
