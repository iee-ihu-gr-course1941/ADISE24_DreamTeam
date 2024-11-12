<?php
// test_connection.php

// Include the connection script
include 'src/connection.php';

// Test the database connection
$conn = connectDatabase();

if ($conn->ping()) {
    echo "Database connection successful!";
} else {
    echo "Database connection failed: " . $conn->error;
}

$conn->close();
?>