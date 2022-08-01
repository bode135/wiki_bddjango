var baseUrl = "http://www.bodexiong.vip:2204";
// var baseUrl = "https://www.bodexiong.vip/mkdocs";
var wiki_id = 123;

var host = window.location.host;
var href = window.location.href;
var pathname = window.location.pathname; /* 获取文件路径（文件地址） */

// 尝试注入评论功能
console.log("****** 尝试注入评论功能, host: ", host, " --- pathname:", pathname, " --- baseUrl: ", baseUrl, " | wiki_id: ", wiki_id);


var is_readthedocs = false;
if (host.indexOf("readthedocs") != -1) {
    is_readthedocs = true;
}

// 引入layui.js
var h = document.getElementsByTagName("head")[0];
var s = document.createElement("script");
s.type = "text/javascript";
// <script src="layui/layui.js"></script>
s.src = 'https://www.layuicdn.com/layui-v2.5.6/layui.all.js';
h.appendChild(s);


// 引入axios.js
var s2 = document.createElement("script");
s2.type = "text/javascript";
s2.src = 'https://cdn.staticfile.org/axios/0.18.0/axios.min.js';
h.appendChild(s2);


function test1(text) {
    if (text == null)
        text = "Hello World";
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer
            , form = layui.form;

        layer.msg(text);
    });
}

s.onload = function () {
    // test1();
};


function x1(xpath) {
    // 用xpath定位一个元素
    var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);

    return result.iterateNext()
}


// var iframe = document.createElement('<iframe src="https://www.jb51.net"></iframe>');
var before = document.createElement("iframe");
// s.type="text/javascript";
// var dest_href = 'http://localhost:8080/#/' + '?host=' + host + '&pathname=' + pathname + '&id=' + id;
// var dest_href = 'http://localhost:8080/#/';
// var dest_href = "http://www.bodexiong.vip:2204/api/comment/add_emp/";
var dest_href = baseUrl + "/api/comment/CommentList/";
var suffix = '?host=' + host + '&pathname=' + pathname + '&wiki_id=' + wiki_id;
before.src = dest_href + suffix;

before.id = "iframe";

var parent = x1(("//div[@class='md-container']"));
parent.appendChild(before);

var behind = document.getElementsByTagName("footer")[0];
parent.insertBefore(before, behind);

var add_bottom_bar = 1;
if (add_bottom_bar) {
    var bottomBar = document.createElement("h3");
// <button type="button">Click Me!</button>
// topBar.type = "button";
    bottomBar.id = "bottomBar";
    bottomBar.innerText = ">>>            共有___条评论, 点击查看更多~";

// topBar.style = "cursor:pointer; color: #02c0ce; border: 1px solid #ccc!important; border-radius: 16px!important; -webkit-user-select: none;";
    bottomBar.style = "text-align:center;white-space:pre;cursor:pointer; color: #8290e3; border: 1px solid #ccc!important; border-radius: 16px!important; -webkit-user-select: none; background-color: rgb(35 57 66); text-color: blue; padding-top: 5px; padding-bottom: 5px;font-size: 20px;";
    bottomBar.addEventListener("click", function () {
        // document.getElementById("demo").innerHTML = "Hello World";
        var text = "Hello World123";
        var url = before.src;   //iframe的url
        // var url = "";
        // console.log('~~~ url', url);
        layer.open({
            id: "son",
            type: 2,
            title: '全部评论',
            shadeClose: true,
            scrollbar: false,
            shade: 0.5,
            area: ['90%', '75%'],
            content: url,
        });
    });
    // var topBar = document.createElement('<button type="button">Click Me!</button>');
    parent.appendChild(bottomBar);

    parent.insertBefore(bottomBar, before);

    bottomBar.onload = function () {
        changeFrameHeight();
    };
}

function changeFrameHeight() {
    var ifm = document.getElementById("iframe");
    ifm.height = "450px";
    // ifm.margin = "auto";
    // ifm.width = "80%";
    ifm.style = "margin-left: 20%; margin-right: 20%;";
    // ifm.height=0;
    // console.log("ifm.contentWindow.document.body.scrollHeight: ", ifm.contentWindow.document.body.scrollHeight);
    // ifm.height=ifm.contentWindow.document.body.scrollHeight + 50;
}

// window.οnresize=function(){
// 	 changeFrameHeight();
// };

// 动态引入js 后，调用js里面的abc()函数
before.onload = function () {
    changeFrameHeight();
    var url = baseUrl + "/api/comment/Comment/" + "?page_size=1";
    // console.log("Comment url:   ", url);

    axios
        .get(url)
        .then(function (response) {
            var result = response.data.result;
            // console.log("result ****** ", result);

            var elem = document.getElementById("bottomBar");
            var page_dc = result.page_dc;
            elem.innerHTML = "<b style='border-bottom: 2px solid #666666;border-color: blue;'>点击查看更多: 共有[" + page_dc.count_items.toString() + "]条回复, 当前第[" + page_dc.p.toString() + "/" + page_dc.total_pages.toString() + "]页.</b>";
            // elem.style = "font-size: 20px;"
            // elem.innerText = ">>>            共有[" + result.page_dc.count_items + "]条评论, 点击查看更多~";
        });

};
