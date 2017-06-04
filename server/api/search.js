const express=require('express')
const request=require('request')
const cheerio=require('cheerio')
const iconv=require('iconv-lite')
const obj=require('./newobj')
const app=express()

exports.search=(res,q) =>{
	let url= `http://so.jb51.net/cse/search?q=${q}&click=1&s=10520733385329581432&nsid=`
	request( url, ( err, response, body ) =>{
		if( !err && response.statusCode == 200 ){
			let j= cheerio.load(body)
			let href= j("#results a").eq(0).attr("href")
			request({encoding:null,url:href} ,(err,resp,main)=>{
				main=iconv.decode(main, 'gb2312').toString()
				if( !err && resp.statusCode == 200 ){
					let $= cheerio.load(main)
					let object= obj.obj($("#content").html())
					res.send(object)
				}else{
					res.send(obj.obj('查询出错！'))
				}
			})
		}else{

			res.send(obj.obj('查询出错！'))
		}
	} )
}