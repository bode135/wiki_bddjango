// 回头尝试注入评论功能
var domain = window.location.host;
var domain = window.location.host;
var is_readthedocs = false;
if(domain.indexOf("readthedocs") != -1){
	is_readthedocs = true;
}

console.log('~~~ js测试 ~~~ domain, is_readthedocs:', domain, is_readthedocs);

// $x('//div[@class="ethical-sidebar"]')[0].remove()
// var elem = document.getElementsByClassName('rst-footer-buttons');

// var elem = document.evaluate("//a[@href]", document, null, XPathResult.ANY_TYPE, null);
// console.log('~~~~~~~~~~', elem);
// var nodes = result.iterateNext(); //枚举第一个元素


// var nodes=document.evaluate("//footer", document).iterateNext();
//
// console.log('~~~~~~~~~~ nodes:', nodes);
// nodes
//
//
//
// nodes.textContent;

// 运行间隔
var RUNNING_INTERVAL = 0.1 * 1000;

// 最大运行时间
var MAX_RUNNING_TIME = 10 * 1000;

function x1(xpath) {
    // 用xpath定位一个元素
    var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    return result.iterateNext();
}


// 是否已经关闭了广告
var is_closed_advertises = false;

function close_ad()
{
    var ad_info = "左下角广告";
    // console.log("~~~ 开始关闭广告!");

    // 判断是否成功关闭一个以上的广告, 避免有时候加载大于渲染速度, 导致关闭失败.
    var close_flag = false;

    // 这里关闭[左下角广告]
    var elem2 = x1('//div[@class="ethical-sidebar"]');
    // var elem2 = x1('//h1');

    if (elem2)
    {
        elem2.remove();
        console.log("[" + ad_info + "]关闭成功.");
        close_flag = true;
    }

    is_closed_advertises = close_flag;
    return close_flag;
}

//var close_flag = close_ad();
//setTimeout(close_ad, 500);

var startTime = new Date().getTime();
function run_func_until_success(func, max_running_time=20 * 1000)
{
    if(new Date().getTime() - startTime > max_running_time || is_closed_advertises)
    {
        clearInterval(interval_handle);
        if (is_closed_advertises)
        {
            console.log("~~~ 成功结束脚本!");
        }
        else
        {
            console.log("*** 脚本已达到最大运行时间!");
        }
        // 最后再尝试关闭一次, 避免有时候加载太慢
        setTimeout(func, 500);
    }
    else
    {
        //func();

        // 保证脚本加载速度慢于dom的加载速度
        setTimeout(func, RUNNING_INTERVAL);
        console.log("--------- run_func_until_success ! is_closed_advertises:", is_closed_advertises);
    }
}
//var interval_handle = setInterval(close_ad, RUNNING_INTERVAL);
if (is_readthedocs)
{
    var interval_handle = setInterval(function(){run_func_until_success(close_ad, MAX_RUNNING_TIME)}, RUNNING_INTERVAL);
}

