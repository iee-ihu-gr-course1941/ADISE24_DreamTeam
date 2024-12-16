<?php
require_once "lib/dbconnect.php";
require_once "lib/helper_function.php";  
require_once "lib/users.php"; 



// Get HTTP method and URL segments
$method = $_SERVER['REQUEST_METHOD'];
$segments = getPathSegments();

// Base API structure: "blokes/users"
if (count($segments) > 1 && $segments[0] === 'blokes' && $segments[1] === 'users') {
    try {
        // Routes based on HTTP methods and URL structure
        switch ($method) {
            case 'POST':
                // Handle registration, login, resetPassword, or updatePassword
                $data = json_decode(file_get_contents('php://input'), true);

                if (isset($segments[2]) && $segments[2] === 'resetPassword') {
                    $email = $data['email'] ?? null;
                    if (!$email) {
                        sendResponse(false, 'Email is required.', null, 400);
                    }
                    $result = resetPassword($email);
                    sendResponse(true, 'Password reset link sent.', $result);
                } elseif (isset($segments[2]) && $segments[2] === 'updatePassword') {
                    $userId = $data['userId'] ?? null;
                    $newPassword = $data['newPassword'] ?? null;
                    if (!$userId || !$newPassword) {
                        sendResponse(false, 'User ID and new password are required.', null, 400);
                    }
                    $result = updatePassword($userId, $newPassword);
                    sendResponse(true, 'Password updated successfully.', $result);
                } elseif (!isset($segments[2])) {
                    if (isset($data['action']) && $data['action'] === 'register') {
                        $username = $data['username'] ?? null;
                        $password = $data['password'] ?? null;
                        $email = $data['email'] ?? null;

                        if (!$username || !$password || !$email) {
                            sendResponse(false, 'All fields are required.', null, 400);
                        }
                        $result = registerUser($username, $password, $email);
                        sendResponse(true, 'User registered successfully.', $result);
                    } elseif (isset($data['action']) && $data['action'] === 'login') {
                        $username = $data['username'] ?? null;
                        $password = $data['password'] ?? null;

                        if (!$username || !$password) {
                            sendResponse(false, 'Username and password are required.', null, 400);
                        }
                        $result = loginUser($username, $password);
                        sendResponse(true, 'User logged in successfully.', $result);
                    } else {
                        sendResponse(false, 'Invalid action.', null, 400);
                    }
                } else {
                    sendResponse(false, 'Invalid endpoint.', null, 404);
                }
                break;

            case 'GET':
                // Handle session check or retrieve user profile
                if (count($segments) === 2) {
                    $result = checkSession();
                    if ($result) {
                        sendResponse(true, 'User is logged in.', $result);
                    } else {
                        sendResponse(false, 'No active session.', null, 401);
                    }
                } elseif (count($segments) === 3) {
                    $userId = $segments[2];
                    $result = getUserProfile($userId);
                    sendResponse(true, 'User profile retrieved.', $result);
                } else {
                    sendResponse(false, 'Invalid endpoint.', null, 404);
                }
                break;

            case 'DELETE':
                // Handle logout
                if (count($segments) === 2) {
                    $result = logoutUser();
                    sendResponse(true, 'User logged out successfully.', $result);
                } else {
                    sendResponse(false, 'Invalid endpoint.', null, 404);
                }
                break;

            default:
                sendResponse(false, 'Method not allowed.', null, 405);
        }
    } catch (Exception $e) {
        sendResponse(false, 'An error occurred: ' . $e->getMessage(), null, 500);
    }
} else {
    sendResponse(false, 'Endpoint not found.', null, 404);
}

?>
