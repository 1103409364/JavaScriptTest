<?php
	//读取POST请求传入的关卡编号
	$nowEdit = $_POST["nowEdit"];
	//读取POST请求传入的地图数组
	$mapArr = $_POST["mapArr"];
	//打开一个文件
	$myfile = fopen("../maps/{$nowEdit}", "w");
	//写入
	fwrite($myfile, stripslashes($mapArr));
	//关闭文件
	fclose($myfile);
?>