<?php

require_once 'dbconnect.php';

header('Content-Type: application/json');

// Function to parse the URL (path parameter from query string)
function getPathSegments() {
    $path = isset($_GET['path']) ? $_GET['path'] : '';
    $segments = explode('/', trim($path, '/'));
    return $segments;
}

// Function to get the database connection


// RESTful Functions
function show_users() {
    $pdo = getDatabaseConnection();
    $sql = 'SELECT username, piece_color FROM players';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($res, JSON_PRETTY_PRINT);
}

function show_user($piece_color) {
    $pdo = getDatabaseConnection();
    $sql = 'SELECT username, piece_color FROM players WHERE piece_color = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$piece_color]);
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($res, JSON_PRETTY_PRINT);
}

// Main Controller
$method = $_SERVER['REQUEST_METHOD'];
$segments = getPathSegments();

// Adjust paths for your directory structure
$basePath = 'ADISE24_DreamTeam/lib/users';

// Check if the request matches the base path
if ($segments[0] === 'users') {
    if ($method === 'GET') {
        if (count($segments) === 1) {
            // If no additional segment, call show_users()
            show_users();
        } elseif (count($segments) === 2) {
            // If additional segment, call show_user($piece_color)
            $piece_color = $segments[1];
            show_user($piece_color);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Invalid endpoint"]);
        }
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Endpoint not found"]);
}
?>

