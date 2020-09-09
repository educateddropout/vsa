<?php

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

$returnJson = array();

if(isset($_SESSION['vsa_name'])){
	$returnJson['name'] = $_SESSION['vsa_name'];
	$returnJson['region'] = $_SESSION['vsa_region'];
	$returnJson['regionName'] = $_SESSION['vsa_region_name'];
	$returnJson['userType'] = $_SESSION['vsa_type'];
	$returnJson['id'] = $_SESSION['vsa_uid'];
	$returnJson['username'] = $_SESSION['vsa_username'];
	$returnJson['allowedAccess'] = 1; // true
}
else{
	$returnJson['allowedAccess'] = 0; //false
}

print_r(json_encode($returnJson));


?>