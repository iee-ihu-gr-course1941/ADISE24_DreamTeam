<?php


function getPathSegments() {
	$path = isset($_GET['path']) ? $_GET['path'] : '';
	$segments = explode('/', trim($path, '/'));
	return $segments;
}

function send_response($data, $status_code = 200) {
    header("HTTP/1.1 $status_code");
    echo json_encode($data);
}

function handle_error($message, $code = 400) {
    header("HTTP/1.1 $code");
    echo json_encode(["error" => $message]);
    exit();
}


?>