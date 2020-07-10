<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

	unset($_SESSION['vsa_name']);
	unset($_SESSION['vsa_region']);
	unset($_SESSION['vsa_type']);
	unset($_SESSION['vsa_uid']);
	unset($_SESSION['vsa_username']);

?>