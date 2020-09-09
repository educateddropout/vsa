<?php

$database = require '..\bootstrap.php';

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/download; charset=utf-8');

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$userId = $_SESSION['vsa_uid'];

$returnValue = array();
$returnValue["status"] = "ERROR";

$grievanceList = $data['grievanceList'];

$results = $database->updateGrievanceList($grievanceList, $userId);

if($results == "SUCCESS") $returnValue["status"] = $results;
else {
	$returnValue["status"] = "ERROR";
	$returnValue["message"] = $results;
}

print_r(json_encode($returnValue));

?>