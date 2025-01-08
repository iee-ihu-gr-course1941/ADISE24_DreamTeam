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

        lobbies.forEach(lobby => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            li.innerHTML = `
                <span>
                    <strong>Lobby #${lobby.game_id},</strong> - <strong>Host:</strong> ${lobby.host} - 
                    <strong>Status:</strong> ${lobby.game_status}
                </span>
                <button class="btn btn-primary btn-sm join-btn" data-lobby-id="${lobby.game_id}">Join</button>
                <button class="btn btn-success btn-sm start-btn" data-lobby-id="${lobby.game_id}">Start</button>
            `;

            const joinButton = li.querySelector('.join-btn');
            const startButton = li.querySelector('.start-btn');

            // Join Lobby Button
            joinButton.addEventListener('click', async (event) => {
                const userId = getCookieValue('user_id');
                const lobbyId = lobby.game_id;

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
                        joinButton.disabled = true;
                        joinButton.style.display = 'none';

                        // Always show the Start button for all users
                        startButton.style.display = 'inline-block';
                    } else {
                        alert(result.message || 'Failed to join the lobby.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to join the lobby. Please try again later.');
                }
            });

            // Start Game Button
            startButton.addEventListener('click', (event) => {
                const lobbyId = event.target.getAttribute('data-lobby-id');
                window.location.href = `game.html?game_id=${lobbyId}`; // Redirect to game.html with the game_id
            });

            ul.appendChild(li);
        });

        lobbyList.appendChild(ul);
    } catch (error) {
        console.error(error);
        lobbyList.innerHTML = '<p class="text-center text-danger">Failed to load lobbies. Please try again later.</p>';
    }
}
