const http = require('http');
const fs = require('fs');
const url = require('url');
//call back function
serveStatic = function (req, res) {
	let fileName = '.' + url.parse(req.url).pathname;
	res.writeHead(200, {'Content-Type': 'text/plain' });
	res.write("Place holder where the data should be sent");
	res.end();
}
 
const myserver = http.createServer(serveStatic); //create a server object
myserver.listen(80, function() {console.log("Listening on port 80" )}); 

