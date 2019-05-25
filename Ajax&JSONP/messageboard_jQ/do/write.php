<?php
	header('Content-type:text/html;charset=utf-8');
	// 从前台的请求中获取：插入的字段，
	$email = $_GET["email"];
	$message = $_GET["message"];
	$date = $_GET["date"];

	// 连接到数据库 第一个参数是指要连接的数据库的服务器地址，第二个参数是指要连接的数据库登录用户名，第三个参数是指要连接的数据库登录密码。
	$conn = mysql_connect("localhost", "qwertyzx_admin", "admin");
	// 选择一个数据库
	mysql_select_db("qwertyzx_1", $conn);
	//设置字符集,不设中文可能乱码
	mysql_query("SET NAMES UTF8");

	// 找到表messageboard，插入数据，数据类似要和数据库设置的一样,插入成功返回1
	$result = mysql_query("INSERT INTO messageboard(email,message,date) VALUES ('{$email}','{$message}','{$date}')");

	if($result == 1) {
		echo "数据成功保存到数据库";
	}
	//关闭数据库
	mysql_close($conn);
?>