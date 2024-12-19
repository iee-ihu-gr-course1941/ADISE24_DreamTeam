-- Users table for user management (assuming it's already created)
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store games
CREATE TABLE `games` (
  `game_id` INT AUTO_INCREMENT PRIMARY KEY,
  `player1_id` INT NOT NULL,
  `player2_id` INT,
  `game_status` ENUM('waiting', 'in_progress', 'finished') DEFAULT 'waiting',
  `game_type` VARCHAR(50),
  `max_players` INT DEFAULT 2,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`player1_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`player2_id`) REFERENCES `users`(`id`)
);

-- Table to store game lobbies
CREATE TABLE `lobbies` (
  `lobby_id` INT AUTO_INCREMENT PRIMARY KEY,
  `created_by` INT NOT NULL,
  `status` ENUM('waiting', 'in_progress', 'finished') DEFAULT 'waiting',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`created_by`) REFERENCES `users`(`id`)
);

-- Table to store players in lobbies (many-to-many relationship between users and lobbies)
CREATE TABLE `lobby_players` (
  `lobby_id` INT,
  `user_id` INT,
  `joined_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`lobby_id`, `user_id`),
  FOREIGN KEY (`lobby_id`) REFERENCES `lobbies`(`lobby_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

-- Table to store game state (board state, turn, etc.)
CREATE TABLE `game_state` (
  `game_id` INT,
  `current_turn` INT, -- user_id of the player whose turn it is
  `board_state` TEXT, -- JSON or serialized data for the board state
  PRIMARY KEY (`game_id`),
  FOREIGN KEY (`game_id`) REFERENCES `games`(`game_id`)
);

-- Table to store moves made in the game
CREATE TABLE `moves` (
  `move_id` INT AUTO_INCREMENT PRIMARY KEY,
  `game_id` INT,
  `player_id` INT,
  `position_x` INT,
  `position_y` INT,
  `move_timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `orientation` VARCHAR(50), -- Any other info related to the move (e.g., piece orientation)
  FOREIGN KEY (`game_id`) REFERENCES `games`(`game_id`),
  FOREIGN KEY (`player_id`) REFERENCES `users`(`id`)
);

-- Table to store game history (e.g., logs of moves)
CREATE TABLE `game_history` (
  `history_id` INT AUTO_INCREMENT PRIMARY KEY,
  `game_id` INT,
  `move_id` INT,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`game_id`) REFERENCES `games`(`game_id`),
  FOREIGN KEY (`move_id`) REFERENCES `moves`(`move_id`)
);

-- Table to store game results (e.g., winner, final score, etc.)
CREATE TABLE `game_results` (
  `game_id` INT,
  `winner_id` INT,
  `end_timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`),
  FOREIGN KEY (`game_id`) REFERENCES `games`(`game_id`),
  FOREIGN KEY (`winner_id`) REFERENCES `users`(`id`)
);
