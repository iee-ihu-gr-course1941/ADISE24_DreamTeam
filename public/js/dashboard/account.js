// Function to fetch user information (username and userId)
async function fetchUserData() {
    const usernameElement = document.querySelector('#username');
    const logoutButton = document.querySelector('#logoutButton');

    try {
        // Fetch data from the user API (adjust the URL as needed)
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/session');

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json(); // Parse the response

        // Display username and userId in the account section
        usernameElement.textContent = userData.username;

        // Show the logout button if the user is logged in
        if (userData.username !== 'Guest') {
            logoutButton.style.display = 'inline-block';
        } else {
            logoutButton.style.display = 'none';
        }
    } catch (error) {
        console.error(error);
        // In case of an error, show a fallback message
        usernameElement.textContent = 'Error fetching user data';
    }
}

// Event listener for logout button (can be extended to perform actual logout)
document.querySelector('#logoutButton')?.addEventListener('click', async () => {
    try {
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/logout', { method: 'POST' });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        // On successful logout, reset to guest state
        document.querySelector('#username').textContent = 'Guest';
        document.querySelector('#logoutButton').style.display = 'none';

        alert('Successfully logged out!');
    } catch (error) {
        console.error(error);
        alert('Failed to log out');
    }
});

// Call the fetchUserData function when the page loads
document.addEventListener('DOMContentLoaded', fetchUserData);
