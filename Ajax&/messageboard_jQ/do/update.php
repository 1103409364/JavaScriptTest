<?php
	// 服务器读取的  编码设置
	header('Content-type:text/html;charset=utf-8');
	// header("Content-type: application/json");

	$id = $_GET["id"];
	$newmsg = $_GET["newmsg"];
	
	$conn = mysql_connect("localhost","root","123456");
	//选择一个数据库
	mysql_select_db("data1",$conn);

	//设置一下字符集 mysql_query就是执行SQL的意思
	mysql_query("SET NAMES UTF8");

	//执行一条SQL语句，SQL语句操作数据库的语句。SQL是独立的语言，PHP、JavaEE、.net、pethon都在用SQL语句
	$result = mysql_query("UPDATE messageboard SET message = '{$newmsg}' WHERE id = {$id}");
 
	if($result == 1){
		echo "ok";
	}else{
		echo "wrong";
	}
	//关闭数据库
	mysql_close($conn);
?>