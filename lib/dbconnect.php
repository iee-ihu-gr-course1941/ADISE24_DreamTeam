<?php
// Include the db_upass.php file to use the connection variables
require_once "db_upass.php";


/**
 * Establishes a MySQL database connection using PDO.
 *
 * @return PDO
 */
function getDatabaseConnection() {
    // Use the variables defined in db_upass.php
    global $DB_HOST, $DB, $DB_USER, $DB_PASS, $UNI_HOSTNAME, $UNI_SOCKET;

    // Define the custom port
    $port = 3333;

    // Check if we are on the university server
    if (gethostname() == $UNI_HOSTNAME) {
        // Use the socket path for the university server connection
        $dsn = "mysql:unix_socket=$UNI_SOCKET;dbname=$DB;charset=utf8mb4";
//        print "Connected to the remote server successfully.<br>"; 
    } else {
        // Standard connection string for local connection with custom port
        $dsn = "mysql:host=$DB_HOST;port=$port;dbname=$DB;charset=utf8mb4";
//        print "Connected to the local server successfully.<br>"; 
    }

    try {
        // Create a new PDO instance and set error mode to exceptions
        $pdo = new PDO($dsn, $DB_USER, $DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//        echo "Connected to the database successfully.<br>"; // Confirmation message
        return $pdo; // Return the PDO instance
    } catch (PDOException $e) {
        // Handle connection failure and show an error message
        die(json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]));
    }
}

// Call the function to establish the connection
getDatabaseConnection();
?>

