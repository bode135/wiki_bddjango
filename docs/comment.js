// var baseUrl = "http://www.bodexiong.vip:2204";
var base_host = "https://www.bodexiong.vip";
var base_route = "/mkdocs";
var baseUrl = base_host + base_route;
var wiki_id = "asd";

var host = window.location.host;
var href = window.location.href;

var pathname = window.location.pathname;

// console.log("~~~~~~~~~~~ ", pathname, ' --- clean_pathname: ', pathname.substring(0, base_route.length), " --- ", base_route);

function clean_pathname(pathname, prefix){
    if(pathname.substring(0, prefix.length) == prefix)
        pathname = pathname.substring(prefix.length); /* 获取文件路径（文件地址） */
    if (pathname[0] != "/"){
        pathname = "/" + pathname;
    }
}
pathname = clean_pathname(pathname, base_route);

var is_readthedocs = false;
if(host.indexOf("readthedocs") != -1){
	is_readthedocs = true;
	pathname = clean_pathname(pathname, "/zh/latest");
}

console.log("~~~~~~~~~~~ pathname: ", pathname);

// 尝试注入评论功能
console.log("****** 222 尝试注入评论功能, host: ", host, " --- pathname:", pathname, " --- baseUrl: ", baseUrl, " | wiki_id: ", wiki_id);


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
var suffix = '?host=' + host + '&pathname=' + pathname + '&wiki_id=' + wiki_id + "&page_size=2";
before.src = dest_href + suffix;

before.id = "iframe";
before.style.display = "none";
var parent = x1(("//div[@class='md-container']"));
parent.appendChild(before);

var behind = document.getElementsByTagName("footer")[0];

var add_bottom_bar = 1;
var comment_img_url = '<img src="' + baseUrl + '/api/static/ckeditor/ckeditor/plugins/smiley/images/55.png"/>';
var bottomBar__title = comment_img_url + '全部评论';
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
        var url = before.src + "&page_size=10";   //iframe的url
        // var url = "";
        // console.log('~~~ url', url);
        layer.open({
            id: "son",
            type: 2,
            title: bottomBar__title,
            shadeClose: true,
            scrollbar: false,
            shade: 0.8,
            area: ['90%', '75%'],
            content: url,
        });
    });
    // var topBar = document.createElement('<button type="button">Click Me!</button>');
    parent.appendChild(bottomBar);

    parent.insertBefore(bottomBar, behind);
    parent.insertBefore(before, behind);

    bottomBar.onload = function () {
        changeFrameHeight();
    };
}

function changeFrameHeight() {
    var ifm = document.getElementById("iframe");
    // ifm.margin = "auto";
    // ifm.width = "80%";

    var sUserAgent = navigator.userAgent;
    if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
        // ifm.style = "margin-left: 20%; margin-right: 20%;";
        // var style="margin: 0 auto; width: 60%;";
        ifm.style = "width: 90%;";
        ifm.height = "500px";
    } else {
        ifm.style = "margin: 0 auto; width: 60%;";
        ifm.height = "500px";
    }

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
    var url = baseUrl + "/api/comment/CommentNode/" + "?page_size=2&parent_code=0";
    url += "&wiki_id=" + wiki_id;
    url += "&pathname=" + pathname;

    console.log("*** Comment url:   ", url);

    axios
        .get(url)
        .then(function (response) {
            var result = response.data.result;
            // console.log("result ****** ", result);

            var elem = document.getElementById("bottomBar");
            var page_dc = result.page_dc;
            // elem.style = "font-size: 20px;"
            // elem.innerText = ">>>            共有[" + result.page_dc.count_items + "]条评论, 点击查看更多~";
            if (page_dc.count_items == 0) {
                // var ifm = document.getElementById("iframe");
                // ifm.style.display = "none";
                before.style.display = "none";
                var empty_img_url = '<img src="' + baseUrl + '/api/static/ckeditor/ckeditor/plugins/smiley/images/a_37.png"/>';
                bottomBar__title = empty_img_url + "怒抢沙发";
                elem.innerHTML = "<b style='border-bottom: 2px solid #666666;border-color: blue;margin-top: 10px; margin-bottom: 20px'>" + empty_img_url + "怎么一个评论都没有! 我要首评!!!" + "</b>";
            } else {
                before.style.display = "";
                elem.innerHTML = "<b style='border-bottom: 2px solid #666666;border-color: blue;margin-top: 10px; margin-bottom: 20px''>" + comment_img_url + "打开评论子窗口</b>";
                // elem.innerHTML = "<b style='border-bottom: 2px solid #666666;border-color: blue;margin-top: 10px; margin-bottom: 20px''>点击查看更多: 共有[" + page_dc.count_items.toString() + "]条回复, 当前第[" + page_dc.p.toString() + "/" + page_dc.total_pages.toString() + "]页.</b>";
            }
        });

};
