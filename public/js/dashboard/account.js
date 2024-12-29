// Function to fetch and display account information using cookies
function fetchAccountInfo() {
    const usernameElement = document.getElementById('username');
    const rankElement = document.getElementById('rank');
    const logoutButton = document.getElementById('logoutButton');

    // Retrieve username and user_id from cookies
    const username = getCookie('username');
    const userId = getCookie('user_id');

    if (username && userId) {
        // User is logged in (username and user_id exist in cookies)
        usernameElement.textContent = username;
        rankElement.textContent = 'N/A'; // As you're not fetching rank anymore
        logoutButton.style.display = 'block';
    } else {
        // User is not logged in (cookies don't exist)
        usernameElement.textContent = 'Guest';
        rankElement.textContent = 'N/A';
        logoutButton.style.display = 'none';
    }
}

// Function to get a cookie's value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Function to handle logout by clearing cookies
function handleLogout() {
    // Clear the cookies by setting their expiration date to the past
    document.cookie = "user_id=; path=/; max-age=0"; // Clear user_id cookie
    document.cookie = "username=; path=/; max-age=0"; // Clear username cookie

    // Refresh account info
    fetchAccountInfo();
}

// Event listener for logout button
document.getElementById('logoutButton').addEventListener('click', handleLogout);

// Fetch account info when the page loads
document.addEventListener('DOMContentLoaded', fetchAccountInfo);
