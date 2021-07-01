const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.post('/login', usersController.login);

router.post('/signup', usersController.signup);

router.get('/verify', usersController.verify);

router.get('/logout', usersController.logout);

module.exports = router;