$(document).ready(function () {
    // Handle login form submission
    $('#loginForm').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const username = $('#username').val();
        const password = $('#password').val();

        $('#debugInfo').append(`<p>Attempting to log in with: Username - <b>${username}</b></p>`);

        $.ajax({
            url: 'https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: username, password: password }),
            success: function (response) {
                $('#debugInfo').append(`<p>Response received from server: <pre>${JSON.stringify(response)}</pre></p>`);

                if (response.success) {
                    // Set the username in a cookie
                    setCookie("username", username, 7);  // Set cookie for 7 days
                    $('#debugInfo').append(`<p class="text-success">Login successful. Redirecting to dashboard.html...</p>`);
                    window.location.href = 'dashboard.html';  // Redirect to the dashboard
                } else {
                    $('#debugInfo').append(`<p class="text-danger">Login failed: ${response.message || 'Invalid credentials.'}</p>`);
                }
            },
            error: function (xhr, status, error) {
                $('#debugInfo').append(`
                    <p class="text-danger">Error during AJAX request:</p>
                    <p>Status: ${xhr.status}</p>
                    <p>Status Text: ${xhr.statusText}</p>
                    <p>Response Text: <pre>${xhr.responseText}</pre></p>
                `);
                alert('An error occurred. Please try again later.');
            }
        });
    });

    
});
