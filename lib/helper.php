<?php


function getPathSegments() {
	$path = isset($_GET['path']) ? $_GET['path'] : '';
	$segments = explode('/', trim($path, '/'));
	return $segments;
}

?>
