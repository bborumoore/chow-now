const router = require("express").Router();
const runsController = require("../../controllers/runsController");

// Matches with "/api/books"
router.route("/")
  .get(runsController.findAll)
  .post(runsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(runsController.findById)
  .put(runsController.update)
  .delete(runsController.remove);

module.exports = router;