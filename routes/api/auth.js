const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.post('/login', usersController.login);

router.post('/signup', usersController.signup);

router.get('/verify', usersController.verify);

router.get('/logout', usersController.logout);

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
      res.json("Logged out.");
    } else {
      res.status(404).end();
    }
  });

module.exports = router;