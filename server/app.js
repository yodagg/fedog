const express = require('express')
const cors = require('cors')
const api = require('./api/')
const app = express()

var whitelist = ['http://wo2.me','http://localhost:8082']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback('error')
    }
  }
}


app.get('/',cors(corsOptions), (req, res) => {
	let data = req.query.search
	console.log(data,current_time())
	let start = async type => {
		let result = await type(data)
		if (result === null) {
			let call = await api.yellow(data)

			result = call.indexOf('图灵') != -1 ? api.random() : call
		}
		res.send(result)
	}

	if (data.indexOf('笑话') != -1 || data.indexOf('段子') != -1) {
		start(api.joke)

	} else if (data.toUpperCase().indexOf('MUSIC') != -1) {
		start(api.music)

	} else {

		start(api.search)
	}

}).listen(8089)

app.get('/fanyi',cors(corsOptions), (req, res) => {
	let data = req.query.search
	let fn = async type => {
		let content = await api.interpret(data)

		res.send(content === null ? api.random() : content)
	}
	fn()
})

function current_time() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}