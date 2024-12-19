$(document).ready(function () {
    // URL to check session status
    const sessionCheckUrl = "https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/session";

    // Check session when the page loads
    $.ajax({
        url: sessionCheckUrl,
        type: "GET",
        dataType: "json", // Expect JSON response
        success: function (response) {
            // Debugging: Display the response on the page
            $('#debugInfo').html(`
                <p>Status: Successful</p>
                <p>Response: ${JSON.stringify(response)}</p>
            `);

            // Check if the user is logged in
            if (response.loggedIn === true) {
                // Redirect to dashboard
                window.location.href = "dashboard.html";
            }
        },
        error: function (xhr, status, error) {
            // Display error details on the page for debugging
            $('#debugInfo').html(`
                <p>Status: ${status}</p>
                <p>Error: ${error}</p>
                <p>Response Text: ${xhr.responseText}</p>
            `);
        }
    });
});
