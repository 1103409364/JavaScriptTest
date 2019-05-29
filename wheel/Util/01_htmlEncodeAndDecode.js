var htmlEncodeAndDecode = {
    /*1.用浏览器内部转换器实现html转码*/
    //  "<"   → "&lt;"
    htmlEncode: function (html) {
        //动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //将要转换的字符串设置为这个元素的innerText(ie)或者textContent
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        //返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    /*2.用浏览器内部转换器实现html解码*/
    //    "&lt;"  → "<"  
    htmlDecode: function (text) {
        //动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
        temp.innerHTML = text;
        //返回这个元素的innerText(ie)或者textContent，即得到经过HTML解码的字符串了。
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }
};