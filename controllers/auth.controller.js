const config = require("../config/auth.config");
const user = require("../models/user.model");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email was not found",
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.headers.token = token;

    res.status(200).send({
      token,
      username: user.username,
      _id: user._id,
      email: user.email,
      roles: user.roles,
    });
  });
};

exports.logout = async (req, res) => {
  try {
    req.headers = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

(exports.getDataUser = async (req, res) => {
  try {
    const data = await user.find();
    res.status(200).json({
      message: "success get data",
      data: data,
    });
  } catch {
    res.status(400).json({
      message: "data user not found",
    });
  }
}),
  (exports.getDataUserById = async (req, res) => {
    try {
      const data = await user.findOne({ _id: req.params.id });
      res.status(200).json({
        message: "get user detail successfuly",
        data: data,
      });
    } catch {
      res.status(400).json({
        message: "user not found",
      });
    }
  }),
  (exports.deletUserById = async (req, res) => {
    try {
      await user.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: "delete successfuly",
      });
    } catch {
      res.status(400).json({
        message: "delete user failed",
      });
    }
  }),
  (exports.updateUserById = async (req, res) => {
    const { username, email, password } = req.body;
    const updateUser = await user.findOneAndUpdate({ _id: req.params.id });
    if (updateUser) {
      updateUser.username = username;
      updateUser.email = email;
      updateUser.password = password;

      const updated = await updateUser.save();
      res.status(200).json({
        message: "update user successfuly",
        data: updated,
      });
    } else {
      res.status(400).json({
        message: "user not found",
      });
    }
  });
