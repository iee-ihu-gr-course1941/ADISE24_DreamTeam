<?php

    require_once 'dbconnect.php';
    require_once 'helper.php';

    header('Content-Type: application/json');

    function getBoard($board_id) {
        try {
            // Get the database connection
            $pdo = getDatabaseConnection();
    
            // Prepare the SQL query to call the stored procedure
            $sql = "CALL GetBoard(:board_id);";
            $stmt = $pdo->prepare($sql);
    
            // Bind and execute the parameter
            $stmt->execute([':board_id' => $board_id]);
    
            // Fetch the result
            $board = $stmt->fetch(PDO::FETCH_ASSOC);
    
            // Check if the board exists
            if ($board) {
                // Decode the board_state as a PHP array
                $decodedBoard = json_decode($board['board_state'], true); // Decode as associative array
    
                // Return the board state in the response
                echo json_encode([
                    'success' => true,
                    'message' => 'Board fetched successfully',
                    'board' => $decodedBoard, // Return as a JSON array
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Board not found'
                ]);
            }
        } catch (PDOException $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ]);
        }
    }
    

?>
