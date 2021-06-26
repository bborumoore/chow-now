const router = require("express").Router();
const orderItemsController = require("../../controllers/orderItemsController");

// Matches with "/api/orderItems"
router.route("/")
  .get(orderItemsController.findAll)
  .post(orderItemsController.create);

// Matches with "/api/orderItems/:id"
router
  .route("/:id")
  .get(orderItemsController.findById)
  .put(orderItemsController.update)
  .delete(orderItemsController.remove);

module.exports = router;