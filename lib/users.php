<?php

require_once 'dbconnect.php';
require_once 'helper.php';

header('Content-Type: application/json');

// **Registration Function (Register a new user)**
function registerUser($username, $password) {
    try {
        $pdo = getDatabaseConnection();

        // Hash the password securely using PHP's password_hash
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Call the stored procedure to create the user with the securely hashed password
        $sql = "CALL CreateUser(:username, :password)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':password' => $hashedPassword, // Use the hashed password here
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
        $sql = "CALL GetUserByUsername(:username);";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            // Verify the entered password with the stored hashed password
            $isPasswordCorrect = password_verify($password, $user['password_hash']);
            
            if ($isPasswordCorrect) {
                // If login is successful, store the user details in session
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['username'] = $user['username'];
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'user_id' => $user['user_id'],
                    'username' => $user['username'],
                ]);
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
        echo json_encode(['success' => true, 'user_id' => $_SESSION['user_id'] , 'username' => $_SESSION['username']]);
    } else {
        echo json_encode(['success' => false]);
    }
}

?>
