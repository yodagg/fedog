const request = require('request')


module.exports = q => {
	let url = `http://www.niurenqushi.com/api/simsimi/`
	let content = ''
	return new Promise(function (resolve, reject) {
		request.post(url, {form:{txt:q}}, function(err, response, body){
			if (!err && response.statusCode == 200) {
				let obj = JSON.parse(body)
				content = obj.text
			} else {
				content = null
			}
			resolve(content)
		})
	})
}