<script src="js/dashboard/account.js"></script>
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

                // Add functionality for the "Join" button
            // li.querySelector('button').addEventListener('click', async () => {
            //     const lobbyId = lobbys.game_id;
            //     const userId = getCookieValue('user_id');
            //     if(userId){
            //         console.log('Current userID: ', userId);
            //     }
            //     else{
            //         console.log('User ID not found.');
            //     }

            //     try {
            //         // Check if the player is already in the lobby or if it's full
            //         const checkResponse = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/lobbys', {
            //             method: 'GET',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 lobby_id: lobbyId,
            //                 user_id: userId,
            //             }),
            //         });

            //         if (!checkResponse.ok) {
            //             throw new Error('Failed to check lobby status');
            //         }

            //         const result = await checkResponse.json();

            //         if (result.isInLobby) {
            //             alert('You are already in this lobby!');
            //             window.location.href = `game.html?lobby_id=${lobbyId}`;
            //             return;
            //         }

            //         if (result.isFull) {
            //             alert('The lobby is full. You cannot join.');
            //             return;
            //         }

            //         // If checks pass, allow the player to join
            //         const joinResponse = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/lobbys/joijn', {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 lobby_id: lobbyId,
            //                 user_id: userId,
            //             }),
            //         });

            //         if (!joinResponse.ok) {
            //             throw new Error('Failed to join the lobby');
            //         }

            //         alert('Successfully joined the lobby!');
            //         window.location.href = `game.html?lobby_id=${lobbyId}`;
            //     } catch (error) {
            //         console.error(error);
            //         alert('An error occurred. Please try again later.');
            //     }
            // });

            // ul.appendChild(li);
        });
                

                // Optional: Add functionality for the "Join" button
                li.querySelector('button').addEventListener('click', () => {
                    window.location.href = `game.html?lobby_id=${lobbys.game_id}`;
                });

                ul.appendChild(li);

            lobbyList.appendChild(ul);
        } catch (error) {
            console.error(error);
            lobbyList.innerHTML = '<p class="text-center text-danger">Failed to load lobbies. Please try again later.</p>';
        }
    }

    // Call the fetchLobbies function when the page loads
    document.addEventListener('DOMContentLoaded', fetchLobbies);

