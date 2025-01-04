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
                // Return the board state as a JSON object
                echo json_encode([
                    'success' => true,
                    'message' => 'Board fetched successfully',
                    'board_state' => json_decode($board['board_state']), // Assuming board_state is a valid JSON string
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
