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

$barangayCode = $data['generalInfo']['barangay']['value'];

$results = $database->saveComplaintDetails($data['generalInfo'],$data['listOfSearchedNames'], $userId, $barangayCode, $data['householdDetail'], $data['rosterDetail']);

if($results['status'] == "SUCCESS"){
	$returnValue["status"] = "SUCCESS";
	$returnValue["message"] = $results["message"];
} 
else {
	$returnValue["status"] = "ERROR";
	$returnValue["message"] = $results;
}

print_r(json_encode($returnValue));

?>