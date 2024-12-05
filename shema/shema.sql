CREATE TABLE `board_20` (
  `x` tinyint(1) NOT NULL,
  `y` tinyint(1) NOT NULL,
  `block` enum('R','B','G','Y','W') DEFAULT 'W',
  PRIMARY KEY (`x`,`y`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- blokus.pieces definition

CREATE TABLE `pieces` (
  `piece_id` int(11) NOT NULL,
  `shape` enum('S','L','T','Z','I','O') NOT NULL,
  `size` enum('1','2','3','4','5') NOT NULL,
  `color` enum('R','B','Y','G') NOT NULL,
  `grid_5x5` varchar(25) NOT NULL,
  `used` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`piece_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE DEFINER=`root`@`localhost` PROCEDURE `blokus`.`clear_pieces`()
begin
	UPDATE pieces SET used = false;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `blokus`.`fetch_board`()
begin
	SELECT x, y, block FROM board_20 ORDER BY x, y;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `blokus`.`initialize_board_20`()
BEGIN
    DECLARE x INT DEFAULT 1;
    DECLARE y INT DEFAULT 1;

    -- Loop through x and y to insert all possible combinations
    WHILE x <= 20 DO
        WHILE y <= 20 DO
            INSERT INTO `board_20` (`x`, `y`, `block`) VALUES (x, y, 'W');
            SET y = y + 1;
        END WHILE;
        SET y = 1; -- Reset y for the next row
        SET x = x + 1;
    END WHILE;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `blokus`.`mirror_piece`(
    IN p_piece_grid VARCHAR(25),    -- The 5x5 grid of the piece
    OUT p_mirrored_grid VARCHAR(25)  -- The mirrored grid of the piece
)
BEGIN
    -- Mirror the grid horizontally (flip it)
    SET p_mirrored_grid = CONCAT(
        SUBSTRING(p_piece_grid, 5, 1), SUBSTRING(p_piece_grid, 4, 1), SUBSTRING(p_piece_grid, 3, 1), SUBSTRING(p_piece_grid, 2, 1),SUBSTRING(p_piece_grid, 1, 1),
        SUBSTRING(p_piece_grid, 10, 1), SUBSTRING(p_piece_grid, 9, 1), SUBSTRING(p_piece_grid, 8, 1), SUBSTRING(p_piece_grid, 7, 1),SUBSTRING(p_piece_grid, 6, 1),
        SUBSTRING(p_piece_grid, 15, 1), SUBSTRING(p_piece_grid, 14, 1), SUBSTRING(p_piece_grid, 13, 1), SUBSTRING(p_piece_grid, 12, 1),SUBSTRING(p_piece_grid, 11, 1),
        SUBSTRING(p_piece_grid, 20, 1), SUBSTRING(p_piece_grid, 19, 1), SUBSTRING(p_piece_grid, 18, 1), SUBSTRING(p_piece_grid, 17, 1), SUBSTRING(p_piece_grid, 16, 1),
        SUBSTRING(p_piece_grid, 25, 1),SUBSTRING(p_piece_grid, 24, 1),SUBSTRING(p_piece_grid, 23, 1),SUBSTRING(p_piece_grid, 22, 1),SUBSTRING(p_piece_grid, 21, 1)
    );
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `blokus`.`place_piece`(
    IN p_piece_id INT,         -- The ID of the piece being placed
    IN p_start_x TINYINT(1),   -- The starting X coordinate on the board
    IN p_start_y TINYINT(1),   -- The starting Y coordinate on the board
    IN p_mirror BOOLEAN,       -- Flag for mirroring the piece (TRUE/FALSE)
    IN p_rotate ENUM('0', '90', '180', '270') -- Rotation angle
)
BEGIN
    DECLARE is_valid BOOLEAN;
    DECLARE piece_shape VARCHAR(1);
    DECLARE piece_size VARCHAR(1);
    DECLARE piece_color VARCHAR(1);
    DECLARE piece_grid VARCHAR(25);  -- Grid of the piece as a 25-character string
    DECLARE piece_used BOOLEAN;
    DECLARE i INT;
    DECLARE x INT;
    DECLARE y INT;
    DECLARE rotated_grid VARCHAR(25);
    DECLARE mirrored_grid VARCHAR(25);
   
    -- Check if the move is valid by calling the valid_move procedure
    CALL blokus.valid_move(p_piece_id, p_start_x, p_start_y, is_valid);

    -- If the move is not valid, raise an error
    IF is_valid = FALSE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid move. Cannot place the piece.';
    END IF;

    -- Retrieve piece data from the pieces table, including the 'used' status
    SELECT shape, size, color, grid_5x5, used
    INTO piece_shape, piece_size, piece_color, piece_grid, piece_used
    FROM pieces
    WHERE piece_id = p_piece_id
    LIMIT 1;
   
    -- Check if the piece has already been used
    IF piece_used = TRUE THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Piece has already been played.';
    END IF;

    -- Mirror the piece if requested
    IF p_mirror = TRUE THEN
        CALL blokus.mirror_piece(piece_grid, mirrored_grid);
    ELSE
        SET mirrored_grid = piece_grid; -- No mirroring
    END IF;

    -- Rotate the piece if requested
    CALL blokus.rotate_piece(mirrored_grid, p_rotate, rotated_grid);
   
    -- Now, proceed to place the piece using the final rotated and mirrored grid
    SET i = 1;
    WHILE i <= 25 DO
        SET x = p_start_x + ((i - 1) % 5);
        SET y = p_start_y + FLOOR((i - 1) / 5);

        -- If the grid position contains part of the piece ('1' in grid_5x5), place it on the board
        IF SUBSTRING(rotated_grid, i, 1) = '1' THEN
            -- Update the board with the piece's color
            INSERT INTO board_20 (x, y, block)
            VALUES (x, y, piece_color)
            ON DUPLICATE KEY UPDATE block = piece_color;
        END IF;

        SET i = i + 1;
    END WHILE;

    -- Mark the piece as used
    UPDATE pieces SET used = TRUE WHERE piece_id = p_piece_id;
END;


CREATE DEFINER=`root`@`localhost` PROCEDURE `blokus`.`rotate_piece`(
    IN p_piece_grid VARCHAR(25),    -- The 5x5 grid of the piece
    IN p_rotate ENUM('0', '90', '180', '270'),  -- Rotation angle
    OUT p_rotated_grid VARCHAR(25)   -- The rotated grid of the piece
)
BEGIN
    IF p_rotate = '90' THEN
        -- Rotate the piece 90 degrees clockwise
        SET p_rotated_grid = CONCAT(
            SUBSTRING(p_piece_grid, 21, 1), SUBSTRING(p_piece_grid, 16, 1), SUBSTRING(p_piece_grid, 11, 1), SUBSTRING(p_piece_grid, 6, 1), SUBSTRING(p_piece_grid, 1, 1), -- New row 1
            SUBSTRING(p_piece_grid, 22, 1), SUBSTRING(p_piece_grid, 17, 1), SUBSTRING(p_piece_grid, 12, 1), SUBSTRING(p_piece_grid, 7, 1), SUBSTRING(p_piece_grid, 2, 1), -- New row 2
            SUBSTRING(p_piece_grid, 23, 1), SUBSTRING(p_piece_grid, 18, 1), SUBSTRING(p_piece_grid, 13, 1), SUBSTRING(p_piece_grid, 8, 1), SUBSTRING(p_piece_grid, 3, 1), -- New row 3
            SUBSTRING(p_piece_grid, 24, 1), SUBSTRING(p_piece_grid, 19, 1), SUBSTRING(p_piece_grid, 14, 1), SUBSTRING(p_piece_grid, 9, 1), SUBSTRING(p_piece_grid, 4, 1), -- New row 4
            SUBSTRING(p_piece_grid, 25, 1), SUBSTRING(p_piece_grid, 20, 1), SUBSTRING(p_piece_grid, 15, 1), SUBSTRING(p_piece_grid, 10, 1), SUBSTRING(p_piece_grid, 5, 1)  -- New row 5
        );
    ELSEIF p_rotate = '180' THEN
        -- Rotate the piece 180 degrees
        SET p_rotated_grid = REVERSE(p_piece_grid);
    ELSEIF p_rotate = '270' THEN
        -- Rotate the piece 270 degrees clockwise
        SET p_rotated_grid = CONCAT(
            SUBSTRING(p_piece_grid, 5, 1), SUBSTRING(p_piece_grid, 10, 1), SUBSTRING(p_piece_grid, 15, 1), SUBSTRING(p_piece_grid, 20, 1), SUBSTRING(p_piece_grid, 25, 1),
            SUBSTRING(p_piece_grid, 4, 1), SUBSTRING(p_piece_grid, 9, 1), SUBSTRING(p_piece_grid, 14, 1), SUBSTRING(p_piece_grid, 19, 1), SUBSTRING(p_piece_grid, 24, 1),
            SUBSTRING(p_piece_grid, 3, 1), SUBSTRING(p_piece_grid, 8, 1), SUBSTRING(p_piece_grid, 13, 1), SUBSTRING(p_piece_grid, 18, 1), SUBSTRING(p_piece_grid, 23, 1),
            SUBSTRING(p_piece_grid, 2, 1), SUBSTRING(p_piece_grid, 7, 1), SUBSTRING(p_piece_grid, 12, 1), SUBSTRING(p_piece_grid, 17, 1), SUBSTRING(p_piece_grid, 22, 1),
            SUBSTRING(p_piece_grid, 1, 1), SUBSTRING(p_piece_grid, 6, 1), SUBSTRING(p_piece_grid, 11, 1), SUBSTRING(p_piece_grid, 16, 1), SUBSTRING(p_piece_grid, 21, 1)
        );
    ELSE
        -- No rotation (0 degrees)
        SET p_rotated_grid = p_piece_grid;
    END IF;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `blokus`.`rotate_piece_demo_simple`(
    IN p_piece_id INT,          -- The ID of the piece to rotate
    IN p_start_x TINYINT(1),    -- The starting X coordinate
    IN p_start_y TINYINT(1),    -- The starting Y coordinate
    IN p_mirror BOOLEAN         -- Whether to mirror the piece
)
begin
	
	call clear_board();
	call clear_pieces();
	
	CALL place_piece(p_piece_id,  p_start_x, p_start_y , p_mirror,'0');
	
	DO SLEEP(0.5);
	
	call clear_board();
	call clear_pieces();
	CALL place_piece(p_piece_id,  p_start_x, p_start_y , p_mirror,'90');
	
	DO SLEEP(0.5);
	
	call clear_board();
	call clear_pieces();
	CALL place_piece(p_piece_id,  p_start_x, p_start_y , p_mirror,'180');
	
	DO SLEEP(0.5);
	
	call clear_board();
	call clear_pieces();
	
	CALL place_piece(p_piece_id, p_start_x, p_start_y , p_mirror,'270');
	
	DO SLEEP(0.5);
	
	call clear_board();
	call clear_pieces();
  
    END


    CREATE PROCEDURE blokus.valid_move(
    IN p_piece_id INT,          -- ID of the piece being placed
    IN p_start_x INT,           -- X coordinate where the piece starts
    IN p_start_y INT,           -- Y coordinate where the piece starts
    OUT is_valid BOOLEAN        -- Output parameter indicating if the move is valid
)
BEGIN
    DECLARE piece_grid VARCHAR(25);   -- 5x5 piece grid
    DECLARE board_state VARCHAR(400); -- 20x20 board grid (as VARCHAR)
    DECLARE i INT;                    -- Loop counter for piece grid
    DECLARE x INT;                    -- Calculated X position on the board
    DECLARE y INT;                    -- Calculated Y position on the board

    -- Initialize is_valid to TRUE (assume move is valid)
    SET is_valid = TRUE;

    -- Retrieve the piece's grid (5x5) from the pieces table
    SELECT grid_5x5 INTO piece_grid
    FROM pieces
    WHERE piece_id = p_piece_id;

    -- Retrieve the current state of the board as a 400-character string
    SELECT GROUP_CONCAT(block ORDER BY y, x SEPARATOR '')
    INTO board_state
    FROM board_20
    WHERE x BETWEEN 1 AND 20 AND y BETWEEN 1 AND 20;

    -- Loop through the piece's 5x5 grid
    SET i = 1;
    WHILE i <= 25 DO
        -- Calculate the board coordinates (x, y) for each part of the piece
        SET x = p_start_x + ((i - 1) % 5);
        SET y = p_start_y + FLOOR((i - 1) / 5);

        -- Check if the current piece grid position is part of the piece (i.e., '1')
        IF SUBSTRING(piece_grid, i, 1) = '1' THEN
            -- Check if the position is out of bounds
            IF x < 0 OR x >= 20 OR y < 0 OR y >= 20 THEN
                SET is_valid = FALSE;  -- Move is out of bounds
            ELSE
                -- Check if the corresponding board position is occupied
                IF SUBSTRING(board_state, (y * 20) + x + 1, 1) != 'W' THEN
                    SET is_valid = FALSE;  -- Move is invalid (space occupied)
                END IF;
            END IF;
        END IF;

        -- Move to the next position in the piece grid
        SET i = i + 1;
    END WHILE;
END;


CREATE PROCEDURE blokus.clear_board()
begin
	UPDATE board_20 SET block = 'W';
END