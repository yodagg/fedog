const request = require('request')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')

module.exports = q => {
	let data = encodeURI(q)
	let url = `http://so.jb51.net/cse/search?q=${data}&click=1&s=10520733385329581432&nsid=`
	let content = ''
	return new Promise((resolve, reject) => {
		request(url, (err, response, body) => {
			if (!err && response.statusCode == 200) {
				let j = cheerio.load(body)
				let href = j("#results a").eq(0).attr("href")

				if( href.indexOf('article') === -1 ){
					content = null
					resolve(content)
					return
				}
				request({ encoding: null, url: href }, (err, res, main) => {
					main = iconv.decode(main, 'gb2312').toString()
					if (!err && res.statusCode == 200) {
						let $ = cheerio.load(main)
						let text = $("#content").html()
						content = text
					} else {
						content = null
					}
					resolve(content)
				})

			} else {

				content = null
			}
		})
	})
}
