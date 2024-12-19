$(document).ready(function () {
    // Handle form submission
    $('#registrationForm').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Get the values of username and password
        const username = $('#username').val();
        const password = $('#password').val();

        // Display input values for debugging
        $('#debugInfo').append(`<p>Attempting to log in with: Username - <b>${username}</b></p>`);

        // Send POST request to the server
        $.ajax({
            url: 'https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: username, password: password }),
            success: function (response) {
                // Display the response for debugging
                $('#debugInfo').append(`<p>Response received from server: <pre>${JSON.stringify(response)}</pre></p>`);

                // Handle the server response
                if (response.success) {
                    $('#debugInfo').append(`<p class="text-success">Login successful. Redirecting to dashboard.html...</p>`);
                    window.location.href = 'dashboard.html';
                } else {
                    $('#debugInfo').append(`<p class="text-danger">Login failed: ${response.message || 'Invalid credentials.'}</p>`);
                }
            },
            error: function (xhr, status, error) {
                // Display error details for debugging
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

