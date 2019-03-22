<?php
	$id = $_GET["id"];
	//链接数据库
	$conn = mysql_connect("localhost","root","123456");
	//选择数据库
	mysql_select_db("data1",$conn);
	//设置字符集
    mysql_query("SET NAMES UTF8");
    
    // 删除数据库中的数据，实际工作中很少删除数据，可以添加一个标记表示删除
	$result = mysql_query("DELETE FROM messageboard WHERE id = {$id}");
	 
	if($result == 1){
		echo "ok";
	}else{
		echo "wrong";
	}
	mysql_close($conn);
?>