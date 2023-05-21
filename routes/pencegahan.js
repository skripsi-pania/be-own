// const { authJwt } = require("../middlewares");
// const controller = require("../controllers/pencegahanController");
// const express = require("express");
// const app = express.Router();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
//   next();
// });

// app.post(
//   "/pencegahan",
//   authJwt.verifyToken,
//   authJwt.isAdmin,
//   controller.createPrevention
// );

// app.put(
//   "/pencegahan/:id",
//   authJwt.verifyToken,
//   authJwt.isAdmin,
//   controller.updatePrevention
// );
// app.delete(
//   "/pencegahan/:id",
//   authJwt.verifyToken,
//   authJwt.isAdmin,
//   controller.deletePrevention
// );
// app.get("/pencegahan/:id", authJwt.verifyToken, controller.getSinglePrevention);
// app.get("/pencegahan", authJwt.verifyToken, controller.getAllPreventions);

// module.exports = app;
