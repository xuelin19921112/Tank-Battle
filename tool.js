
function $(str){
	if(str.charAt(0) == "#"){
		var newStr = str.replace("#", "");
		return document.getElementById(newStr);
	}else if(str[0] == "."){
		var newStr = str.replace(".", "");
		return document.getElementsByClassName(newStr);
	}else if(str.substring(0, 4) == "name"){
		var newStr = str.split("=")[1];
		return document.getElementsByName(newStr);
	}
	else{
		return document.getElementsByTagName(str);
	}
}
//获取外联样式的属性值
function getStyle(element, attr){
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element, false)[attr];
}

//生成一个随机颜色
function randomColor(){
	var color = "rgba(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + " ,1)";
	return color;
}

//判断一个字符串是否由字母、数字、下划线组成
function isTrueSre(str){
	var i = 0;
	for(; i < str.length; i++){
		if(str[i] >= "a" && str[i] <= "z" || str[i] >= "0" && str[i] <= "9" || str[i] >= "A" && str[i] <= "Z" || str[i] == "_"){
			
		}else{
			break;
		}
	}
	if(i == str.length){
		return true;
	}else{
		return false;
	}
}

//只获取一个属性节点的非空白节点
function removeSpaceNode(nodes){
	var newNode = [];
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
			continue;
		}
		newNode.push(nodes[i]);
	}
	return newNode;
}

//删除一个属性节点的空白节点
function removeSpaceNode1(nodes){
	for(var i = 0; i < nodes.childNodes.length; i++){
		if(nodes.childNodes[i].nodeType == 3 && /^\s+$/.test(nodes.childNodes[i].nodeValue)){
			nodes.removeChild(nodes.childNodes[i]);
		}
	}
	return nodes;
}

//创建带有文本的节点（可以不加文本）
function createNodeWithText(type, text){
	var nodes = document.createElement(type);
	if(text){
		var textNode = document.createTextNode(text);
		nodes.appendChild(textNode);
	}
	return nodes;
}

//在元素后边插入节点
function insertAfter(newElement, oldElement){
	//1.找到oldElement父节点
	var parent = oldElement.parentNode;
	if(parent.lastChild === oldElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement, oldElement.nextSibling);
	}
}

//浏览器兼容性写法  后去事件对象，阻止冒泡
function e(even){
	var e = even || window.event;
	if(e.cancelBubble){
		e.cancelBubble = true;
	}else{
		e.stopPropagation();
	}
	return e;
}

//阻止超链接的默认行为
function testA(){
	if(window.confirm("你确定要跳转吗？")){
		return true;
	}else{
		return false;
	}
}

//Cookie存储  创建Cookie函数
function setCookie(name, value, expires, path, domain, secure){
	var cookieText =encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if(expires){
		cookieText += ";expires=" + expires;
	}
	if(path){
		cookieText += ";path=" + path;
	}
	if(domain){
		cookieText += ";domain=" + domain;
	}
	if(secure){
		cookieText += ";secure";
	}
	document.cookie = cookieText;
}

//Cookie存储  获取Cookie函数
function getCookie(name){
	var cookieText = decodeURIComponent(document.cookie);
	var start = cookieText.indexOf(name + "=");
	if(start == -1){
		return;
	}else{
		var end = cookieText.indexOf(";", start);
		if(end == -1){
			end = cookieText.length;
		}
	}
	var value = cookieText.substring(start, end);
	var arr = value.split("=");
	return arr[1];
}

//Cookie存储  移除Cookie函数
function removeCookie(name){
	document.cookie = encodeURIComponent(name) + "= ;expires=" + new Date(0);
}

//获取Ajax对象
function creatAjax(){
	if (window.XMLHttpRequest) {
		return new window.XMLHttpRequest;
	}else {
		return new ActiveXObject(Microsoft.XMLHTTP);
	}
}

//获取Ajax返回数据
function getAjax(url, fn){
	var http_obj = creatAjax();
	http_obj.onreadystatechange = function(){
		if (http_obj.readyState === 4 && http_obj.status === 200) {
			var result = eval("("+ http_obj.response +")");
			fn(result);
		}
	}
	http_obj.open("GET", url, true);
	http_obj.send(null);
}

//用POST请求 获取数据
function postAjax(url, date, fn){
	var http_obj = creatAjax();
	http_obj.onreadystatechange = function(){
		if (http_obj.readyState === 4 && http_obj.status === 200) {
			var result = eval("("+ http_obj.response +")");
			fn(result);
		}
	}
	http_obj.open("POST", url, true);
	http_obj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	http_obj.send(date);
}

//在n天以后
function getDate(n){
	var dateTime = new Date();
	var day = dateTime.getDate();
	dateTime.setDate(day + n);
	return dateTime;
}

//获取浏览器可视区属性
function getClientHeight(){
	if (window.innerHeight) {
		return window.innerHeight;
	}else {
		if (document.compatMode == "CSS1Compat") {//标准模式IE6以上版本
			return document.documentElement.clientHeight;
		}else {
			return document.body.clientHeight;
		}
	}
}

//任意拖拽，可以拖动任意节点
function moveDiv(moveTitle, moveBox){
	var offsetX = 0;
	var offsetY = 0;
	var isTrue = true;
	if(!moveBox){
		moveBox = moveTitle;
	}
	moveTitle.onmousedown = function(even){
		isTrue = true;
		var e = even || window.event;
		offsetX = e.clientX - parseInt(getStyle(moveBox, "left"));
		offsetY = e.clientY - parseInt(getStyle(moveBox, "top"));
		document.onmousemove = function(even){
			if(isTrue){
				var e = even || window.event;
				moveBox.style.left = e.clientX - offsetX + "px";
				moveBox.style.top = e.clientY - offsetY + "px";
			}
		}
	}
	moveTitle.onmouseup = function(){
		isTrue = false;
    }
}

//万能运动封装
function animiAll(element, json, fn){
	clearInterval(element.timer);
	var isTrue = true;
	element.timer = setInterval(function(){
		var count = 0;
		var num = 0;
		for(var i in json){
			var offType = (i == "opacity") ? Math.round(getStyle(element, i) * 100) : parseInt(getStyle(element, i));
			var speed = (json[i] - offType) / 10;
			var speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (i  == "opacity") {
				element.style.opacity = (offType + speed) / 100;
				element.style.filter = "alpha(opacity:" + (offType + speed) +")";
			}else {
				element.style[i] = offType + speed + "px";
			}
			if (json[i] == offType) {
				count++;
			}
			num++;
		}
		if (count == num) {
			clearInterval(element.timer);
			if (fn) fn();
		}
	}, 30);
}