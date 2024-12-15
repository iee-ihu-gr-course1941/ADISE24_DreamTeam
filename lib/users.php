<?php

require_once 'dbconnect.php';

header('Content-Type: application/json');

// Function to parse the URL (path parameter from query string)
function getPathSegments() {
    $path = isset($_GET['path']) ? $_GET['path'] : '';
    $segments = explode('/', trim($path, '/'));
    return $segments;
}
function show_user($b) {
	global $mysqli;
	$sql = 'select username,piece_color from players where piece_color=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('s',$b);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}

function set_user($b,$input) {
	//print_r($input);
	if(!isset($input['username']) || $input['username']=='') {
		header("HTTP/1.1 400 Bad Request");
		print json_encode(['errormesg'=>"No username given."]);
		exit;
	}
	$username=$input['username'];
	global $mysqli;
	$sql = 'select count(*) as c from players where piece_color=? and username is not null';
	$st = $mysqli->prepare($sql);
	$st->bind_param('s',$b);
	$st->execute();
	$res = $st->get_result();
	$r = $res->fetch_all(MYSQLI_ASSOC);
	if($r[0]['c']>0) {
		header("HTTP/1.1 400 Bad Request");
		print json_encode(['errormesg'=>"Player $b is already set. Please select another color."]);
		exit;
	}
	$sql = 'update players set username=?, token=md5(CONCAT( ?, NOW()))  where piece_color=?';
	$st2 = $mysqli->prepare($sql);
	$st2->bind_param('sss',$username,$username,$b);
	$st2->execute();


	
	update_game_status();
	$sql = 'select * from players where piece_color=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('s',$b);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
	
	
}

function handle_user($method, $b,$input) {
	if($method=='GET') {
		show_user($b);
	} else if($method=='PUT') {
        set_user($b,$input);
    }
}
function current_color($token) {
	
	global $mysqli;
	if($token==null) {return(null);}
	$sql = 'select * from players where token=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('s',$token);
	$st->execute();
	$res = $st->get_result();
	if($row=$res->fetch_assoc()) {
		return($row['piece_color']);
	}
	return(null);
}






/**
 * Retrieve user profile details
 */
function getUserProfile($userId) {
    $pdo = getDatabaseConnection(); // Get the PDO connection here
    try {
        $sql = "SELECT id, username, email, created_at FROM users WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            echo json_encode($user, JSON_PRETTY_PRINT); // Return the user's profile data as JSON
        } else {
            echo json_encode(['error' => 'User not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error in getUserProfile: ' . $e->getMessage()]);
    }
}

/**
 * Update user profile details
 */
function updateUserProfile($userId, $username, $email) {
    $pdo = getDatabaseConnection(); // Get the PDO connection here
    try {
        $sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username, $email, $userId]);
        return ['success' => $stmt->rowCount() > 0];
    } catch (PDOException $e) {
        return ['error' => 'Error in updateUserProfile: ' . $e->getMessage()];
    }
}

/**
 * Delete user account
 */
function deleteUser($userId) {
    $pdo = getDatabaseConnection(); // Get the PDO connection here
    try {
        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId]);
        return ['success' => $stmt->rowCount() > 0];
    } catch (PDOException $e) {
        return ['error' => 'Error in deleteUser: ' . $e->getMessage()];
    }
}

/**
 * Retrieve user's game statistics
 */
function getUserGameStats($userId) {
    $pdo = getDatabaseConnection(); // Get the PDO connection here
    try {
        $sql = "SELECT 
                    COUNT(CASE WHEN player1_id = ? AND winner_id = player1_id THEN 1 END) AS wins,
                    COUNT(CASE WHEN player2_id = ? AND winner_id = player2_id THEN 1 END) AS losses,
                    COUNT(game_id) AS total_games
                FROM games 
                WHERE player1_id = ? OR player2_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId, $userId, $userId, $userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return ['error' => 'Error in getUserGameStats: ' . $e->getMessage()];
    }
}

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
            // If additional segment, call getUserProfile($userId)
            $userId = $segments[1];
            getUserProfile($userId);
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

