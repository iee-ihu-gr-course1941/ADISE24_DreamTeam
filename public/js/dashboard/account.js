// Function to fetch and display account information using session
async function fetchAccountInfo() {
    try {
        // Make a request to the session API to get login status and username
        console.log('Fetching account info...');
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Optional, in case you need specific headers
            },
            credentials: 'same-origin', // Ensures the session cookie is sent to the same origin
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Failed to fetch account info');
        }

        // Parse the JSON response and log it
        const data = await response.json();
        console.log('Received data:', data);

        const usernameElement = document.getElementById('username');
        const logoutButton = document.getElementById('logoutButton');

        // Check if the user is logged in and update the DOM accordingly
        if (data.loggedIn) {
            console.log('User is logged in. Username:', data.username);
            usernameElement.textContent = data.username;
            logoutButton.style.display = 'block';
        } else {
            console.log('User is not logged in. Showing "Guest".');
            usernameElement.textContent = 'Guest';
            logoutButton.style.display = 'none';
        }
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error fetching account information:', error);
    }
}

// Function to handle logout using session
async function handleLogout() {
    try {
        console.log('Attempting to log out...');
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/logout', {
            method: 'POST',
            credentials: 'same-origin', // Sends the session cookie to the server
        });

        if (response.ok) {
            console.log('Successfully logged out');
            fetchAccountInfo(); // Refresh account info after logout
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
