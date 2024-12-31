// Utility function to get a specific cookie value by name
function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === cookieName) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

// Initialize account information using cookies
function initializeAccount() {
    const username = getCookieValue('username');
    const userId = getCookieValue('user_id');
    const logoutButton = document.querySelector('#logoutButton');

    if (username && userId) {
        // If cookies exist, display username and show logout button
        document.querySelector('#username').textContent = username;
        logoutButton.style.display = 'inline-block';
    } else {
        // If cookies do not exist, display "Guest" and hide logout button
        document.querySelector('#username').textContent = 'Guest';
        logoutButton.style.display = 'none';
    }
}

// Handle logout functionality
function handleLogout() {
    const logoutButton = document.querySelector('#logoutButton');

    logoutButton.addEventListener('click', () => {
        // Clear relevant cookies
        document.cookie = 'user_id=; path=/; max-age=0';
        document.cookie = 'username=; path=/; max-age=0';
        document.cookie = 'session_token=; path=/; max-age=0';

        // Update UI to show guest state
        document.querySelector('#username').textContent = 'Guest';
        logoutButton.style.display = 'none';

        alert('You have been logged out.');
    });
}

// Initialize account functionality on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAccount();
    handleLogout();
});
