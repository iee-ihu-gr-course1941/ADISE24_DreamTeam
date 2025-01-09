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
                    <strong>Lobby #${lobbys.game_id},</strong> - <strong>Player1(Host):</strong> ${lobbys.host}, 
                </span>
                <button class="btn btn-primary btn-sm ready-btn1" style="display:none;" data-user-id="${lobbys.host}">Ready</button>

                <span> 
                    <strong>Player2:</strong> ${lobbys.player2}, 
                </span>
                <span>
                    <strong>Player3:</strong> ${lobbys.player3}, 
                </span>

                <span>
                    <strong>Player4:</strong> ${lobbys.player4}, 
                </span>
                <span>
                    <strong>Game Status:</strong> ${lobbys.game_status}
                </span>

                <button class="btn btn-primary btn-sm join-btn" data-lobby-id="${lobbys.game_id}">Join</button>
                <button class="btn btn-primary btn-sm ready-btn" style="display:none;" data-user-id="${lobbys.user_id}">Ready</button>
                <button class="btn btn-primary btn-sm start-btn" style="display:none;" data-lobby-id="${lobbys.game_id}">Start</button>
                `;

                // li.innerHTML = `
                // <span>
                //     <strong>Lobby #${lobbys.game_id},</strong> - <strong>Player1(Host):</strong> ${lobbys.host}, <strong>Player2:</strong> ${lobbys.player2}, <strong>Player3:</strong> ${lobbys.player3}, <strong>Player4:</strong> ${lobbys.player4}, <strong>Game Status:</strong> ${lobbys.game_status}
                // </span>
                // <button class="btn btn-primary btn-sm join-btn" data-lobby-id="${lobbys.game_id}">Join</button>
                // <button class="btn btn-primary btn-sm ready-btn" style="display:none;" data-user-id="${lobbys.user_id}">Ready</button>
                // <button class="btn btn-primary btn-sm start-btn" style="display:none;" data-lobby-id="${lobbys.game_id}">Start</button>
                // `;

                const joinButton = li.querySelector('.join-btn');
                const readyButton = li.querySelector('.ready-btn');
                const readyButton1 = li.querySelector('.ready-btn1');
                // const readyButton3 = li.querySelector('.ready-btn3');
                // const readyButton4 = li.querySelector('.ready-btn4');
                const startButton = li.querySelector('.start-btn');
                
                const CurrentuserId = getCookieValue('user_id');
                if (lobbys.host == CurrentuserId){
                    readyButton1.style.display = 'inline-block';
                }
                // else{
                //     joinButton.style.display = 'inline-block';
                // }
                

                li.querySelector('.join-btn').addEventListener('click', async (event) => {
                    const userId = getCookieValue('user_id');
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
                            joinButton.disabled = true;
                            joinButton.style.display = 'none';
                            readyButton.style.display = 'inline-block';
                            readyButton.disabled = false;

                            // if(userId == userId){
                            //     readyButton1.style.display = 'inline-block';
                            // }
                            // if (lobbys.player2 == userId) {
                            //     readyButton2.style.display = 'inline-block';
                            // }
                            // if (lobbys.player3 == userId) {
                            //     readyButton3.style.display = 'inline-block';
                            // }
                            // if (lobbys.player4 == userId) {
                            //     readyButton4.style.display = 'inline-block';
                            // }
                        } else {
                            alert(result.message || 'Failed to join the lobby.');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Failed to join the lobby. Please try again later.');
                    }
                });

                // const userId = getCookieValue('user_id');
                // if(userId == lobbys.host){
                //     startButton.style.display = 'inline-block';
                // }
                // else if(userId == lobbys.player2){
                //     startButton.style.display = 'inline-block';
                // }
                // else if(userId == lobbys.player3){
                //     startButton.style.display = 'inline-block';
                // }
                // else if(userId == lobbys.player4){
                //     startButton.style.display = 'inline-block';
                // }

                li.querySelector('.ready-btn').addEventListener('click', async (event) => {
                    readyButton.disabled = true;
                    readyButton.innerText = 'Ready (Checked)';
                    startButton.style.display = 'inline-block';
                    // checkIfAllPlayersReady(lobbyId);
                });

                li.querySelector('.ready-btn1').addEventListener('click', async (event) => {
                    readyButton1.disabled = true;
                    readyButton1.innerText = 'Ready (Checked)';
                    startButton.style.display = 'inline-block';
                    // checkIfAllPlayersReady(lobbyId);
                });

                li.querySelector('.start-btn').addEventListener('click', async (event) => {
                    const lobbyId = event.target.getAttribute('data-lobby-id');
                    window.location.href = `game.html?lobby_id=${lobbyId}`;
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

