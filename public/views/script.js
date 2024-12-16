document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://your-server.com/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = 'dashboard.html'; // Redirect to a dashboard or welcome page after login
        } else {
            document.getElementById('errorMessage').textContent = result.message || 'Invalid credentials. Please try again.';
        }
    } catch (error) {
        document.getElementById('errorMessage').textContent = 'An error occurred. Please try again later.';
    }
});
