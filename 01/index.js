var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var mytank = new Mytank();
var keysDown = {};
var w = window;
var before = Date.now();
var bullets = [];
var enemytanks = [];

requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//重启游戏
function ReStart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mytank.bg.onload = function() {
        ctx.drawImage(mytank.bg, mytank.x, mytank.y)
    }

}
//敌军坦克数据
function EnemyTank() {
    this.MediumTank = {
        health: 1,
        speed: 100,
        bullet: "AP",
        shoted: false,
        shotspeed: 1,
        x: 0,
        y: 0,
        bg: new Image(),
        src: "./enemytank-u.png",
        direction: "up",
        len: 50
    }
}
//玩家坦克数据
function Mytank() {
    this.health = 2;
    this.speed = 200;
    this.bullet = "AP";
    this.shoted = false;
    this.shotspeed = 1;
    this.x = canvas.width / 2 - 25;
    this.y = canvas.width / 2 - 25;
    this.bg = new Image();
    this.bg.src = "./mytank-u.png";
    this.direction = "up";
    this.len = 50;
}
//各种炮弹
function Bullet() {
    this.AP = {
        damage: 1,
        speed: 300,
        bg: new Image(),
        src: "./AP.png",
        x: 0,
        y: 0,
        direction: "up"
    }
}
//生成新炮弹
function CreateBullet(tank) {
    if (tank.bullet == "AP") {
        var newbullet = new Bullet().AP;
    }
    newbullet.x = tank.x;
    newbullet.y = tank.y;
    newbullet.direction = tank.direction;
    if (tank.direction == "up") {
        newbullet.x += tank.len / 2;
    }
    if (tank.direction == "down") {
        newbullet.x += tank.len / 2;
        newbullet.y += tank.len;
    }
    if (tank.direction == "left") {
        newbullet.y += tank.len / 2;

    }
    if (tank.direction == "right") {
        newbullet.x += tank.len;
        newbullet.y += tank.len / 2;
    }
    bullets.push(newbullet);
    tank.shoted = true;
    setTimeout(function() {
        tank.shoted = false;
    }, 1000 / tank.shotspeed)
    // console.log(bullets)
}
//生成敌方坦克
function CreateEnemy(type) {
    if (type == "MediumTank") {
        var newenemy = new EnemyTank().MediumTank;
    }
    newenemy.x = Math.random() * 750;
    newenemy.y = Math.random() * 750;
    setInterval(function () {
        CreateBullet(newenemy)
    },1000/newenemy.shotspeed)
    enemytanks.push(newenemy);
}
//监听用户输入
function ListenKeyDown() {

    addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;
        console.log(keysDown)
        if (e.keyCode == 32) { //Shoot!
            // mytank.shoted = true;
            if (!mytank.shoted) {
                CreateBullet(mytank);
            }
        }
    }, false);
    addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    }, false);
}
//更新己方坦克的情况
function UpDate(modifier) {
    if (38 in keysDown) { // Player holding up 

        if (40 in keysDown || 37 in keysDown || 39 in keysDown) {

        } else {
            mytank.y -= mytank.speed * modifier;
            mytank.bg.src = "./mytank-u.png";
            mytank.direction = "up";
        }

    }
    if (40 in keysDown) { // Player holding down
        if (38 in keysDown || 37 in keysDown || 39 in keysDown) {

        } else {
            mytank.y += mytank.speed * modifier;
            mytank.bg.src = "./mytank-d.png";
            mytank.direction = "down";
        }
    }
    if (37 in keysDown) { // Player holding left
        if (40 in keysDown || 38 in keysDown || 39 in keysDown) {

        } else {
            mytank.x -= mytank.speed * modifier;
            mytank.bg.src = "./mytank-l.png";
            mytank.direction = "left";
        }
    }
    if (39 in keysDown) { // Player holding right
        if (40 in keysDown || 37 in keysDown || 38 in keysDown) {

        } else {
            mytank.x += mytank.speed * modifier;
            mytank.bg.src = "./mytank-r.png";
            mytank.direction = "right";
        }
    }
}
//更新炮弹情况
function UpDateBullets(modifier) {
    for (var i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].direction == "up") { // 上飞炮弹  
            bullets[i].y -= bullets[i].speed * modifier;
        }
        if (bullets[i].direction == "down") { // 下飞炮弹
            bullets[i].y += bullets[i].speed * modifier;
        }
        if (bullets[i].direction == "left") { // 左飞炮弹
            bullets[i].x -= bullets[i].speed * modifier;
        }
        if (bullets[i].direction == "right") { // 右飞炮弹
            bullets[i].x += bullets[i].speed * modifier;
        }
    }
}
//更新敌方坦克情况
function UpDateEnemy(modifier) {
    for (var i = enemytanks.length - 1; i >= 0; i--) {
        var distancex,
            distancey,
            z;
        z = Math.abs(distancex) - Math.abs(distancey);
        distancex = enemytanks[i].x - mytank.x;
        distancey = enemytanks[i].y - mytank.y;
        
        if (z > 0) {
            if (distancex > 1) {
                enemytanks[i].src = "./enemytank-l.png";
                enemytanks[i].direction = "left";
                enemytanks[i].x -= enemytanks[i].speed * modifier;
            } else if (distancex < -1) {
                enemytanks[i].src = "./enemytank-r.png";
                enemytanks[i].direction = "right";
                enemytanks[i].x += enemytanks[i].speed * modifier;
            } else {
                if (distancey > 0) {
                    enemytanks[i].src = "./enemytank-u.png";
                    enemytanks[i].direction = "up";
                    enemytanks[i].y -= enemytanks[i].speed * modifier;
                } else if (distancey < 0) {
                    enemytanks[i].src = "./enemytank-d.png";
                    enemytanks[i].direction = "down";
                    enemytanks[i].y += enemytanks[i].speed * modifier;
                }
            }
        } else if (z <= 0) {
            if (distancey > 1) {
                enemytanks[i].src = "./enemytank-u.png";
                enemytanks[i].direction = "up";
                enemytanks[i].y -= enemytanks[i].speed * modifier;
            } else if (distancey < -1) {
                enemytanks[i].src = "./enemytank-d.png";
                enemytanks[i].direction = "down";
                enemytanks[i].y += enemytanks[i].speed * modifier;
            } else {
                if (distancex > 0) {
                    enemytanks[i].src = "./enemytank-l.png";
                    enemytanks[i].direction = "left";
                    enemytanks[i].x -= enemytanks[i].speed * modifier;
                } else if (distancex < 0) {
                    enemytanks[i].src = "./enemytank-r.png";
                    enemytanks[i].direction = "right";
                    enemytanks[i].x += enemytanks[i].speed * modifier;
                }
            }
        }

    }
}
//重绘
function ReDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mytank.bg, mytank.x, mytank.y);
    for (var i = bullets.length - 1; i >= 0; i--) {
        bullets[i].bg.src = bullets[i].src;
        ctx.drawImage(bullets[i].bg, bullets[i].x, bullets[i].y)
    }
    for (var i = enemytanks.length - 1; i >= 0; i--) {
        enemytanks[i].bg.src = enemytanks[i].src;
        ctx.drawImage(enemytanks[i].bg, enemytanks[i].x, enemytanks[i].y)
    }
}
//主循环
function MainLoop() {
    var now = Date.now();
    var gap = (now - before) / 1000;
    UpDate(gap);
    UpDateBullets(gap);
    UpDateEnemy(gap);
    ReDraw();
    requestAnimationFrame(MainLoop);
    before = now;
}

ReStart();
ListenKeyDown();
MainLoop();
setInterval(function() {
    var type = "MediumTank";
    CreateEnemy(type);
}, 1000)