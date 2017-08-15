    var rollmini =document.querySelector('.mini-lunbo-container');
    var pointsmini = document.querySelectorAll('.mini-btn li');
    var msgmini = document.querySelectorAll('.mini-msg span');
    var conmini = document.querySelector('.mini-lunbo');
    runmini(rollmini,pointsmini,msgmini,msgmini);








    function  runmini  (roll,points,msg,con) {
        //var roll =document.querySelector('.pics-a');
        //var points = document.querySelectorAll('.points-a li');
        //var msg = document.querySelectorAll('.title-a span')
        var timer;
        var number = 0;
        var left;
        //var con = document.querySelector('.lunbo-a');


        for (var i = 0; i < points.length; i++) {
            points[i].index = i;
            msg[i].index = i;
            points[i].onmouseover = function () {
                number = this.index;
                left = number*-260;
                roll.style.left = left + 'px';
                points[number].className = 'mini-on';
                msg[number].className = 'mini-msg-on';
                for (var i = 0; i < points.length; i++) {
                    if (number != i) {
                        points[i].className = '';
                        msg[i].className = '';
                    }
                }
            }  
        }

        con.onmouseover = function () {
            clearInterval(timer)
        }

        con.onmouseleave = function() {
            timer = setInterval(run,1000)
        }

        timer = setInterval(run,3000)

        
        function run () {
            number ++;
            if (number > 2) {
                number = 0;
            }
            left = number*-260;
            roll.style.left = left + 'px';
            points[number].className = 'mini-on';
            msg[number].className = 'mini-msg-on'
            for (var i = 0; i < points.length; i++) {
                if (number != i) {
                    points[i].className = '';
                    msg[i].className = '';
                }
            }
        }
    }

        