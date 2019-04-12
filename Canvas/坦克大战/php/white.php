<?php
	//读取POST请求传入的关卡编号
	$dijiguan = $_POST["dijiguan"];
	//读取POST请求传入的地图数组
	$ditushuzu = $_POST["ditushuzu"];
	//打开一个文件
	$myfile = fopen("../maps/{$dijiguan}", "w");
	//写入
	fwrite($myfile, stripslashes($ditushuzu));
	//关闭文件
	fclose($myfile);
?>