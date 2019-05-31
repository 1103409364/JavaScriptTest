(function () {
    // 暴露majax
    var majax = window.majax = {};
    
    // get方法
    majax.get = function (URL, queryJSON, callback) {
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            // 兼容旧版ie
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("请求失败" + "status:" + xhr.status), undefined);
                }
            }
        }

        var querystring = majax.queryJSONTostring(queryJSON);
        URL = querystring ? (URL + "?" + querystring) : URL;

        xhr.open("get", URL, true);

        xhr.send(null);
    };

    // post方法
    majax.post = function (URL, queryJSON, callback) {
        if (window.XMLHttpRequest) {
            var xhr = new window.XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("请求失败" + "status:" + xhr.status), undefined);
                }
            }
        }

        var querystring = majax.queryJSONTostring(queryJSON);

        xhr.open("post", URL, true);
        // 设置请求头
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(querystring);
    };

    // jsonp 方法
    majax.jsonp = function (URL, queryJSON, callbackname, callback) {
        // 将callback添加到全局
        window[callbackname] = callback;
        // 创建script节点
        var scriptElement = document.createElement("script");
        document.body.appendChild(scriptElement);
        var querystring = majax.queryJSONTostring(queryJSON);
        // 给 script 节点添加 src 属性，发出请求
        scriptElement.src = querystring ? (URL + "?" + querystring) : URL;
        //删除临时节点
        document.body.removeChild(scriptElement);
    }

    // 辅助方法，将queryJSON转为查询字符串
    majax.queryJSONTostring = function (json) {
        var arr = []; //结果数组
        for (var k in json) {
            arr.push(k + "=" + encodeURIComponent(json[k]));
        }
        return arr.join("&");
    };
})();
