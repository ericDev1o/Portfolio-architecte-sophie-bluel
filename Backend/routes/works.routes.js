const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const checkWork = require('../middlewares/checkWork');
const workCtrl = require('../controllers/works.controller');

router.post('/', auth, (req, res, next) => {
    console.log("router.post enter");
    multer(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: "Erreur lors de l'upload" });
        }
        console.log("req.body après multer :", req.body);
        checkWork(req, res, next);
    }); 
}, workCtrl.create);

router.get('/', workCtrl.findAll);
router.delete('/:id', auth, workCtrl.delete);

module.exports = router;
