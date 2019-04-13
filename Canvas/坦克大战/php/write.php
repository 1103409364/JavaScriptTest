<?php
	//读取POST请求传入的关卡编号
	$dijiguan = $_POST["level"];
	//读取POST请求传入的地图数组
	$mapArr = $_POST["mapArr"];
	//打开一个文件
	$myfile = fopen("../maps/{$level}", "w");
	//写入
	fwrite($myfile, stripslashes($mapArr));
	//关闭文件
	fclose($myfile);
?>