CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rank INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lobbies (
    lobby_id INT AUTO_INCREMENT PRIMARY KEY,
    host_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('waiting', 'in_progress', 'finished') DEFAULT 'waiting',
    FOREIGN KEY (host_id) REFERENCES users(user_id)
);

CREATE TABLE games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    lobby_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('in_progress', 'completed') DEFAULT 'in_progress',
    current_turn_user_id INT,
    FOREIGN KEY (lobby_id) REFERENCES lobbies(lobby_id),
    FOREIGN KEY (current_turn_user_id) REFERENCES users(user_id)
);

CREATE TABLE game_players (
    game_player_id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    user_id INT NOT NULL,
    position ENUM('first', 'second', 'third', 'fourth'),
    score INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE boards (
    board_id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    board_state JSON NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(game_id)
);

CREATE TABLE pieces (
    piece_id INT AUTO_INCREMENT PRIMARY KEY,
    board_id INT NOT NULL,
    user_id INT NOT NULL,
    piece_data JSON NOT NULL,
    placed_at TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES boards(board_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
