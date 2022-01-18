<?php

/*
	-

	Finds all sets of characters

	Sends back the array with the name of all the sets
*/

$dir = '..\\src\\characters\\';

$res = array_values(array_diff(scandir($dir), array('.', '..')));

echo json_encode($res);

?>