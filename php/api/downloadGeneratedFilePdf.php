<?php

	$path = $_GET['path'];
	$name = $_GET['name'];
	$fileName = $name.".pdf";
	
	//echo $path;
	header('Content-type: Application/octet-stream');
	header('Content-Disposition: attachment; filename='.$fileName);
	header('Content-Description: My Download :)');
	header('Content-Length: '. filesize($path) );
	readfile($path);

	//unlink($path);
	
?>