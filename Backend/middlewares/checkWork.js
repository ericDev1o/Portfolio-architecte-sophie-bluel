module.exports = (req, res, next) => {
	try{
        const errMsg_400_beginsWith = "Bad request: ";

		const host = req.hostname + ":" + process.env.PORT; 
		const title = "test"; //req.body.title.trim() ?? undefined; 
		const categoryId = parseInt(req.body.category) ?? undefined; 
		const userId = req.auth.userId ?? undefined;
		const imageUrl = `${req.protocol}://${host}/images/test`;//${req.file.filename}`;

		console.log("title, categoryId, userId, imageUrl: " + title,categoryId,userId,imageUrl);
		if(title == undefined) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "req.body.title must be != undefined")});
		} else if( ! title.length > 0) {
			console.log("title.length !> 0")
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "title.length must be > 0!")});
		} else if(categoryId == undefined) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "req.body.category must be != undefined")});
        } else if( ! categoryId > 0) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "categoryId must be > 0!")});
		} else if(userId == undefined) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "userId must be != undefined")});
		} else if( ! userId > 0) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "userId must be > 0")});
		} else if(imageUrl == undefined) {
			return res.status(400).json({error: new Error(errMsg_400_beginsWith + "imageUrl must be !== undefined")});
		} else {
			req.work = {title, categoryId, userId, imageUrl}
		    next()
		}
	}catch(e){
		console.log("error catched")
		return res.status(500).json({error: new Error("Something wrong occured in checkWork.")});
	}
}