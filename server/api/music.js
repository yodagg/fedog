const request = require('request')
const cheerio = require('cheerio')


module.exports = q => {
	let music = q.split('music')[1]
	let url = `http://s.music.163.com/search/get/?type=1&limit=1&s=${music}`
	let content = ''
    return new Promise(function (resolve, reject) {
        request(url, (err, response, body) => {
			if (!err && response.statusCode == 200) {
				let $ = cheerio.load(body)
				let text = $('body').text()
				let data = JSON.parse(text)
				if( data.result.songs.length ){
					let id = data.result.songs[0].id
					content = `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=${id}&auto=1&height=66"></iframe>`
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