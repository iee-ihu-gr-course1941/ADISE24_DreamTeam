document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.querySelector(".game-board");

    // Δημιουργία του grid
    for (let i = 0; i < 400; i++) { // 20x20 grid
        const cell = document.createElement("div");
        cell.addEventListener("click", () => {
            cell.classList.toggle("active"); // Εναλλαγή κατάστασης κελιού
        });
        gameBoard.appendChild(cell);
    }

    // Δημιουργία κομματιών για κάθε παίκτη
    const players = document.querySelectorAll(".player .pieces");
    players.forEach((pieceContainer, index) => {
        for (let i = 0; i < 10; i++) { // 10 κομμάτια ανά παίκτη
            const piece = document.createElement("div");
            piece.style.backgroundColor = getColor(index); // Χρώμα ανάλογα με τον παίκτη
            pieceContainer.appendChild(piece);
        }
    });

    // Reset λειτουργικότητα
    document.getElementById("reset-game").addEventListener("click", () => {
        document.querySelectorAll(".game-board div").forEach(cell => {
            cell.classList.remove("active");
        });
    });
});

// Επιστρέφει διαφορετικό χρώμα για κάθε παίκτη
function getColor(playerIndex) {
    const colors = ["#ff4d4d", "#4d79ff", "#4dff4d", "#ffff4d"]; // Κόκκινο, Μπλε, Πράσινο, Κίτρινο
    return colors[playerIndex] || "#ccc";
}
