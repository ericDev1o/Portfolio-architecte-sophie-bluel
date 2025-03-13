const multer = require('multer')

const MIME_TYPE = {
	'image/jpeg': 'jpg',
	'image/png': 'png'/*,
	'image/webp': 'webp',*/
}

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './images')
	},
	filename:  (req, file, callback) => {
		console.log("enter multer filename")
		const filename = file.originalname.split(' ').join('_')
		console.log("filename : " + filename)
		const filenameArray = filename.split('.')
		filenameArray.pop()
		const filenameWithoutExtension = filenameArray.join('.')
		console.log("filenameWithoutExtension : " + filenameWithoutExtension)
		const extension = MIME_TYPE[file.mimetype]
		callback(null, filenameWithoutExtension + Date.now() + '.' + extension)
		console.log("exit multer filename")
	}
})

module.exports = multer({storage}).single('image')