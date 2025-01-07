document.addEventListener("DOMContentLoaded", () => {
    const createGameForm = document.getElementById("createGameForm");

    createGameForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Αποφυγή ανανέωσης σελίδας

        const gameName = document.getElementById("gameName").value.trim();

        if (!gameName) {
            alert("Please enter a game name.");
            return;
        }

        try {
            // Κλήση API για δημιουργία παιχνιδιού
            const response = await fetch("/createLobby", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ gameName }),
            });

            if (!response.ok) {
                throw new Error("Failed to create game. Please try again.");
            }

            const data = await response.json();

            // Έλεγχος για ID του νέου lobby
            if (data.lobbyId) {
                // Ανακατεύθυνση στη σελίδα του νέου lobby
                window.location.href = `/game.html?lobbyId=${data.lobbyId}`;
            } else {
                throw new Error("Invalid response from server.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while creating the game. Please try again.");
        }
    });
});
