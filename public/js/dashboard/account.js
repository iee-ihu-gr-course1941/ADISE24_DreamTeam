// Function to fetch and display account information
async function fetchAccountInfo() {
    try {
        // Make a request to the session API to get login status and username
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Optional, in case you need specific headers
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch account info');
        }

        const data = await response.json();
        console.log(data);  // Log the response to check its structure

        const usernameElement = document.getElementById('username');
        const logoutButton = document.getElementById('logoutButton');

        if (data.loggedIn) {
            // User is logged in, display their username
            usernameElement.textContent = data.username;
            logoutButton.style.display = 'block';
        } else {
            // User is not logged in, show 'Guest'
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
            credentials: 'include' // Send cookies with the request
        });

        if (response.ok) {
            // Successfully logged out
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
