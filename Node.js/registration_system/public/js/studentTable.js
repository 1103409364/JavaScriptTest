// 学生名单表格
$(function () {
    //页面加载完成之后执行
    pageInit();
});
function pageInit() {
    //创建jqGrid组件
    $("#list").jqGrid(
        {
            url: "/admin/student",//组件创建完成之后请求数据的url
            editurl: "/admin/student",
            datatype: "json",//请求数据返回的类型。可选json,xml,txt
            colNames: ["_id", '学号', '姓名', '性别', '年级', '密码', '是初始密码?'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....主键key默认是行号，可以指定一个主键
                // mongoDB自动生成唯一的_id,把它作为主键，并隐藏该列单元格，jqgrid会把key提交，就是请求头中的id
                { name: '_id', index: '_id', "hidden": true, key: true },
                // , editrules: {edithidden:true,required:true}表单验证
                { name: 'sid', index: 'sid', "editable": true, edittype: "text", width: 30, align: "center", editrules: { edithidden: true, required: true, number: true, minValue: 0 } },
                { name: 'name', index: 'name', "editable": true, edittype: "text", width: 30, align: "center", editrules: { edithidden: true, required: true } },
                { name: 'sex', index: 'sex', "editable": true, edittype: "select", editoptions: { value: "男:男;女:女" }, width: 30, align: "center", editrules: { edithidden: true, required: true } },
                { name: 'grade', index: 'grade', "editable": true, edittype: "select", editoptions: { value: "初一:初一;初二:初二;初三:初三;高一:高一;高二:高二;高三:高三" }, width: 30, align: "center" },
                { name: 'password.pwd', sortable: false, search: false, "editable": true, edittype: "text", width: 100, align: "center" },
                { name: 'password.isInitial', sortable: false, "editable": true, edittype: "text", width: 30, align: "center", edittype: "select", editoptions: { value: "是:是;否:否" } },
            ],
            rowNum: 20,//一页显示多少条
            rowList: [10, 20, 30, 40, 50, 100],//可供用户选择一页显示多少条
            pager: '#pager',//表格页脚的占位符(一般是div)的id
            sortname: 'sid',//初始化的时候排序的字段
            sortorder: "asc",//排序方式,可选desc,asc设置默认升序asc
            mtype: "post",//向后台请求数据的ajax的类型。可选post,get
            viewrecords: true,
            height: "100%",
            // 设置宽度为容器的宽度
            width: $(".container-fluid").width() - 2,
            // caption: "JSON Example",//表格的标题名字
            // 定义jsonReader来跟服务器端返回的数据做对应
            jsonReader: {
                root: "rows", //包含实际数据的数组
                page: "currpage", //当前页
                total: "totalpages", //总页数
                records: "totalrecords", //查询出的记录数
                cell: "cell"
            },
            multiselect: true,
            multiboxonly: true, //只有选择checkbox才会起作用
        });
    /*创建jqGrid的操作按钮容器*/
    /*可以控制界面上增删改查的按钮是否显示*/
    // 对于搜索的相关样式在语言包js文件中，可以根据自己的需要修改这些设置
    $("#list").jqGrid('navGrid', '#pager', { edit: true, add: true, del: true, search: true });
    // 添加下载导出按钮
    $("#list").navButtonAdd('#pager', {
        caption: "导出Excel",
        buttonicon: "ui-icon-excel",
        onClickButton: () => {
            $.post("/admin/student", {
                "_search": false,
                "oper": "download",
            }, (data) => {
                // 重定向到文件触发下载
                $(window).attr("location", data);
                // window.location = "/download/1.mp3";
            })
        },
        position: "last",
    });

    $(window).resize(() => {
        // 设置宽度为容器.container-fluid的宽度， .container-fluid 是bootstrap使用的，是响应式的
        $("#list").setGridWidth($(".container-fluid").width() - 2);
    });
}