const User = require("../models/User");

// CREATE
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// READ ALL
const getUsers = async (req, res) => {
  try {
    const users = await user.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// READ ONE
const getUser = async (req, res) => {
  try {
    const user = await user.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "user not found"
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  try {
    const user = await user.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "user not found"
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const user = await user.findByIdAndDelete(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "user not found"
      });
    }

    res.status(200).json({
      message: "user deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};