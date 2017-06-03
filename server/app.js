const express=require('express')
const request=require('request')
const cheerio=require('cheerio')
const iconv=require("iconv-lite")
const app=express()

app.get('/', (req, res)=>{
	let data= encodeURI(req.query.search)
	let url= `http://so.jb51.net/cse/search?q=${data}&click=1&s=10520733385329581432&nsid=`
	search(res,url)
}).listen(8089)

let search = (res,url) =>{
	request( url, ( err, response, body ) =>{
		if( !err && response.statusCode == 200 ){
			let j= cheerio.load(body)
			let href= j("#results a").eq(0).attr("href")
			request({encoding:null,url:href} ,(err,resp,main)=>{
				main=iconv.decode(main, 'gb2312').toString()
				if( !err && resp.statusCode == 200 ){
					let $= cheerio.load(main)
					let obj= new Object()
					obj.title= $("#contents .title h1").text()
					obj.content= $("#content").text()
					res.send(obj)
				}else{
					res.send('错误')
				}
			})
		}else{
			res.send('错误')
		}
	} )
}
