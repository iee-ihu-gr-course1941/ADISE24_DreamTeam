// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + expires.toUTCString() + "; path=/";
}

// Function to delete a cookie
function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

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
