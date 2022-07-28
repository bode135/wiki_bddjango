var domain = window.location.host;
var is_readthedocs = false;
if(domain.indexOf("readthedocs") != -1){
	is_readthedocs = true;
}
// 尝试注入评论功能
console.log('~~~ 尝试注入评论功能 ~~~ domain', domain, is_readthedocs);

