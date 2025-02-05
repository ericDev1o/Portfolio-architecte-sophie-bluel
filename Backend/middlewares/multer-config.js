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
		const filename = file.originalname.split(' ').join('_')
		const filenameArray = filename.split('.')
		filenameArray.pop()
		const filenameWithoutExtension = filenameArray.join('.')
		const extension = MIME_TYPE[file.mimetype]
		callback(null, filenameWithoutExtension + Date.now() + '.' + extension)
	}
})

module.exports = multer({storage}).single('image')