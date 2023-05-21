const asyncHandler = require('express-async-handler');


const Userprofile = require("../models/userprofile");
const userprofile = require('../routes/userprofile');


exports.getUserProfil = async (req, res) =>{
  try {
    const userProfil = await Userprofile.find()
    res.status(200).json({
      message: "success get data",
      data: userProfil
    })
  } catch  {
    res.status(400).json({
      message: "get data failed"
    })
  }
},


exports.getUserProfileById = async (req, res)=> {
 
    const userById = await Userprofile.findOne({_id: req.params.id}).populate('users').exec((err, result) =>{
      if(err) {
          return res.json({
              error: err
          })
      }
      res.send({
          result,
          
      })
  })
    
}

exports.getDetailUser = async (req, res) =>{
    Userprofile.find({})
    .populate('email.email')
    .exec(function (error, posts) {
        res.send(posts)
    })
}



exports.createprofile = asyncHandler(async(req, res) => {
  const {namaDepan, namaBelakang, email, password, jenisKelamin, nomorTelepon, alamat, users} = req.body
  const userprofile = await Userprofile.create({namaDepan, namaBelakang, email, password, jenisKelamin, nomorTelepon, alamat, users});
  res.status(201).json({
    success: true,
    data: userprofile,
    message: 'Userprofile is created successfully'
  })
})

exports.updateprofileByID = asyncHandler(async(req, res) => {
  try {
    const updateprofile = await Userprofile.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json({ 
      message: "Userprofile is updated successfully", 
      data: updateprofile 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

exports.deleteProfile = asyncHandler(async(req, res) =>{
  try {
    await Userprofile.findOneAndDelete({_id: req.params.id})
    res.status(200).json({
      message: "delete successfuly"
    })
  } catch  {
    res.status(400).json({
      message: "user not found"
    })
  }
})