<?php

$database = require '..\bootstrap.php';
$databaseOnline = require '..\bootstrapOnline.php';

session_start();

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

		$results = $database->fetchGrievanceToSync($data["grievanceId"], $data["grievanceType"]);

		$results = $databaseOnline->syncGrievances($results);

		if($results == "SUCCESS"){
			$results = $database->updateGrievanceAsSynced($data["grievanceId"]);
		}

		//should return 1
		$returnValue["message"] = $results;
		$returnValue["status"] = "SUCCESS";

	} 
	catch(PDOException $e){

		$returnValue['message'] = $e;

	}

//print_r($returnValue);
print_r(json_encode($returnValue));


?>