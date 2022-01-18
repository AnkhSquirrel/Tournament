<?php

/*
	Get sent the name of a set of characters (e.g. SuperSmashBrosMelee.txt)

	Finds the set
	
	Sends back the array with all the characters
*/

if (isset($_POST['setName'])) {

	$dir = '..\\src\\characters\\';

	$res = file($dir.$_POST['setName'], FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

} else {

	$res = array(

		'status' => false
		
	);

}

echo json_encode($res);

?>