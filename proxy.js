var http = require('http');
var url = require('url');
var request = require('request');
var querystring = require("querystring");

http.createServer(function(req, res) {

    var arg = url.parse(req.url, true);
    var query = arg.query;
    var pathName = arg.pathname;
    // console.log(arg);
    if (pathName == "/proxy/") {
        var remoteUrl = query.src;

        console.log("remoteUrl", remoteUrl,"method",req.method);
        if (req.method === 'GET') {
            request.get(remoteUrl).on('response',function(post_res){
                // console.log(post_res.headers);
                post_res.headers["Access-Control-Allow-Origin"]="*";
                post_res.headers["Access-Control-Allow-Headers"]="Content-Type,Content-Length,X-Requested-With,Authorization, Accept";
                post_res.headers["Access-Control-Allow-Methods"]="PUT,POST,GET,DELETE,OPTIONS";
               
                
                // console.log(post_res.headers);
    
            }).on('error', function(err) {
                    console.log(err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end();
            }).pipe(res);
        } else if (req.method === 'POST') {
        	
        	req.pipe(request.post(remoteUrl)).on('response',function(post_res){
        		// console.log(post_res.headers);
        		post_res.headers["Access-Control-Allow-Origin"]="*";
        		post_res.headers["Access-Control-Allow-Headers"]="Content-Type,Content-Length,X-Requested-With,Authorization, Accept";
        		post_res.headers["Access-Control-Allow-Methods"]="PUT,POST,GET,DELETE,OPTIONS";
               
                
        		// console.log(post_res.headers);
	
        	}).on('error', function(err) {
				    console.log(err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end();
			}).pipe(res);

           
        }else if(req.method == "OPTIONS"){
        	res.setHeader("Access-Control-Allow-Origin","*");
            // res.setHeader("Access-Control-Allow-Credentials",true);
        	res.setHeader("Access-Control-Allow-Headers","Content-Type,Content-Length,X-Requested-With,Authorization, Accept");
        	res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.setHeader("Access-Control-Max-Age",86400);
        	res.writeHead(200);
        	
        	res.end();
        }else{
            req.pipe(request(remoteUrl)).on("response",function(post_res){
                post_res.headers["Access-Control-Allow-Origin"]="*";
                post_res.headers["Access-Control-Allow-Headers"]="Content-Type,Content-Length,X-Requested-With,Authorization, Accept";
                post_res.headers["Access-Control-Allow-Methods"]="PUT,POST,GET,DELETE,OPTIONS";
               
            }).on('error', function(err) {
                    console.log("error:",err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end();
            }).pipe(res);
        }

    } else {
        res.end("hello");
    }
    process.on("uncaughtException",function(error){
        console.log("process got an error",error);
    })


}).listen(9999);
console.log("server listen port 9999 on",new Date());