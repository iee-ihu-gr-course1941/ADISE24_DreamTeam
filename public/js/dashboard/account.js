// Function to fetch and display account information
async function fetchAccountInfo() {
    try {
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/session');
        const data = await response.json();

        const usernameElement = document.getElementById('username');
        const rankElement = document.getElementById('rank');
        const logoutButton = document.getElementById('logoutButton');

        if (data.loggedIn) {
            // User is logged in
            usernameElement.textContent = data.username;
            rankElement.textContent = data.rank || 'N/A'; // Assuming 'rank' is part of the response
            logoutButton.style.display = 'block';
        } else {
            // User is not logged in
            usernameElement.textContent = 'Guest';
            rankElement.textContent = 'N/A';
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
            fetchAccountInfo(); // Refresh account info
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
