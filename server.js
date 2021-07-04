const express = require("express");
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(express);
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI;

// Configuration
// app.use(bodyParser.json());
// app.use(cookieParser());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chowNow",
{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// Create store for sessions
// const store = new MongoStore({
//   uri: (process.env.MONGODB_URI || "mongodb://localhost/chowNow"),
//   collection: "mySessions"
// })

// Create a session to utilize session data
// app.use(session({
//   secret: 'my-super-duper-secret',
//   resave: false,
//   saveUninitialized: true,
//   store: new MongoStore({ mongooseConnection: db })
// }));

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎 ==> Express/Node.js API server now on http://localhost:${PORT}`);
});
