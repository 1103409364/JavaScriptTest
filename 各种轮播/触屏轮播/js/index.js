var searchipt = document.getElementById("searchipt");
var searchmask = document.getElementById("searchmask");
var searchCancle = document.getElementById("searchCancle");
var banner = document.getElementById("banner");
var imglist = banner.getElementsByTagName("li");
var imgul = banner.getElementsByTagName("ul")[0];
// 图片真实长度
var reallength = imglist.length;
var firstimg = imglist[0].innerHTML;
var lastimg = imglist[imglist.length - 1].innerHTML;
// 头尾放一个假img
var lifirst = document.createElement("li");
lifirst.innerHTML = lastimg;
var lilast = document.createElement("li");
lilast.innerHTML = firstimg;

imgul.appendChild(lilast);
imgul.insertAdjacentElement("afterbegin", lifirst);
// 设置宽度为，图片数量的倍数
imgul.style.width = 100 * imglist.length + "%";
searchipt.onclick = function () {
    searchmask.style.display = "block";
}
searchCancle.onclick = function () {
    searchmask.style.display = "none";
}

resizeHeight(banner);
window.onresize = function () {
    resizeHeight(banner);
}

function resizeHeight(ele) {
    var banWidth = parseInt(getComputedStyle(ele)["width"]);
    ele.style.height = banWidth * 422 / 755 + "px";
}

var index = 1;
function right() {
    index++;

    $(imgul).animate({"left": -100 * index + "%"}, 500, function() {
        if (index > reallength) {
            $(this).css({"left": "-100%"});
            index = 1;
        }
    });
}

function left() {
    index--;
    $(imgul).animate({"left": -100 * index + "%"}, 500, function() {
        if (index < 1) {
            index = reallength;
            $(this).css({"left": -reallength * 100 +"%"});
        }
    });
}

setInterval(right, 1500);