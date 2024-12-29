// Function to handle game creation
async function createGame(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    const gameName = document.getElementById('gameName').value;
    const maxPlayers = document.getElementById('maxPlayers').value;


    // Check if all fields are filled
    // add in futer 
    /*
    if (!gameName || !maxPlayers) {
        alert('Please fill out all fields.');
        return;
    }
    */
    try {
        // Prepare the data for the API call
        //const requestData = {
        //    game_name: gameName,
        //    max_players: parseInt(maxPlayers, 10)
        //};

        // Make the API call
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/create_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Failed to create game.');
        }

        // Parse the response (assuming it returns JSON)
        const result = await response.json();

        if (result.success) {
            alert('Game created successfully!');

            // Switch to the lobbies tab
            const lobbiesTab = document.querySelector('#lobbies-tab');
            const lobbiesContent = new bootstrap.Tab(lobbiesTab);
            lobbiesContent.show();

            // Optionally refresh the lobbies list
            if (typeof fetchLobbies === 'function') {
                fetchLobbies();
            }
        } else {
            alert(`Failed to create game: ${result.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while creating the game. Please try again later.');
    }
}

// Attach event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const createGameForm = document.getElementById('createGameForm');
    if (createGameForm) {
        createGameForm.addEventListener('submit', createGame);
    }
});
