

// Function to fetch and display account information
async function fetchAccountInfo() {
    try {
        // Get username from cookie
        const username = getCookie('username');
        const usernameElement = document.getElementById('username');
        const logoutButton = document.getElementById('logoutButton');

        if (username) {
            // User is logged in
            usernameElement.textContent = username;
            logoutButton.style.display = 'block';
        } else {
            // User is not logged in
            usernameElement.textContent = 'Guest';
            logoutButton.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching account information:', error);
    }
}

// Function to handle logout
async function handleLogout() {
    try {
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            // Successfully logged out
            deleteCookie("username"); // Clear the username cookie
            fetchAccountInfo(); // Refresh account info
            window.location.href = 'login.html';  // Redirect to login page
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

// Event listener for logout button
document.getElementById('logoutButton').addEventListener('click', handleLogout);

// Fetch account info when the page loads
document.addEventListener('DOMContentLoaded', fetchAccountInfo);
