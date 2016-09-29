fs = require('fs');
http = require('http');
url = require('url');
const path = require('path');



http.createServer(function(req, res){


  var fullFilePath = path.join(process.cwd(), url.parse(req.url).pathname);


    fs.stat(fullFilePath, function(err, stats) {
      if(err) {
       res.statusCode = 404;
       res.end("File not found");
       return;
     }

     if (fs.statSync(fullFilePath).isDirectory()) {
      var body = '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" '+
      'content="text/html; charset=UTF-8" />'+
      '</head>'+
      '<body>'+
      '<ul>'+
      '<li>View <a href="./logo.png">logo.png</a>.</li>' +
      '<li>View <a href="./video.mp4">video.mp4</a>.</li>' +
      '</ul>'+
      '</body>'+
      '</html>';
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(body);
      res.end();
    }
    else{

      var pathName = url.parse(req.url).pathname;
      var file = new fs.ReadStream(pathName);
      sendFile(file,res);
    }
    console.log(pathName);

});


}).listen(8080);

    function sendFile(file,res){
      file.pipe(res);

      file.on('error',function(err){
        res.statusCode=500;
        res.end("Server Error");
        console.error(err);
      });

    }