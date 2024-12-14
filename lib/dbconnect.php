
<?php

require_once "db_upass.php";

// no need fro you to see our hosr or db hehehe
$host=$DB_HOST;
$db = $DB;

$user=$DB_USER;
$pass=$DB_PASS;


if(gethostname()== $UNI_HOSTNAME ) {
	$mysqli = new mysqli($host, $user, $pass, $db,null,$UNI_SOCKET);
} else {
		$pass=null;
        $mysqli = new mysqli($host, $user, $pass, $db);
}

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . 
    $mysqli->connect_errno . ") " . $mysqli->connect_error;
}?>

