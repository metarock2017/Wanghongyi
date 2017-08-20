window.onload = function() {
    var mainbox = document.querySelector('.mainbox');
    var balls = document.querySelectorAll('.ball');

    setInterval(function() {
        mainbox.style.width = window.innerWidth + 'px';
        mainbox.style.height = window.innerHeight + 'px';
    }, 100)

    function Start() {
        for (let i = balls.length - 1; i >= 0; i--) {
            balls[i].name = i;
            balls[i].style.background = RandomColor()
            balls[i].speedX = Math.floor(Math.random() * 800) / 100 + 1;
            balls[i].speedY = Math.floor(Math.random() * 800) / 100 + 1;
            balls[i].style.left = Math.random() * 500 + 'px';
            balls[i].style.top = Math.random() * 500 + 'px';

            setInterval(function() {
                return Move(balls[i]);
            }, 15)

        }
    }

    

    // function Ball(name) {
    //     this.name = name;
    //     this.color = RandomColor()
    //     this.speedX = Math.random()*500;
    //     this.speedY = Math.random()*500;



    // }

    function RandomColor(color) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        color = 'rgb(' + r + ',' + g + ',' + b + ')';
        return color;
    }

    function Move(ball) {

        if (parseInt(ball.style.left) < 0 || parseInt(ball.style.left) > (parseInt(mainbox.style.width) - ball.offsetWidth)) {
            ball.speedX = -ball.speedX;


        }
        if (parseInt(ball.style.top) < 0 || parseInt(ball.style.top) > parseInt(mainbox.style.height) - ball.offsetHeight) {
            ball.speedY = -ball.speedY;
        }

        ball.style.left = parseInt(ball.style.left) + ball.speedX + 'px';
        ball.style.top = parseInt(ball.style.top) + ball.speedY + 'px';

    }
    Start();
}