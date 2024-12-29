function checkIfLoggedIn() {
    fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/session', {
        method: 'GET',
        headers: {
            // Add any necessary headers here (if needed)
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            // User is logged in
            console.log('Logged in as:', data.username);
            // You can access user_id as well: data.user_id
            // Redirect to a logged-in page or show logged-in content
            window.location.href = '/dashboard'; // Example redirect
        } else {
            // User is not logged in
            console.log('User is not logged in');
            // Redirect to the login page
            window.location.href = '/login'; // Example redirect to login
        }
    })
    .catch(error => {
        console.error('Error checking login status:', error);
        // Optionally, handle the error (e.g., show an error message)
    });
}

// Call the function on page load or as needed
checkIfLoggedIn();
