const db = require('./../models');
const Works = db.works

exports.findAll = async (req, res) =>  {
	const works = await Works.findAll({include: 'category'});
	return res.status(200).json(works);
}

exports.create = async (req, res) => {
	const host = req.hostname + ":" + process.env.PORT;
	const title = "test"; //req.body.title.trim();
	const categoryId = parseInt(req.body.category);
	const userId = req.auth.userId;
	const imageUrl = `${req.protocol}://${host}/images/test`; //${req.file.filename}`;
	try{
		const work = await Works.create({
			title,
			imageUrl,
			categoryId,
			userId
		})
		return res.status(201).json(work)
	}catch (err) {
		console.error(new Date().toLocaleTimeString(), "Something went wrong in works.controller.create.");
		return res.status(500).json({ error: new Error('Something went wrong in works.controller.create') })
	}
}

exports.delete = async (req, res) => {
	try{
		await Works.destroy({where:{id: req.params.id}})
		return res.status(204).json({message: 'Work Deleted Successfully'})
	}catch(e){
		return res.status(500).json({error: new Error('Something went wrong')})
	}
}