const router = require("express").Router();
const groupRoutes = require("./groups");
const orderRoutes = require("./orders");
const orderItemRoutes = require("./orderItems");
const runRoutes = require("./runs");
const userRoutes = require("./users");
const authRoutes = require("./auth");
const userSessionRoutes = require("./userSessions");

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

// auth routes
router.use("/auth", authRoutes);

// session routes
router.use("/userSessions", userSessionRoutes);

module.exports = router;
