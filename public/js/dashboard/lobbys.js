
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
                    <button class="btn btn-primary btn-sm">Join</button>
                `;

                li.querySelector('button').addEventListener('click', async () => {
                    const lobbyId = lobbys.game_id;
                    const userId = CURRENT_USER_ID;
                
                    try {
                        const checkResponse = await fetch(`https://your-api-endpoint.com/checkLobbyStatus`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                lobby_id: lobbyId,
                                user_id: userId,
                            }),
                        });
                
                        if (!checkResponse.ok) {
                            throw new Error('Failed to check lobby status');
                        }
                
                        const result = await checkResponse.json();
                
                        if (result.isInLobby) {
                            alert('You are already in this lobby!');
                            window.location.href = `game.html?lobby_id=${lobbys.game_id}`;
                            return;
                        }
                
                        if (result.isFull) {
                            alert('The lobby is full. You cannot join.');
                            return;
                        }

                        const joinResponse = await fetch(`https://your-api-endpoint.com/joinLobby`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                lobby_id: lobbyId,
                                user_id: userId,
                            }),
                        });
                
                        if (!joinResponse.ok) {
                            throw new Error('Failed to join the lobby');
                        }
                
                        alert('Successfully joined the lobby!');
                        window.location.href = `game.html?lobby_id=${lobbyId}`;
                    } catch (error) {
                        console.error(error);
                        alert('An error occurred. Please try again later.');
                    }
                });
                

                // Optional: Add functionality for the "Join" button
                // li.querySelector('button').addEventListener('click', () => {
                //     window.location.href = `game.html?lobby_id=${lobbys.id}`;
                // });

                // ul.appendChild(li);
            });

            lobbyList.appendChild(ul);
        } catch (error) {
            console.error(error);
            lobbyList.innerHTML = '<p class="text-center text-danger">Failed to load lobbies. Please try again later.</p>';
        }
    }

    // Call the fetchLobbies function when the page loads
    document.addEventListener('DOMContentLoaded', fetchLobbies);

