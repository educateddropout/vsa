<?php

$database = require '..\bootstrap.php';



// setting return value
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/download; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$returnValue = array();
$returnValue["status"] = "ERROR";

try {

	$code = $data['barangayCode'];
	
	$results = $database->fetchEx01($code);
	$returnValue["message"] = $results;
	$returnValue["status"] = "SUCCESS";
	
} 
catch(PDOException $e){

	$returnValue['message'] = $e;

}

//print_r($returnValue);
print_r(json_encode($returnValue));


?>