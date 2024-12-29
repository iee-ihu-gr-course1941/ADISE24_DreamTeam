document.addEventListener("DOMContentLoaded", () => {
    const piecesContainer = document.getElementById("pieces-container");

    // Λειτουργία για να φορτώσει το JSON αρχείο
    const loadPiecesFromJSON = async () => {
        try {
            const response = await fetch("pieces.json"); // Φόρτωση JSON αρχείου
            if (!response.ok) throw new Error("Could not fetch pieces.json");
            const pieces = await response.json(); // Μετατροπή των δεδομένων σε JSON
            renderPieces(pieces);
        } catch (error) {
            console.error("Error loading JSON file:", error);
        }
    };

    // Λειτουργία για την απόδοση των κομματιών
    const renderPieces = (pieces) => {
        pieces.forEach(piece => {
            // Δημιουργία wrapper για κάθε κομμάτι
            const pieceElement = document.createElement("div");
            pieceElement.className = "piece";
            pieceElement.style.setProperty("--piece-color", piece.color);

            // Απόδοση του grid της τοπολογίας
            piece.topology.forEach(row => {
                row.forEach(cell => {
                    const cellDiv = document.createElement("div");
                    if (cell === 1) cellDiv.classList.add("active");
                    pieceElement.appendChild(cellDiv);
                });
            });

            // Προσθήκη draggable behavior
            pieceElement.setAttribute("draggable", "true");
            pieceElement.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("piece-id", piece.id);
            });

            // Εισαγωγή στο container
            piecesContainer.appendChild(pieceElement);
        });
    };

    // Κάλεσμα της loadPiecesFromJSON
    loadPiecesFromJSON();
});
