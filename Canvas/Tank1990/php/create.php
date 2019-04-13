<?php
	//读取文件中已经有多少地图了
	$dir="../maps/";
	//检索文件夹API
	$file = scandir($dir);
	//结果中含有.和..，也算作的文件夹，所以我们弹出两项
	array_shift($file);
	array_shift($file);
	//看数量
	$number = sizeof($file) + 1;
  
	// 打开一个文件，文件不存在，自动创建文件
	$myfile = fopen("../maps/{$number}.m", "w");
	//写入空
	fwrite($myfile, "");
	//关闭文件
	fclose($myfile);
?>