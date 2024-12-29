// Function to fetch and display leaderboard
async function fetchLeaderboard() {
    const leaderboardTableBody = document.querySelector('#leaderboard tbody');
    leaderboardTableBody.innerHTML = '<tr><td colspan="3" class="text-center">Loading...</td></tr>'; // Show loading message

    try {
        // Fetch data from the server
        const response = await fetch('https://users.iee.ihu.gr/~iee2020202/ADISE24_DreamTeam/blokus.php/leaderboard');

        if (!response.ok) {
            throw new Error('Failed to fetch leaderboard');
        }

        const leaderboard = await response.json(); // Parse JSON data
        leaderboardTableBody.innerHTML = ''; // Clear loading message

        if (leaderboard.length === 0) {
            leaderboardTableBody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">No leaderboard data available.</td></tr>';
            return;
        }

        // Create rows for each player
        leaderboard.forEach(player => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${player.rank}</td>
                <td>${player.username}</td>
                <td>${player.wins}</td>
            `;

            leaderboardTableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
        leaderboardTableBody.innerHTML = '<tr><td colspan="3" class="text-center text-danger">Failed to load leaderboard. Please try again later.</td></tr>';
    }
}

// Call the fetchLeaderboard function when the page loads
document.addEventListener('DOMContentLoaded', fetchLeaderboard);
