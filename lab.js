const fs = require('fs') // include module fs

console.log('******************before readFile****************');
fs.readFile('./plain.txt',function (err, content){ 
	if (err) { 
		return console.log(err) 
	} 
		console.log(content.toString('utf8')) 
}); 
console.log('******************after readFile****************');


