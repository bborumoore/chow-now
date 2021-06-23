const router = require("express").Router();
const orderItemsController = require("../../controllers/orderItemsController");

// Matches with "/api/books"
router.route("/")
  .get(orderItemsController.findAll)
  .post(orderItemsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(orderItemsController.findById)
  .put(orderItemsController.update)
  .delete(orderItemsController.remove);

module.exports = router;