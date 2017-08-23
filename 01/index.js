var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var mytank = new Mytank();
var keysDown = {};
var w = window;
var PI = Math.PI;
var score = 0;
var before = Date.now();
var bullets = [];
var enemytanks = [];
var startTime; 

requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//重启游戏
function ReStart() {
    var change,
        gap = 2000;
    startTime = Date.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mytank.bg.onload = function() {
        ctx.drawImage(mytank.bg, mytank.x, mytank.y)
    }
    setInterval(function() {
        var type,
            random = Math.random();
        change = (Date.now() - startTime)/60000;

        if (change>1) {
            change = 1;
        }
        gap = Math.floor(2000/(1+change));
        console.log(gap)
        if (random <0.2) {
            type = "HeavyTank";
        }else if (random >0.5){
            type = "MediumTank";
        }else {
            type = "LightTank"
        }
        CreateEnemy(type);
    }, gap)

}
//敌军坦克数据
function EnemyTank() {
    this.MediumTank = {
        type: "m",
        health: 1,
        speed: 100,
        bullet: "AP",
        shoted: false,
        shotspeed: 0.8,
        x: 0,
        y: 0,
        bg: new Image(),
        src: "./enemytank-u.png",
        direction: "up",
        len: 50
    }
    this.HeavyTank = {
        type: "h",
        health: 2,
        speed: 70,
        bullet: "HE",
        shoted: false,
        shotspeed: 0.4,
        x: 0,
        y: 0,
        bg: new Image(),
        src: "./heavy-u.png",
        direction: "up",
        len: 50
    }
    this.LightTank = {
        type: "l",
        health: 1,
        speed: 150,
        bullet: "PongPong",
        shoted: false,
        shotspeed: 1.2,
        x: 0,
        y: 0,
        bg: new Image(),
        src: "./light-u.png",
        direction: "up",
        len: 50
    }

}
//玩家坦克数据
function Mytank() {
    this.health = 2;
    this.speed = 200;
    this.bullet = "APCR";
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
        direction: "up",
        display: 1
    }
    this.HE = {
        damage: 1,
        speed: 150,
        bg: new Image(),
        src: "./HE.png",
        x: 0,
        y: 0,
        direction: "up",
        display: 1
    }
    this.APCR = {
        damage: 1,
        speed: 400,
        bg: new Image(),
        src: "./AP.png",
        x: 0,
        y: 0,
        direction: "up",
        display: 1
    }
    this.PongPong = {
        damage: 0.5,
        speed: 400,
        bg: new Image(),
        src: "./PongPong.png",
        x: 0,
        y: 0,
        direction: "up",
        display: 1
    }

}
//生成新炮弹
function CreateBullet(tank) {
    var newbullet;
    if (tank.bullet == "AP") {
        newbullet = new Bullet().AP;
    }
    if (tank.bullet == "APCR") {
        newbullet = new Bullet().APCR;
    }
    if (tank.bullet == "HE") {
        newbullet = new Bullet().HE;
    }
    if (tank.bullet == "PongPong") {
        newbullet = new Bullet().PongPong;
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
    var newenemy;
    if (type == "MediumTank") {
        newenemy = new EnemyTank().MediumTank;
    }else if (type == "HeavyTank") {
        newenemy = new EnemyTank().HeavyTank;
    }else if (type == "LightTank") {
        newenemy = new EnemyTank().LightTank;
    }
    newenemy.x = Math.random() * 750;
    newenemy.y = Math.random() * 750;
    // setInterval(function() {
    //     CreateBullet(newenemy)
    // }, 1000 / newenemy.shotspeed)
    enemytanks.push(newenemy);
    console.log(enemytanks)
}
//监听用户输入
function ListenKeyDown() {

    addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;

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
//更新所有坦克情况
function UpDateTanks(modifier) {
    var distancex,
        distancey,
        z;
    for (var i = enemytanks.length - 1; i >= 0; i--) {
        z = Math.abs(distancex) - Math.abs(distancey);
        distancex = enemytanks[i].x - mytank.x;
        distancey = enemytanks[i].y - mytank.y;

        if (z > 0) {
            if (distancex > 1) {
                if (enemytanks[i].type == "m") {
                    enemytanks[i].src = "./enemytank-l.png";
                } else if (enemytanks[i].type == "h") {
                    enemytanks[i].src = "./heavy-l.png";
                } else if (enemytanks[i].type == "l") {
                    enemytanks[i].src = "./light-l.png";
                }

                enemytanks[i].direction = "left";
                enemytanks[i].x -= enemytanks[i].speed * modifier;
            } else if (distancex < -1) {
                if (enemytanks[i].type == "m") {
                    enemytanks[i].src = "./enemytank-r.png";
                } else if (enemytanks[i].type == "h") {
                    enemytanks[i].src = "./heavy-r.png";
                } else if (enemytanks[i].type == "l") {
                    enemytanks[i].src = "./light-r.png";
                }
                enemytanks[i].direction = "right";
                enemytanks[i].x += enemytanks[i].speed * modifier;
            } else {
                if (distancey > 0) {
                    if (enemytanks[i].type == "m") {
                        enemytanks[i].src = "./enemytank-u.png";
                    } else if (enemytanks[i].type == "h") {
                        enemytanks[i].src = "./heavy-u.png";
                    } else if (enemytanks[i].type == "l") {
                        enemytanks[i].src = "./light-u.png";
                    }
                    enemytanks[i].direction = "up";
                    enemytanks[i].y -= enemytanks[i].speed * modifier;
                } else if (distancey < 0) {
                    if (enemytanks[i].type == "m") {
                        enemytanks[i].src = "./enemytank-d.png";
                    } else if (enemytanks[i].type == "h") {
                        enemytanks[i].src = "./heavy-d.png";
                    } else if (enemytanks[i].type == "l") {
                        enemytanks[i].src = "./light-d.png";
                    }
                    enemytanks[i].direction = "down";
                    enemytanks[i].y += enemytanks[i].speed * modifier;
                }
            }
        } else if (z <= 0) {
            if (distancey > 1) {
                if (enemytanks[i].type == "m") {
                    enemytanks[i].src = "./enemytank-u.png";
                } else if (enemytanks[i].type == "h") {
                    enemytanks[i].src = "./heavy-u.png";
                } else if (enemytanks[i].type == "l") {
                    enemytanks[i].src = "./light-u.png";
                }
                enemytanks[i].direction = "up";
                enemytanks[i].y -= enemytanks[i].speed * modifier;
            } else if (distancey < -1) {
                if (enemytanks[i].type == "m") {
                    enemytanks[i].src = "./enemytank-d.png";
                } else if (enemytanks[i].type == "h") {
                    enemytanks[i].src = "./heavy-d.png";
                } else if (enemytanks[i].type == "l") {
                    enemytanks[i].src = "./light-d.png";
                }
                enemytanks[i].direction = "down";
                enemytanks[i].y += enemytanks[i].speed * modifier;
            } else {
                if (distancex > 0) {
                    if (enemytanks[i].type == "m") {
                        enemytanks[i].src = "./enemytank-l.png";
                    } else if (enemytanks[i].type == "h") {
                        enemytanks[i].src = "./heavy-l.png";
                    } else if (enemytanks[i].type == "l") {
                        enemytanks[i].src = "./light-l.png";
                    }
                    enemytanks[i].direction = "left";
                    enemytanks[i].x -= enemytanks[i].speed * modifier;
                } else if (distancex < 0) {
                    if (enemytanks[i].type == "m") {
                        enemytanks[i].src = "./enemytank-r.png";
                    } else if (enemytanks[i].type == "h") {
                        enemytanks[i].src = "./heavy-r.png";
                    } else if (enemytanks[i].type == "l") {
                        enemytanks[i].src = "./light-r.png";
                    }
                    enemytanks[i].direction = "right";
                    enemytanks[i].x += enemytanks[i].speed * modifier;
                }
            }
        }
        if (!enemytanks[i].shoted) {
            CreateBullet(enemytanks[i])
        }

    }
}
//碰撞检测
function IsTrade() {
    var distancex,
        distancey,
        distance;
    for (var i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].x < 0 || bullets[i].x > 800 || bullets[i].y < 0 || bullets[i].y > 800) {

        } else {

            distancex = Math.abs(bullets[i].x - mytank.x - 25);
            distancey = Math.abs(bullets[i].y - mytank.y - 25);
            distance = Math.sqrt(distancex * distancex + distancey * distancey);
            if (distance < 25) {
                bullets[i].display = 0;
                mytank.health -= bullets[i].damage;
            }
            for (var j = enemytanks.length - 1; j >= 0; j--) {

                if (bullets[i] != undefined) {
                    distancex = Math.abs(bullets[i].x - enemytanks[j].x - 25);
                    distancey = Math.abs(bullets[i].y - enemytanks[j].y - 25);
                    distance = Math.sqrt(distancex * distancex + distancey * distancey);
                    if (distance < 25) {
                        enemytanks[j].health -= bullets[i].damage;
                        bullets.splice(i, 1);

                        if (enemytanks[j].health <= 0) {
                            enemytanks.splice(j, 1);

                        }
                    }
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
        if (bullets[i].display) {
            bullets[i].bg.src = bullets[i].src;
            ctx.drawImage(bullets[i].bg, bullets[i].x, bullets[i].y)
        }

    }
    for (var i = enemytanks.length - 1; i >= 0; i--) {
        if (enemytanks[i].health > 0) {
            enemytanks[i].bg.src = enemytanks[i].src;
            ctx.drawImage(enemytanks[i].bg, enemytanks[i].x, enemytanks[i].y)
        }

    }
}
//主循环
function MainLoop() {
    var now = Date.now();
    var gap = (now - before) / 1000;
    UpDate(gap);
    UpDateBullets(gap);
    UpDateTanks(gap);
    IsTrade();

    ReDraw();
    requestAnimationFrame(MainLoop);
    before = now;
}

ReStart();
ListenKeyDown();
MainLoop();