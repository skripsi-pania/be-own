const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  const auth =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization;
    console.log(auth);
  if (auth === "") {
    return res.status(403).send({ message: "No token provided!" });
  }
  try {
    const token = auth.split(" ")[1]
    console.log(token);
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
    
  } catch (err) {
    return res.status(401).send({message: "Invalid Token"});
  }
 
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isUser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "user") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require User Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isUser,
};
module.exports = authJwt;
