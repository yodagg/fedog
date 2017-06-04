const express=require('express')
const cors=require('cors')
const search=require('./api/search')
const joke=require('./api/joke')
const app=express()

app.use(cors())

app.get('/', (req, res)=>{
	let data=req.query.search
	if( data.indexOf('笑话') != -1 || data.indexOf('段子') != -1 ){
		joke.joke(res)
	}else{
		let q= encodeURI(data)
		
		search.search(res,q)
	}
}).listen(8089)

