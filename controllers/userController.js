const User = require('../models/User');
const util = require('util');

// Get all users
const getUsers = async (req, res) => {
    console.log("Fetching all users");
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
    console.log(util.inspect(User, { showHidden: false, depth: null }) );
    User.find().then(users => res.json(users))
    .catch(err => res.status(500).send('Server Error'));
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { getUsers, getUserById };