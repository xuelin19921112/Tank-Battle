function bgMove(time){
	var count = 0;
	setInterval(function(){
		container.style.backgroundPosition = "0 "+ (++count) +"px";
	}, time);
}
var container = $("#container");;
$("#startBtn").onclick = function(){
	container.style.background = "url(images/background_1.png)";
	$("#startBtn").style.display = "none";
	bgMove(10);

	//创建我方飞机对象实例
	var myPlan = new MyPlan(container);
	myPlan.bulspeed = 200;
	myPlan.bulMoveSpeed = 10;
	myPlan.init();
	//创建敌方飞机对象实例
	var enemyPlan = new Enemy(container);
	enemyPlan.EnemyMoveSpeed = 3;
	enemyPlan.plan = myPlan;
	enemyPlan.bulList = myPlan.bulList;
	enemyPlan.removeBullet = myPlan.removeBullet;
	enemyPlan.init();

	//创建敌方mid中型飞机
	var midEnemy = new MidEnemy(container);
	midEnemy.EnemyMoveSpeed = 2;
	midEnemy.plan = myPlan;
	midEnemy.bulList = myPlan.bulList;
	midEnemy.removeBullet = myPlan.removeBullet;
	midEnemy.init();

	//创建big大型飞机
	var bigEnemy = new BigEnemy(container);
	bigEnemy.EnemyMoveSpeed = 1;
	bigEnemy.plan = myPlan;
	bigEnemy.bulList = myPlan.bulList;
	bigEnemy.removeBullet = myPlan.removeBullet;
	bigEnemy.init();
}
