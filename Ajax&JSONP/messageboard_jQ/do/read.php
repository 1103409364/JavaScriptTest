<?php
	header('Content-type:text/html;charset=utf-8');
	if (isset($_GET["sort"])) {
			$sort = $_GET["sort"];
		} else {
			$sort = 1;
	}
	
	// 连接到数据库
	$conn = mysql_connect("localhost", "qwertyzx_admin", "admin");
	// 选择一个数据库
	mysql_select_db("qwertyzx_1", $conn);
	
	//设置字符集,不设中文可能乱码
	mysql_query("SET NAMES UTF8");
	//根据前端传过来的sort参数，来调整正序、倒叙，表名messageboard
	if ($sort == 1) {
		$sql = "SELECT * FROM messageboard";
	} else if ($sort == 0){
		$sql = "SELECT * FROM messageboard ORDER BY id DESC";
	}
	$result = mysql_query($sql);

	//别名数组，存放结果
	$arr = array("result" => array());
	while($row = mysql_fetch_array($result)){
		array_push($arr["result"], json_encode($row));
	}

	$json = json_encode($arr);
	print_r($json);
	 //关闭数据库
	mysql_close($conn);
?>