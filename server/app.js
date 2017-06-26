const express = require('express')
const cors = require('cors')
const api = require('./api/')
const app = express()

app.use(cors())

app.get('/', (req, res)=>{
	let data = req.query.search
	let q = encodeURI(data)

	let start = async type =>{
	    let result = await type(q)
	    if( result === null ){
	    	result = api.random()
	    }
	    res.send(result)
	}

	if( data.indexOf('笑话') != -1 || data.indexOf('段子') != -1 ){
		start(api.joke)
	}else{
		start(api.search)
	}

}).listen(8089)
