<?php
/**
 * Establishes a database connection.
 *
 * @return PDO
 */
function getDatabaseConnection() {
    $host = '139.138.206.194';
    $db = 'blokus'; // Replace with your database name
    $user = 'root'; // Replace with your database username
    $pass = '';     // Replace with your database password

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die(json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]));
    }
}
?>
