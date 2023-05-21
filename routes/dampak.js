// const { authJwt } = require("../middlewares");
// const controller = require("../controllers/dampakController");
// const app = require("express").Router();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
//   next();
// });

// app.post(
//   "/dampak",
//   authJwt.verifyToken,
//   authJwt.isAdmin,
//   controller.createDampak
// );

// app.put(
//   "/dampak/:id",
//   authJwt.verifyToken,
//   authJwt.isAdmin,
//   controller.updateDampak
// );
// app.delete(
//   "/dampak/:id",
//   authJwt.verifyToken,
//   authJwt.isAdmin,
//   controller.deleteDampak
// );
// app.get("/dampak/:id", authJwt.verifyToken, controller.getSingleDampak);
// app.get("/dampak", authJwt.verifyToken, controller.getAllDampaks);

// module.exports = app;
