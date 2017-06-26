const request = require('request')
const cheerio = require('cheerio')


module.exports = () => {
	let url = 'http://52dx.win/nr.php'
	let content = ''
    return new Promise(function (resolve, reject) {
        request(url, (err, response, body) => {
			if (!err && response.statusCode == 200) {
				let $ = cheerio.load(body)
				let text = $('body').text()
				content = text
			} else {
				content = null
			}
			resolve(content)
		})
    })
}