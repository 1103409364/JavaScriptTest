<?php
	$dir="../maps/";
	//检索文件夹API
	$file = scandir($dir);
	//结果中含有.和..，也算作的文件夹，所以我们弹出两项
	array_shift($file);
	array_shift($file);
 	
 	//输出结果，结果是json
	echo json_encode($file);
?>