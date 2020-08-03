<?php

$database = require '..\bootstrap.php';
session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

// getting post data //
$username = $data['username'];
$password = $data['password'];

$returnJson = array();

$results = $database->authenticateUser($username,$password);

if($results){ //if returns true

	if($results[0]['user_type'] == 7){

		$_SESSION['vsa_username'] = $username;
		$_SESSION['vsa_uid'] = $results[0]['uid'];
		$_SESSION['vsa_region'] = $results[0]['region'];
		$_SESSION['vsa_type'] = $results[0]['user_type'];
		$_SESSION['vsa_name'] = trim($results[0]['last_name'].", ".$results[0]['first_name']." ".$results[0]['mid_name']." ");

		$returnJson['success'] = true;

	} else {
		$returnJson['success'] = false;
		$returnJson['message'] = "You're not allowed to access this system.";
	}

}
else{

	$returnJson['success'] = false;
	$returnJson['message'] = "Please check your username or password.";

}

print_r(json_encode($returnJson));



?>