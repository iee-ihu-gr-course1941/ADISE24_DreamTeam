<?php

require_once 'dbconnect.php';
require_once 'helper.php';

header('Content-Type: application/json');

// **Registration Function (Register a new user)**
function registerUser($username, $email, $password) {
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

        echo json_encode(['success' => true, 'message' => 'User registered successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}


// **Login Function (Authenticate User)**
function loginUser($username, $password) {
    session_start();
    
    try {
        $pdo = getDatabaseConnection();
        
        // Fetch the user details from the database using the provided username
        $sql = "SELECT user_id , username, password FROM users WHERE username = :username";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            // Verify the entered password with the stored hashed password
            if (password_verify($password, $user['password'])) {
                // If login is successful, store the user details in session
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['username'] = $user['username'];
                echo json_encode(['success' => true, 'message' => 'Login successful']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

// **Login Provider (Helper Function to Get User from DB)**
function loginUserFromDB($username, $password) {
    try {
        $pdo = getDatabaseConnection();
        
        // SQL query to fetch the user data by username
        $sql = "SELECT user_id, username, password FROM users WHERE username = :username";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            // Use password_verify to compare the entered password with the stored hash
            if (password_verify($password, $user['password'])) {
                // Return user data if login is successful
                return [
                    'success' => true,
                    'user_id' => $user['user_id'],
                    'username' => $user['username']
                ];
            } else {
                return ['success' => false, 'message' => 'Invalid username or password'];
            }
        } else {
            return ['success' => false, 'message' => 'User not found'];
        }
    } catch (PDOException $e) {
        // Log the error and return a failure response
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

// **Logout Function (Destroy User Session)**
function logoutUser() {
    session_start();
    session_unset();
    session_destroy();

    echo json_encode(['success' => true, 'message' => 'User logged out successfully']);
}

// **Check Session Function (Check if User is Logged In)**
function checkSession() {
    session_start();

    if (isset($_SESSION['user_id'])) {
        echo json_encode(['loggedIn' => true, 'user_id' => $_SESSION['user_id'] , 'username' => $_SESSION['username']]);
    } else {
        echo json_encode(['loggedIn' => false]);
    }
}

// **Reset Password Function (Send Password Reset Email)**
function resetPassword($email) {
    try {
        $pdo = getDatabaseConnection();
        $sql = "SELECT id FROM users WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $resetToken = bin2hex(random_bytes(16)); // Generate a reset token
            $sql = "UPDATE users SET reset_token = :token, reset_expiry = :expiry WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':token' => $resetToken,
                ':expiry' => date('Y-m-d H:i:s', strtotime('+1 hour')),
                ':id' => $user['id'],
            ]);

            // Replace this with your email-sending logic
            mail($email, "Password Reset Request", "Use this link to reset your password: https://your-site.com/reset?token=$resetToken");

            echo json_encode(['success' => true, 'message' => 'Password reset email sent']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Email not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

// **Update Password Function (Update User's Password)**
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

        echo json_encode(['success' => true, 'message' => 'Password updated successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

?>
