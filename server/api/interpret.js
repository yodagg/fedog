const request = require('request')
const cheerio = require('cheerio')


module.exports = q => {
	let text = q
	let url = `http://fanyi.baidu.com/v2transapi?from=en&to=zh&query=${text}`
	let content = ''
	return new Promise(function (resolve, reject) {
		request(url, (err, response, body) => {
			if (!err && response.statusCode == 200) {
				let $ = cheerio.load(body)
				let str = $('body').text()
				let data = JSON.parse(str)
				let tag = data.liju_result.tag
				if( tag && tag.length){
					content = tag
				}else{
					content = null
				}
				
			} else {
				content = null
			}
			resolve(content)
		})
	})
}