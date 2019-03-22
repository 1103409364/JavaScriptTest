<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
<?php
	// 用户名密码用post
	$username = $_POST["username"];
	// $password = $_POST["password"];
	// md5加密密码
	$password = md5($_POST["password"]);

	echo $username."-".$password;

	// 连接到数据库
	$conn = mysql_connect("localhost", "root", "123456");
	// 选择一个数据库
	mysql_select_db("data1", $conn);
	// 检查用户名是否重复
	$result = mysql_query("SELECT * FROM user_info WHERE username = '{$username}'");
	// 获得结果的数量
	$number = mysql_num_rows($result);
	if ($number == 1) {
		echo " 用户名重复，请重新输入 ";
		return;
	}
	// SQL语句操作数据库的语句语句是独立的语言，PHP、JavaEE、.net、pethon都在用SQL语句
	// 找到表，插入数据，数据类似要和数据库设置的一样，这里用户名密码都是字符串
	$result = mysql_query("INSERT INTO user_info(username,password) VALUES ('{$username}','{$password }')");

	if($result == 1) {
		echo "数据成功插入，注册成功";
	}

	//关闭数据库
	mysql_close($conn);
?>
</body>
</html>

