document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Replace with the actual API URL
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password }) // Send data as JSON
        });

        const result = await response.json(); // Parse the JSON response

        // Check the response for success
        if (result.success) {
            // Redirect to another page if login is successful
            window.location.href = 'login.html'; // Or the page you want to redirect to
        } else {
            // Display an error message if login fails
            document.getElementById('errorMessage').textContent = result.message || 'Invalid credentials. Please try again.';
        }
    } catch (error) {
        // Display a generic error message if there is an issue with the request
        document.getElementById('errorMessage').textContent = 'An error occurred. Please try again later.';
    }
});
