var infocontainer = document.querySelector('.danmu-container');
var clicktodisplay = document.querySelector('.replybox');
var socket = io.connect('http://localhost:3000');


function send() {
    var info = document.querySelector('#sender');
    

    
    var danmucolor = document.querySelector('#danmucolor').value;
    var danmusize = document.querySelector('#danmusize').value;
    var danmuspeed = document.querySelector('#danmuspeed').value;
    var danmustyle = document.querySelector('#danmustyle').value;
    var msg = {
        "info":info.value,
        "color":danmucolor,
        "size":danmusize,
        "speed":danmuspeed,
        "style":danmustyle
    }
    // console.log(danmuspeed);
    // console.log(danmusize);
    // console.log(danmustyle);
    socket.emit('newmsg',msg);
        // var newspan = document.createElement('span');
    // newspan.style.top = position +'px';
    // newspan.style.color = danmucolor;
    // newspan.className = danmusize +" "+danmuspeed +" "+danmustyle;
    // newspan.appendChild(danmuinfo);
    // infocontainer.appendChild(newspan);
    info.value = '';
    //setTimeout(deleteit,12000);
}
socket.on('getmsg',function (msg) {
    console.log(msg)
    var danmuinfo = document.createTextNode(msg.info);
    var position = Math.round(Math.random()*550);
    var newspan = document.createElement('span');
    newspan.style.top = position + 'px';
    newspan.style.color = msg.color;
    newspan.className = msg.size + " " + msg.speed + " " + msg.style;
    newspan.appendChild(danmuinfo);
    infocontainer.appendChild(newspan);
})

function deleteit() {
    var elements = document.querySelectorAll('.danmu-container span');
    console.log("fa");
    for (var i = 0; i < elements.length; i++){
        elements[i].index = i;
        if (elements[i].index = 1) {
            elements[i].style.display = "none";
        }

    }
}
function displayit() {
    clicktodisplay.style.display = "block";
}
function hideit() {
    clicktodisplay.style.display = "none";
}


// function deleteit(){
//     var container = document.querySelector('.danmu-container')
//     var elements = document.querySelectorAll('.danmu-container span');
//     for (var i = 0; i < elements.length; i++) {
//         for (var i = 0; i < elements.length; i++) {
//             if (elements[i].style.left = -100 +'px') {
//                 container.removeChild(elements[i]);
//                 console.log(elements[i].style.left)
//             }
//         }
//     }
// }
// setInterval(deleteit,2000);