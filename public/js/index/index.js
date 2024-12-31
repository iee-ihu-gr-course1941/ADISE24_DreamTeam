 // Function to get a cookie value by name
 function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    return null;
}

// Function to check if the user is logged in by checking cookies
function checkIfLoggedIn() {
    const userId = getCookie('user_id');  // Get user_id cookie
    const username = getCookie('username'); // Get username cookie

    // If both user_id and username are present, we assume the user is logged in
    if (userId && username) {
        window.location.href = 'dashboard.html'; // Redirect to dashboard if logged in
    } else {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }
}

// Call the function on page load to check login status
document.addEventListener('DOMContentLoaded', checkIfLoggedIn);