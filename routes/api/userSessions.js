const router = require("express").Router();
const userSessionsController = require("../../controllers/userSessionsController");

// Matches with "/api/userSessions"
router.route("/")
  .get(userSessionsController.findAll)
  .post(userSessionsController.create);

// Matches with "/api/userSessions/:id"
router
  .route("/:id")
  .get(userSessionsController.findById)
  .put(userSessionsController.update)
  .delete(userSessionsController.remove);

module.exports = router;