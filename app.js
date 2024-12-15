const API_URL = "https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/users/";

// Handle login
$("#loginForm").on("submit", function (event) {
    event.preventDefault();

    const userId = $("#userId").val();

    $.ajax({
        url: API_URL + userId,
        method: "GET",
        success: function (response) {
            if (response && response.id) {
                // Save user info in sessionStorage
                sessionStorage.setItem("loggedInUser", JSON.stringify(response));
                window.location.href = "stats.html"; // Redirect to stats page
            } else {
                $("#errorMessage").text("Invalid User ID").show();
            }
        },
        error: function () {
            $("#errorMessage").text("Unable to fetch user data. Please try again.").show();
        },
    });
});

// Redirect to login if not logged in
if (window.location.pathname.endsWith("stats.html")) {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        window.location.href = "login.html";
    } else {
        const user = JSON.parse(loggedInUser);
        $("#userId").text(user.id);
        $("#username").text(user.username);
        $("#email").text(user.email);
        $("#createdAt").text(user.created_at);
    }
}

// Logout functionality
$("#logoutBtn").on("click", function () {
    sessionStorage.removeItem("loggedInUser");
});

