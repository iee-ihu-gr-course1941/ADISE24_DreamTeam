<?php
require_once "lib/dbconnect.php";
require_once "lib/accounts.php";   // Assuming you have user-related functions
require_once "lib/users.php";
require_once "lib/version.php";


$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'), true);
if ($input == null) {
    $input = [];
}

if (isset($_SERVER['HTTP_X_TOKEN'])) {
    $input['token'] = $_SERVER['HTTP_X_TOKEN'];
} else {
    $input['token'] = '';
}

// Main routing logic
switch ($r = array_shift($request)) {
    case 'v1':
        handle_version($method);
    break;
	case 'accounts':
        	// Handle 'users' path
		switch ($b = array_shift($request)) {
			 case '':
               		 // Show all users
               		 handle_accounts($method, $input);
               		 break;
           	 default:
                // Show user by a specific identifier (e.g., color or ID)
               	 handle_account($method, $b, $input);
               break;
        }
        break;
//	case 'users':
//		handle_user($method, $input);
//	break;
	

    case 'status':
        // Handle 'status' path
        if (sizeof($request) == 0) {
            handle_status($method);
        } else {
            header("HTTP/1.1 404 Not Found");
        }
        break;

    default:
        // Return 404 if no valid endpoint is matched
        header("HTTP/1.1 404 Not Found");
        echo json_encode(['errormesg' => "Endpoint not found."]);
        exit;
}

function handle_version($method){
    if ($method == 'GET') {
        getApiVersion();  // Assuming you have a function to show users
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}


// Handler for 'users' endpoint (show all users)
function handle_accounts($method, $input) {
    if ($method == 'GET') {
        show_users();  // Assuming you have a function to show users
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}

// Handler for 'user' endpoint (show a specific user)
function handle_account($method, $identifier, $input) {
    if ($method == 'GET') {
        getUserProfile($identifier);  // Assuming you have a function to show a specific user
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}

function handle_user($method, $identifier, $input){
	if ($method == 'GET'){
		loginuser();
	}else { 
		header('HTTP/1.1 405 Methos Not Allowed ');
	}
}


// Handler for 'status' endpoint
function handle_status($method) {
    if ($method == 'GET') {
        show_status();  // Assuming you have a function to show status
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}
?>