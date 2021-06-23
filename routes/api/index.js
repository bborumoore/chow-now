const router = require("express").Router();
const groupRoutes = require("./groups");
const orderRoutes = require("./orders");
const orderItemRoutes = require("./orderItems");
const runRoutes = require("./runs");
const userRoutes = require("./users");

// groups routes
router.use("/groups", groupRoutes);

// orders routes
router.use("/orders", orderRoutes);

// orderItems routes
router.use("/orderItems", orderItemRoutes);

// runs routes
router.use("/runs", runRoutes);

// users routes
router.use("/users", userRoutes);

module.exports = router;
