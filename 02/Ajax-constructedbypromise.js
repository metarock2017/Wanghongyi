//主体
function Ajax( msg = {}) {
    let XML = new XMLHttpRequest();
    let {method,url} = msg;
    let data = msg.data || {};
    let ajaxpromise = new Promise((resolve,reject) => {
        if (!(method && url)) {
            reject(console.log("some args missing"));
        }
        XML.open(method,url,true);

        if (method === 'GET') {
            XML.send();
        }else{
            XML.send(data);
        }

        XML.onreadystatechange = function () {
            if (XML.readyState == 4) {
                resolve(XML.responseText);
               
            }
        }
    })
    return ajaxpromise;
}
//测试
Ajax({
    method : 'GET',
    url : "/news?num=2"
}).then( (data) => {
    console.log(data)
})
// GET POST 方法添加
Ajax.get = function (requrl) {
    var requests = Ajax({
        method : 'GET',
        url : requrl
    })
    return requests;

}

Ajax.post = function (requrl,reqdata) {
    var requests = Ajax({
    method : 'GET',
    url : requrl,
    data : reqdata
    });
    return requests;
}
//测试
var test = Ajax.get("/news?num=2").then( (data) => {
    console.log(data);
})
