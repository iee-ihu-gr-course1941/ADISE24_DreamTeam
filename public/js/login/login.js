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
                    // Set cookies for user ID and username on successful login
                    document.cookie = `user_id=${response.user_id}; path=/; max-age=3600`; // 1 hour expiration
                    document.cookie = `username=${response.username}; path=/; max-age=3600`;

                    // Optional: Set additional cookies like session token if provided
                    if (response.session_token) {
                        document.cookie = `session_token=${response.session_token}; path=/; max-age=3600`;
                    }

                    $('#debugInfo').append(`<p class="text-success">Login successful. Redirecting to dashboard.html...</p>`);
                    window.location.href = 'dashboard.html'; // Redirect to dashboard after login
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

    // Handle register form submission
    $('#registerForm').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const username = $('#reg_username').val();
        const password = $('#reg_password').val();

        $('#debugInfo').append(`<p>Attempting to register with: Username - <b>${username}</b></p>`);

        $.ajax({
            url: 'https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: username, password: password }),
            success: function (response) {
                $('#debugInfo').append(`<p>Response received from server: <pre>${JSON.stringify(response)}</pre></p>`);

                if (response.success) {
                    // Set cookies for user ID and username after registration
                    document.cookie = `user_id=${response.user_id}; path=/; max-age=3600`; // 1 hour expiration
                    document.cookie = `username=${response.username}; path=/; max-age=3600`;

                    // Optional: Set additional cookies like session token if provided
                    if (response.session_token) {
                        document.cookie = `session_token=${response.session_token}; path=/; max-age=3600`;
                    }

                    $('#debugInfo').append(`<p class="text-success">Registration successful. You can now log in.</p>`);
                    $('#registerForm')[0].reset(); // Clear the registration form
                    $('#registerForm').hide();
                    $('#loginForm').show();
                } else {
                    $('#debugInfo').append(`<p class="text-danger">Registration failed: ${response.message}</p>`);
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

    // Show register form when "Create an account" link is clicked
    $('#showRegister').on('click', function (e) {
        e.preventDefault();
        $('#loginForm').hide();
        $('#registerForm').show();
    });
});
