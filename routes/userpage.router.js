const express = require('express')
const {authJwt} = require('../middlewares')
const controller = require("../controllers/userpage.controller")
const app = express.Router()

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/userpage",  controller.getInformasi)
    app.get("/userpage/:id", authJwt.verifyToken, controller.getInformasiById)
    app.post("/userpage", authJwt.verifyToken, controller.addInformasi)
    // app.post("/userpage/:id", authJwt.verifyToken, controller.addInformasiById)
    app.put("/userpage/:id", authJwt.verifyToken, controller.updateInformasi)
    app.delete("/userpage/:id", authJwt.verifyToken, controller.deleteInformasi)
  
  
    
module.exports = app



