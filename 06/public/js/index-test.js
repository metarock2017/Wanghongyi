    var livebody =document.querySelector('.live-body');
    var livechild = document.querySelectorAll('#live-swtich li');

    var dougabody =document.querySelector('.douga-body');
    var dougachild = document.querySelectorAll('#douga-swtich li');

    var musicbody =document.querySelector('.music-body');
    var musicchild = document.querySelectorAll('#music-swtich li');

    var dancebody =document.querySelector('.dance-body');
    var dancechild = document.querySelectorAll('#dance-swtich li');

    var gamebody =document.querySelector('.game-body');
    var gamechild = document.querySelectorAll('#game-swtich li');

    var tvbody =document.querySelector('.tv-body');
    var tvchild = document.querySelectorAll('#tv-swtich li');

    var moviebody =document.querySelector('.movie-body');
    var moviechild = document.querySelectorAll('#movie-swtich li');

    var entertainmentbody =document.querySelector('.entertainment-body');
    var entertainmentchild = document.querySelectorAll('#entertainment-swtich li');

    var adbody =document.querySelector('.ad-body');
    var adchild = document.querySelectorAll('#ad-swtich li');

    var fashionbody =document.querySelector('.fashion-body');
    var fashionchild = document.querySelectorAll('#fashion-swtich li');

    var guichubody =document.querySelector('.guichu-body');
    var guichuchild = document.querySelectorAll('#guichu-swtich li');

    var lifebody =document.querySelector('.life-body');
    var lifechild = document.querySelectorAll('#life-swtich li');

    var techbody =document.querySelector('.tech-body');
    var techchild = document.querySelectorAll('#tech-swtich li');

    var bangumichild = document.querySelectorAll('.clearfix li');




    swtichMKII(bangumichild);
    swtich(dougabody,dougachild);
    swtich(livebody,livechild);
    swtich(musicbody,musicchild);
    swtich(dancebody,dancechild);
    swtich(gamebody,gamechild);
    swtich(tvbody,tvchild);
    swtich(moviebody,moviechild);
    swtich(entertainmentbody,entertainmentchild);
    swtich(adbody,adchild);
    swtich(fashionbody,fashionchild);
    swtich(lifebody,lifechild);
    swtich(guichubody,guichuchild);
    swtich(techbody,techchild);
        


    function swtich(swtichbody,swtichchild){
        var number = 0;
        var left;
        for (var i = 0; i < swtichchild.length; i++) {
            swtichchild[i].index = i;
            swtichchild[i].onclick = function () {
                number = this.index;
                left = number*-260;
                swtichbody.style.left = left + 'px';
                swtichchild[number].className = 'swtich-on';
                for (var i = 0; i < swtichchild.length; i++) {
                    if (number != i) {
                        swtichchild[i].className = '';
                    }
                }
            }  
        }
    }

    function swtichMKII(swtichchild){
        var number = 0;
        var left;
        for (var i = 0; i < swtichchild.length; i++) {
            swtichchild[i].index = i;
            swtichchild[i].onclick = function () {
                number = this.index;
                
                
                swtichchild[number].className = 'bangumi-on';
                for (var i = 0; i < swtichchild.length; i++) {
                    if (number != i) {
                        swtichchild[i].className = '';
                    }
                }
            }  
        }
    }
        

