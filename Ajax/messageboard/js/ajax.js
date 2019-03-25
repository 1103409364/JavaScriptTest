(function () {
    var myAjax = window.myAjax = {};

    myAjax.get = function (url, json, callback) {
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("没有找到请求的文件"), undefined);
                }
            }
        }

        xhr.open("get", url + "?" + myAjax._jsonToString(json), true);
        xhr.send(null);
    }

    myAjax.post = function (url, json, callback) {
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback(xhr.status, undefined);
                }
            }
        }

        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(myAjax._jsonToString(json));
    }

    myAjax._jsonToString = function(json) {
        var arr = [];
        for (var k in json) {
            arr.push(k + "=" +  encodeURIComponent(json[k]));
        }

        return arr.join("&");
    };
})()