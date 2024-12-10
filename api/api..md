# Blokus Game API

This README provides an overview of all the PHP API functions you'll need for your Blokus game project. The functions are categorized based on the operations they perform, including user authentication, game management, account operations, and more.

## User Authentication

- **`registerUser($username, $password, $email)`**: Registers a new user with a username, password, and email.
- **`loginUser($username, $password)`**: Authenticates a user and starts a session.
- **`logoutUser()`**: Logs out the user and ends the session.
- **`checkSession()`**: Checks if the user is logged in by verifying the session.
- **`resetPassword($email)`**: Sends a password reset link to the user's email.
- **`updatePassword($userId, $newPassword)`**: Updates the user's password.

## Account Management

- **`getUserProfile($userId)`**: Retrieves the profile details of the user.
- **`updateUserProfile($userId, $username, $email)`**: Updates the user's profile details (e.g., username or email).
- **`deleteUser($userId)`**: Deletes the user's account.
- **`getUserGameStats($userId)`**: Retrieves the user's game statistics (e.g., wins, losses, rank).

## Game Management

- **`createGame($userId, $gameType, $maxPlayers)`**: Creates a new game, specifying the type (e.g., solo, multiplayer) and maximum number of players.
- **`joinGame($userId, $gameId)`**: Allows a user to join an existing game.
- **`getGameDetails($gameId)`**: Retrieves the details of a specific game (e.g., players, status).
- **`getAvailableGames()`**: Lists all available games (for joining).
- **`leaveGame($userId, $gameId)`**: Allows a user to leave an ongoing game.
- **`startGame($gameId)`**: Starts the game once enough players have joined.
- **`endGame($gameId)`**: Ends the game, calculating the winner and updating stats.
- **`getGameState($gameId)`**: Retrieves the current state of the game (e.g., current player's turn, board state).
- **`updateGameState($gameId, $moveData)`**: Updates the game state with the player's move (e.g., coordinates and piece placed).
- **`getGameHistory($gameId)`**: Retrieves the history of moves made in the game.

## Lobby and Matchmaking

- **`getLobbies()`**: Lists all active game lobbies for users to join.
- **`createLobby($userId)`**: Creates a lobby where players can wait for others to join.
- **`joinLobby($userId, $lobbyId)`**: Allows a user to join an existing lobby.
- **`leaveLobby($userId, $lobbyId)`**: Allows a user to leave a lobby.
- **`getLobbyDetails($lobbyId)`**: Retrieves the details of a specific lobby (e.g., players in the lobby).

## Game Progress

- **`getNextPlayerTurn($gameId)`**: Retrieves the next player's turn in the game.
- **`getAvailableMoves($gameId, $playerId)`**: Retrieves a list of available moves for the current player.
- **`getPlayerPieces($gameId, $playerId)`**: Retrieves the pieces available to the current player.
- **`updatePlayerMove($gameId, $playerId, $move)`**: Updates the game state with the player's move (e.g., placing a piece on the board).

## Real-Time Game Updates

- **`getGameUpdates($gameId)`**: Retrieves real-time updates of the game's state (e.g., new moves, game progress).
- **`sendMessageToPlayers($gameId, $message)`**: Sends a message to all players in a game.

## Leaderboard

- **`getLeaderboard()`**: Retrieves the global leaderboard of the top players based on their wins or other criteria.
- **`getUserLeaderboardPosition($userId)`**: Retrieves the user's position on the leaderboard.

## Error Handling

- **`handleError($errorMessage)`**: Handles errors and returns a standardized error response.
- **`logError($errorDetails)`**: Logs any error details for debugging and monitoring.

## Miscellaneous

- **`getGameSettings()`**: Retrieves default game settings (e.g., game type, time limits).
- **`updateGameSettings($settings)`**: Allows admins or users to update game settings.

---

### Notes

- Ensure proper security measures are in place, such as hashing passwords and validating inputs.
- Implement error handling for API calls and user actions to improve the user experience.
- This API structure is flexible and can be extended to accommodate more features as the project grows.
