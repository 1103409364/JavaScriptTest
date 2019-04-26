// 课程表格
$(function () {
    //页面加载完成之后执行
    pageInit2();
});
function pageInit2() {
    //创建jqGrid组件
    $("#list2").jqGrid(
        {
            url: "/admin/course",//组件创建完成之后请求数据的url
            editurl: "/admin/course",
            datatype: "json",//请求数据返回的类型。可选json,xml,txt
            colNames: ['_id', '课程编号', '课程名称', '上课时间', '可报人数', '可报名年级', '教师', '课程简介'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                { name: '_id', index: '_id', "hidden": true, key: true },
                // editrules表单验证，比如必填不能为空
                { name: 'cid', index: 'cid', "editable": true, edittype: "text", width: 15, align: "center", editrules: { edithidden: true, required: true, number: true, minValue: 0 } },
                { name: 'name', index: 'name', "editable": true, edittype: "text", width: 20, align: "center", editrules: { edithidden: true, required: true } },
                { name: 'time', index: 'time', "editable": true, edittype: "select", editoptions: { value: "周一:周一;周二:周二;周三:周三;周四:周四;周五:周五" }, width: 15, align: "center" },
                { name: 'number', index: 'number', "editable": true, edittype: "text", width: 15, align: "center", editrules: { edithidden: true, required: true, number: true, minValue: 0 } },

                { name: 'permitGrade', index: 'permitGrade', "editable": true, edittype: "text", width: 30, align: "center", editrules: { edithidden: true, required: true } },

                { name: 'teacher', "editable": true, edittype: "text", sortable: false, width: 15, align: "center", editrules: { edithidden: true, required: true } },
                { name: 'introduction', "editable": true, edittype: "textarea", sortable: false, width: 100, align: "left", editrules: { edithidden: true, required: true } },
            ],
            rowNum: 10,//一页显示多少条
            rowList: [10, 20, 30, 40, 50, 100],//可供用户选择一页显示多少条
            pager: '#pager2',//表格页脚的占位符(一般是div)的id
            sortname: 'cid',//初始化的时候排序的字段
            sortorder: "asc",//排序方式,可选desc,asc
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

            loadError: (xhr, status, error) => {
                alert("服务器错误");
            },

            loadComplete: (response, err) => {
                if (!response) {
                    alert("修改失败");
                }
            }
        });

    /*创建jqGrid的操作按钮容器*/
    /*可以控制界面上增删改查的按钮是否显示*/
    $("#list2").jqGrid("navGrid", "#pager2", { edit: true, add: true, del: true });
    // 添加下载按钮
    $("#list2").navButtonAdd('#pager2', {
        caption: "导出Excel",
        buttonicon: "ui-icon-excel",
        onClickButton: () => {
            $.post("/admin/course", {
                "_search": false,
                "oper": "download",
            }, (data) => {
                // 重定向到文件触发下载
                $(window).attr("location", data);
            })
        },
        position: "last",
    });

    $(window).resize(() => {
        $("#list2").setGridWidth($(".container-fluid").width() - 2);
    });
}

