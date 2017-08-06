let addbtn = document.querySelector('.in');
let sendtext = [];
let calbtn = document.querySelector('.cal');
let result = document.querySelector('.res');
let i = 0;
addbtn.onclick = function () {
    let text = document.querySelector('.input');
    sendtext[i] = text.value;
    text.value = '';
    console.log('1');
    i++;
}
calbtn.onclick = function () {
    let w = new Worker("./worker.js");
    w.postMessage(sendtext);
    w.onmessage =  (arg) => {
        for ( let i = 0; i < arg.length; i++){
            result.innerHTML(arg[i]);
        }
    }
    sendtext = [];
    i = 0;
}