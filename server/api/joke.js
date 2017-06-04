const express=require('express')
const request=require('request')
const cheerio=require('cheerio')
const obj=require('./newobj')
const app=express()

exports.joke=(res,q) =>{
	let url= 'http://52dx.win/nr.php'
	request( url, ( err, response, body ) =>{
		if( !err && response.statusCode == 200 ){
			let $= cheerio.load(body)
			let object= obj.obj($('body').text())
			res.send(object)
		}else{
			res.send(obj.obj('查询出错！'))
		}
	} )
}