<?php

require_once 'dbconnect.php';
require_once 'helper.php';

header('Content-Type: application/json');

// Functions for handling user operations
function registerUser($username, $password, $email) {
    try {
        $pdo = getDatabaseConnection();
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username, password, email) VALUES (:username, :password, :email)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':password' => $hashedPassword,
            ':email' => $email,
        ]);

        return ['success' => true, 'message' => 'User registered successfully'];
    } catch (PDOException $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

function loginUser($username, $password) {
    session_start();
    
    try {
        $pdo = getDatabaseConnection();
        $sql = "SELECT id, password FROM users WHERE username = :username";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            return ['success' => true, 'message' => 'Login successful'];
        } else {
            return ['success' => false, 'message' => 'Invalid username or password'];
        }
    } catch (PDOException $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

function logoutUser() {
    session_start();
    session_unset();
    session_destroy();

    return ['success' => true, 'message' => 'User logged out successfully'];
}

function checkSession() {
    session_start();

    if (isset($_SESSION['user_id'])) {
        return ['loggedIn' => true, 'user_id' => $_SESSION['user_id']];
    } else {
        return ['loggedIn' => false];
    }
}

function resetPassword($email) {
    try {
        $pdo = getDatabaseConnection();
        $sql = "SELECT id FROM users WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $resetToken = bin2hex(random_bytes(16));
            $sql = "UPDATE users SET reset_token = :token, reset_expiry = :expiry WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':token' => $resetToken,
                ':expiry' => date('Y-m-d H:i:s', strtotime('+1 hour')),
                ':id' => $user['id'],
            ]);

            // Replace this with your email-sending logic
            mail($email, "Password Reset Request", "Use this link to reset your password: https://your-site.com/reset?token=$resetToken");

            return ['success' => true, 'message' => 'Password reset email sent'];
        } else {
            return ['success' => false, 'message' => 'Email not found'];
        }
    } catch (PDOException $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

function updatePassword($userId, $newPassword) {
    try {
        $pdo = getDatabaseConnection();
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        $sql = "UPDATE users SET password = :password WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':password' => $hashedPassword,
            ':id' => $userId,
        ]);

        return ['success' => true, 'message' => 'Password updated successfully'];
    } catch (PDOException $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}


// Main Controller - API Handler
$method = $_SERVER['REQUEST_METHOD'];
$segments = getPathSegments();

// Check if the request matches the base path
if ($segments[0] === 'users') {
    // Handle POST requests for login, register, reset password, etc.
    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if ($data && isset($data['action'])) {
            switch ($data['action']) {
                case 'login':
                    echo json_encode(loginUser($data['username'], $data['password']));
                    break;
                case 'register':
                    echo json_encode(registerUser($data['username'], $data['password'], $data['email']));
                    break;
                case 'reset_password':
                    echo json_encode(resetPassword($data['email']));
                    break;
                case 'update_password':
                    echo json_encode(updatePassword($data['user_id'], $data['new_password']));
                    break;
                default:
                    http_response_code(400);
                    echo json_encode(["success" => false, "message" => "Invalid action", "data" => null]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Action not specified or invalid", "data" => null]);
        }
    }
    // Handle GET requests to check session
    elseif ($method === 'GET') {
        echo json_encode(checkSession());
    } 
    else {
        http_response_code(405); // Method not allowed
        echo json_encode(["success" => false, "message" => "Method not allowed", "data" => null]);
    }
} else {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Endpoint not found", "data" => null]);
}

?>

