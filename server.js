var http = require("http");
var fs = require("fs");
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/cakes", function(req,res){
	fs.readFile(__dirname+"/cakes.json","utf8",function(err,data){
	res.send(data);
	});
});

app.post("/addCake", function(req,res){
	var bicycles = JSON.parse(fs.readFileSync(__dirname+"/cakes.json"));
	bicycles.push(req.body);
	fs.writeFile(__dirname+"/cakes.json",JSON.stringify(bicycles),function(err){
		res.send(err);
	});
});

app.get("/deleteCake", function(req, res){
	if(req.query == undefined){
		return;
	}
	if(req.query['name'] == undefined){
		res.send();
		return;
	}
	var bicycles = JSON.parse(fs.readFileSync(__dirname+"/cakes.json"));
	
	bicycles = bicycles.filter(function(bicycle){ return bicycle.name != req.query['name'] });
	console.log(bicycles);
	fs.writeFile(__dirname+"/cakes.json",JSON.stringify(bicycles),function(err){
		if(err != null){
		console.log(err);
		}
	});
	res.send();
});



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Webtech http://%s:%s", host, port)
})