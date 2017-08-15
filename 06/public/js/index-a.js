        var roll =document.querySelector('.pics-a');
        var points = document.querySelectorAll('.points-a li');
        var msg = document.querySelectorAll('.title-a span')
        var timer;
        var number = 0;
        var left;
        var con = document.querySelector('.lunbo-a')


        for (var i = 0; i < points.length; i++) {
            points[i].index = i;
            msg[i].index = i;
            points[i].onclick = function () {
                number = this.index;
                left = number*-440;
                roll.style.left = left + 'px';
                points[number].className = 'lunbo-a-select';
                msg[number].className = 'title-on';
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
            timer = setInterval(run,5000)
        }

        timer = setInterval(run,5000)

        
        function run () {
            number ++;
            if (number > 4) {
                number = 0;
            }
            left = number*-440;
            roll.style.left = left + 'px';
            points[number].className = 'lunbo-a-select';
            msg[number].className = 'title-on'
            for (var i = 0; i < points.length; i++) {
                if (number != i) {
                    points[i].className = '';
                    msg[i].className = '';
                }
            }
        }