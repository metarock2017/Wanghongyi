var http = require('http');
var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var path = require('path')
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});
var app = express();


app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
var destinationFile, fileSize, uploadedBytes;
// destinationFile = fs.createWriteStream("a.txt");

app.use(express.static(path.join(__dirname, '/public')));

app.post('/fa', function(request, response) {
    // response.writeHead(200);
    var decode = new Buffer(request.body.data, 'base64').toString()
    console.log(decode)

    fs.writeFileSync('./a.png',decode, function(err) {
        if (err) throw err;
        console.log('文件写入成功');
    });
    response.end('hello data')
    // request.pipe(destinationFile);
    // fileSize = request.headers['content-length'];
    // uploadedBytes = 0;

    // request.on('data', function(d) {
    //     uploadedBytes += d.length;
    //     var p = (uploadedBytes / fileSize) * 100;
    //     response.write("Uploading " + parseInt(p, 0) + " %\n");
    // });

    // request.on('end', function() {
    //     response.end("File Upload Complete");
    // });
})


http.createServer(app).listen(3000, 'localhost');

// http.createServer(function(req,res){
//     if (req.url == '/') {
//         fs.readFile('index.html', function readData(err, data) {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(data);
//         })
//         fs.readFile('./js/obj.js', function readData(err, data) {
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end(data);
//         })
//     }else if (req.url == '/fa') {
//         console.log("fa")
//     }

// }).listen(3000,'localhost')