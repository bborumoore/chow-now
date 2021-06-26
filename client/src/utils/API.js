import axios from "axios";

export default {

  // USER FUNCTIONS

  // Get individual user by email
  getUserByEmail: function (email) {
    return axios.get("/api/users/email/" + email);
  },
  // Gets all users
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Creates a user in the database
  createUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  // Gets the user with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Updates the user with the given id
  updateUser: function (id, userData) {
    return axios.put("/api/users/" + id, userData);
  },
  // Deletes the user with the given id
  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },

  // RUN FUNCTIONS

  // Gets all runs
  getRuns: function () {
    return axios.get("/api/runs");
  },
  // Creates a Run in the database
  createRun: function (runData) {
    return axios.post("/api/runs", runData);
  },
  // Gets the Run with the given id
  getRun: function (id) {
    return axios.get("/api/runs/" + id);
  },
  // Updates the Run with the given id
  updateRun: function (id, runData) {
    return axios.put("/api/runs/" + id, runData);
  },
  // Deletes the Run with the given id
  deleteRun: function (id) {
    return axios.delete("/api/runs/" + id);
  },

  // ORDER FUNCTIONS

  // Gets all orders
  getOrders: function () {
    return axios.get("/api/orders");
  },
  // Creates a order in the database
  createOrder: function (orderData) {
    return axios.post("/api/orders", orderData);
  },
  // Gets the order with the given id
  getOrder: function (id) {
    return axios.get("/api/orders/" + id);
  },
  // Updates the order with the given id
  updateOrder: function (id, orderData) {
    return axios.put("/api/orders/" + id, orderData);
  },
  // Deletes the order with the given id
  deleteOrder: function (id) {
    return axios.delete("/api/orders/" + id);
  },

  // ORDERITEM FUNCTIONS

  // Gets all orderItems
  getOrderItems: function () {
    return axios.get("/api/orderItems");
  },
  // Creates a orderItem in the database
  createOrderItem: function (orderItemData) {
    return axios.post("/api/orderItems", orderItemData);
  },
  // Gets the orderItem with the given id
  getOrderItem: function (id) {
    return axios.get("/api/orderItems/" + id);
  },
  // Updates the orderItem with the given id
  updateOrderItem: function (id, orderItemData) {
    return axios.put("/api/orderItems/" + id, orderItemData);
  },
  // Deletes the orderItem with the given id
  deleteOrderItem: function (id) {
    return axios.delete("/api/orderItems/" + id);
  },

  // GROUP FUNCTIONS

  // Gets all groups
  getGroups: function () {
    return axios.get("/api/groups");
  },
  // Creates a group in the database
  createGroup: function (groupData) {
    return axios.post("/api/groups", groupData);
  },
  // Gets the group with the given id
  getGroup: function (id) {
    return axios.get("/api/groups/" + id);
  },
  // Updates the group with the given id
  updateGroup: function (id, groupData) {
    return axios.put("/api/groups/" + id, groupData);
  },
  // Deletes the group with the given id
  deleteGroup: function (id) {
    return axios.delete("/api/groups/" + id);
  }
};
