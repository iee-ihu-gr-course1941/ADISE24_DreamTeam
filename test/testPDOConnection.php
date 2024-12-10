<?php
header('Content-Type: application/json');

// Include the database connection file
require_once './api/config/connection.php';

/**
 * Test the PDO connection.
 *
 * @param PDO $pdo
 * @return string JSON response indicating the connection status
 */
function testPDOConnection($pdo) {
    try {
        // Try to execute a simple query to check the connection
        $pdo->query("SELECT 1");
        return json_encode(['status' => 'connected']);
    } catch (PDOException $e) {
        // If there is an error, return not connected
        return json_encode(['status' => 'not connected', 'error' => $e->getMessage()]);
    }
}

// Call the test function
echo testPDOConnection($pdo);
?>
