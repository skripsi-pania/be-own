const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const app = require("express").Router();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

app.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.register
);

app.post("/signin", controller.login);
// app.get("/signin", controller.getDataUser);

app.post("/signout", controller.logout);

app.get("/admin", controller.getDataUser);
app.get(
  "/admin/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  controller.getDataUserById
);
app.delete(
  "/admin/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  controller.deletUserById
);
app.put(
  "/admin/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  controller.updateUserById
);

module.exports = app;
