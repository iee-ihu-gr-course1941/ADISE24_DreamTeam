<?php

require_once 'dbconnect.php';
require_once 'helper.php';

header('Content-Type: application/json');


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



// Main Controller
$method = $_SERVER['REQUEST_METHOD'];
$segments = getPathSegments();

// Adjust paths for your directory structure
$basePath = 'ADISE24_DreamTeam/lib/accounts';

// Check if the request matches the base path
if ($segments[0] === 'users') {
    if ($method === 'GET') {
        if (count($segments) === 1) {
            // If no additional segment, call show_users()
           // show_users();
        } elseif (count($segments) === 2) {
            // If additional segment, call getUserProfile($userId)
            $userId = $segments[1];
          //  getUserProfile($userId);
        } elseif (count($segments) == 3){
		$userName = $segment[1];
		$pass = $segment[2];
		loginUser($userName,$pass);
	}  

	else {
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
