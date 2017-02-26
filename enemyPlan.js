function Enemy(container){
	this.img = "enemy1_fly_1.png";
	this.bool = "enemy1_fly_3.gif";
	this.width = 34;
	this.height = 24;
	this.creatEnemySpeed = 2000;
	this.EnemyMoveSpeed = 3;
	this.container = container;
	this.bulList = [];
	this.removeBullet = null;
	this.count = 0;
	this.num = 1;
	this.attack = 1;
	this.attackNum = 0;
}
Enemy.prototype = {
	constructor: Enemy,
	init: function(){
		var that = this;
		setInterval(function(){
			if (that.count % that.num == 0) {
				that.createEnemy();
			}
			that.count++;
		}, this.creatEnemySpeed);
	},
	createEnemy: function(){
		this.Enemy = document.createElement("img");
		this.Enemy.src = "images/"+ this.img +"";
		this.Enemy.style.cssText = "position:absolute; top:"+ -this.height +"px; left:"+ (parseInt(Math.random() * (this.container.offsetWidth - this.width))) +"px";
		this.container.appendChild(this.Enemy);
		var Enemy = this.Enemy;
		var container = this.container;
		var that = this;
		this.Enemy.isTrue = true;
		this.Enemy.timer = setInterval(function(){
			Enemy.style.top = Enemy.offsetTop + that.EnemyMoveSpeed + "px";
			for (var i = 0; i < that.bulList.length; i++) {
				var bulCur = that.bulList[i];
				if (Enemy.isTrue && bulCur.offsetLeft + bulCur.offsetWidth > Enemy.offsetLeft 
				&& bulCur.offsetLeft < Enemy.offsetLeft + Enemy.offsetWidth 
				&& Enemy.offsetTop < bulCur.offsetTop + bulCur.offsetHeight 
				&& Enemy.offsetTop + Enemy.offsetHeight > bulCur.offsetTop) {
					that.container.removeChild(bulCur);
					that.plan.removeBullet(bulCur);
					if (that.attackNum == that.attack) {
						Enemy.isTrue = false;
						that.attackNum = 0;
						Enemy.src = "images/"+ that.bool +"";
						setTimeout(function(){
							that.container.removeChild(Enemy);
						}, 500);
					}
					that.attackNum++;
				}
			}
			if (Enemy.offsetTop >= container.offsetHeight) {
				clearInterval(Enemy.timer);
				Enemy.parentNode.removeChild(Enemy);
			}
		}, 30);
	}
}

//middle中型敌机
function MidEnemy(container){
	Enemy.call(this, container);
	this.img = "enemy2_fly_1.png";
	this.bool = "enemy2_fly_3.gif";
	this.width = 46;
	this.num = 5;
	this.height = 60;
	this.attack = 5;
}
MidEnemy.prototype = Enemy.prototype;

//big大型敌机
function BigEnemy(container){
	Enemy.call(this, container);
	this.img = "enemy3_fly_1.png";
	this.bool = "enemy3_fly_3.gif";
	this.width = 110;
	this.height = 164;
	this.num = 10;
	this.attack = 10;
}
BigEnemy.prototype = Enemy.prototype;