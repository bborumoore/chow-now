const { User, UserSession } = require("../models");
const db = require("../models");

// Defining methods for the usersController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ userCreated: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function (req, res) {
    db.User
      .findOne({ email: req.params.email })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  // Route for creating a new user
  signup: (req, res, next) => {
    const { body } = req;
    const { 
      firstName,
      lastName,
      password
    } = body;
    let {
      email
    } = body;

    if(!firstName) {
      return res.send({
        success: false,
        message: 'Error: First name cannot be blank.'
      })
    }
    if(!lastName) {
      return res.send({
        success: false,
        message: 'Error: Last name cannot be blank.'
      })
    }
    if(!email) {
      return res.send({
        success: false,
        message: 'Error: email cannot be blank.'
      })
    }
    if(!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      })
    }

    email = email.toLowerCase();

    //Steps:
    // Verify email doesn't exist
    console.log('About to User.find');
    User.find({
      email: email
    }, (err, previousUsers) => {
      console.log('Results from User.find');
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Email already in use.'
        });
      }

      // Save new User
      console.log('About to save a new User');
      const newUser = new User();

      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        console.log('Inside user.save callback');
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'User successfully created.'
        })
      });
      
    });
    
  },

  
  //Route to be used for logging in a user securely
  login: (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    if(!email) {
      return res.send({
        success: false,
        message: 'Error: email cannot be blank.'
      })
    }
    if(!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      })
    }

    email = email.toLowerCase();

    // Find User
    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('attempting to find email');
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (users.length !=1) {
        return res.send({
          success: false,
          message: 'Error: Invalid User'
        });
      }

      const user = users[0];
      if (!user.checkPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid Login attempt'
        });
      }

      // Create User Session
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        console.log('Attempting to save session');
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

        return res.send({
          success: true,
          message: 'Valid sign in.',
          token: doc._id
        })
      })
    });  
  },

  // Verify user credentials
  verify: (req, res, next) => {
    // Get the user token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify token is unique and not Deleted
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (sessions.length !=1) {
        return res.send({
          success: false,
          message: 'Error: Invalid session'
        });
      } else {
        return res.send({
          success: true,
          message: 'Valid session'
        })
      }



    })
  },

  // Log User out of Session
  logout: (req, res, next) => {
    // Get the user token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify token is unique and not Deleted
    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted: true}
    }, null, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
        return res.send({
          success: true,
          message: 'Session Terminated'
        });
    });
  }
};
