<?php

$database = require '..\bootstrap.php';

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/download; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');

$returnValue = array();
$returnValue["status"] = "ERROR";
$userId = $_SESSION['vsa_uid'];

try {

	$results = $database->fetchUnsync($userId);
	$returnValue["status"] = "SUCCESS";
	$returnValue["message"]["unSync"] = $results;

} 
catch(PDOException $e){

	$returnValue['message'] = $e;

}

//print_r($returnValue);
print_r(json_encode($returnValue));


?>