const http = require('http');

http.createServer(function (req, res) {
	res.write("full stack baby");
	res.end();
}).listen(3000);

console.log('server started on port 3000');
