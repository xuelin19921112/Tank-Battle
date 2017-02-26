function MyPlan(container, x, y){
	this.img = "images/my.gif"; //我方飞机
	this.bulImg = "images/bullet1.png";
	this.x = x || 126; // 我方飞机的初始x方向
	this.y = y || 480; // 我方飞机的初始y方向
	this.bulspeed = 300; // 子弹创建的速度
	this.bulMoveSpeed = 30; // 子弹的移动速度
	this.container = container; // 创建的主对象
	this.bulList = []; //存储页面中出现的子弹
}
MyPlan.prototype = {
	constructor: MyPlan,
	init: function(){
		this.create(); // 创建我方飞机
		this.mousemove(); // 移动我方飞机
		this.createBul(); // 创建子弹
		var that = this;
		setInterval(function(){
			that.createBul();
			//console.log(bulList);
		}, this.bulspeed);
	},
	create: function(){
		this.plan = document.createElement("img");
		this.plan.src = this.img;
		this.plan.style.cssText = "position:absolute; z-index:20; left:"+ this.x +"px; top:"+ this.y +"px; cursor:pointer";
		this.container.appendChild(this.plan);
	},
	mousemove: function(){
		var that = this;
		this.container.onmousemove = function(even){
			var e = even || window.event;
			var x = e.clientX - this.offsetLeft - that.plan.offsetWidth / 2;
			var y = e.clientY - this.offsetTop - that.plan.offsetHeight / 2;
			var maxWidth = this.offsetWidth - that.plan.offsetWidth;
			var maxHeiht = this.offsetHeight - that.plan.offsetHeight;
			that.plan.style.left = Math.max(Math.min(x, maxWidth), 0) + "px";
			that.plan.style.top = Math.max(Math.min(y, maxHeiht), 0) + "px";
		}
	},
	createBul: function(speed){
		var that = this;
		this.bullet = document.createElement("img");
		this.bullet.src = this.bulImg;
		this.bullet.style.cssText = "position:absolute; top:"+ (this.plan.offsetTop - 8) +"px; left:"+ (this.plan.offsetLeft + this.plan.offsetWidth / 2 - this.bullet.offsetWidth / 2 - 2) +"px";
		this.container.appendChild(this.bullet);
		this.bulList.push(this.bullet);
		var bullet = this.bullet;
		this.bullet.timer = setInterval(function(){
			bullet.style.top = bullet.offsetTop - 3 + "px";
			if (bullet.offsetTop <= -bullet.offsetHeight) {
				clearInterval(bullet.timer);
				if (that.container) {
					that.container.removeChild(bullet);
				}
				that.removeBullet(bullet);
			}
		}, this.bulMoveSpeed);
	},
	removeBullet: function(element){
		for (var i = 0; i < this.bulList.length; i++) {
			if (this.bulList[i] == element) {
				this.bulList.splice(i, 1);
			}
		}
	}
}
