    // Function to fetch and display lobbies
    async function fetchLobbies() {
        const lobbyList = document.getElementById('lobby-list');
        lobbyList.innerHTML = '<p class="text-center">Loading...</p>'; // Show loading message

        try {
            // Fetch data from the server
            const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/lobbys');
            
            if (!response.ok) {
                throw new Error('Failed to fetch lobbies');
            }

            const lobbies = await response.json(); // Parse JSON data
            lobbyList.innerHTML = ''; // Clear loading message

            if (lobbies.length === 0) {
                lobbyList.innerHTML = '<p class="text-center text-muted">No lobbies available.</p>';
                return;
            }

            // Create list items for each lobby
            const ul = document.createElement('ul');
            ul.classList.add('list-group');

            lobbies.forEach(lobbys => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';

                li.innerHTML = `
                <span>
                    <strong>Lobby #${lobbys.game_id},</strong> - <strong>Player1(Host):</strong> ${lobbys.host}, <strong>Player2:</strong> ${lobbys.player2}, <strong>Player3:</strong> ${lobbys.player3}, <strong>Player4:</strong> ${lobbys.player4}, <strong>Game Status:</strong> ${lobbys.game_status}
                </span>
                <button class="btn btn-primary btn-sm" data-lobby-id="${lobbys.game_id}">Join</button>
                <button class="btn btn-primary btn-sm start-btn" data-lobby-id="${lobbys.game_id}">Start</button>
        `;

        li.querySelector('button').addEventListener('click', async (event) => {
            const userId = getCookieValue('user_id'); // Get the current user's ID
            //const lobbyId = event.target.getAttribute('data-lobby-id'); // Get the lobby ID
            const lobbyId = lobbys.game_id;

            if (!userId) {
                alert('User not logged in or user ID not found!');
                return;
            }

            try {
                const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/lobbys/join', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, lobbyId }),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    alert(result.message);
                } else {
                    alert(result.message || 'Failed to join the lobby.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to join the lobby. Please try again later.');
            }
        });

        li.querySelector('.start-btn').addEventListener('click', async (event) => {
            const lobbyId = event.target.getAttribute('data-lobby-id'); // Get the lobby ID from the button
        
            try {
                // Make a POST request to start the game
                const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/board/{id}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ lobby_id: lobbyId }), // Send the lobby ID in the request body
                });
        
                // Parse the JSON response
                const result = await response.json();
        
                // Check the response and handle it
                if (response.ok && result.success) {
                    alert(result.message); // Show success message
                    window.location.href = `game.html?lobby_id=${lobbyId}`; // Redirect to the game page
                } else {
                    alert(result.message || 'Failed to start the game.'); // Show failure message
                }
            } catch (error) {
                console.error('Error starting game:', error);
                alert('An error occurred while starting the game. Please try again.');
            }
        });
        

        ul.appendChild(li);

        });

        lobbyList.appendChild(ul);
        } catch (error) {
            console.error(error);
            lobbyList.innerHTML = '<p class="text-center text-danger">Failed to load lobbies. Please try again later.</p>';
        }
    }

    // Call the fetchLobbies function when the page loads
    document.addEventListener('DOMContentLoaded', fetchLobbies);

