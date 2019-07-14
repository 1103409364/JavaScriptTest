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

	// 连接到数据库
	$conn = mysql_connect("localhost", "root", "123456");
	// 选择一个数据库
	mysql_select_db("data1", $conn);

	// SQL语句操作数据库的语句语句是独立的语言，PHP、JavaEE、.net、pethon都在用SQL语句
	// 找到表，SELECT * FROM从哪个表查，where 查询条件
	$result = mysql_query("SELECT * FROM user_info WHERE username = '{$username}' AND password = '{$password}'");
	// 获得结果的数量
	$number = mysql_num_rows($result);
	if ($number == 1) {
		echo " 你已经成功登录 ";
		echo $username."-".$password;

	} else {
		echo "密码错误",$result;
	}
	//mysql_fetch_array这个函数就能把$result混沌状态的结果一条一条转为数组
	// while ($row = mysql_fetch_array($result)) {
	//     print_r($row);
	// }
	 //关闭数据库
	mysql_close($conn);
?>
</body>
</html>
