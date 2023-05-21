const asyncHandler = require('express-async-handler');

const Dampak = require('../models/dampakModel');


exports.createDampak = asyncHandler(async (req, res) => {

    const {category, title, content, image} = req.body
    const dampak = await Dampak.create({category, title, content, image});
    res.status(201).json({
        success: true,
        data: dampak,
        message: 'Dampak is created successfully'
    })
})



 exports.updateDampak = asyncHandler(async (req, res) => {

    const {category, title, content, image} = req.body
    const existDampak = await Dampak.findOne({ _id : req.params.id})
    if(existDampak){
        existDampak.category = category;
        existDampak.title = title;
        existDampak.content = content;
        existDampak.image = image;
        const updatedDampak = await existDampak.save();
        res.status(200).json({
            success: true,
            data: updatedDampak,
            message: 'Dampak is updated successfully'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message: 'Dampak is Not Found'
        })
    }
   
})



 exports.deleteDampak = asyncHandler(async (req, res) => {
    const existDampak = await Dampak.findOne({ _id : req.params.id})
    if(existDampak){
        await existDampak.remove();
        res.status(200).json({
            success: true,
            message: 'Dampak is deleted successfully'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message: 'Dampak is Not Found'
        })
    }
   
})


/**
 * @desc For Get Single Dampak
 * @route /api/dampak/:id
 * @access Public
 */
 exports.getSingleDampak = asyncHandler(async (req, res) => {
    const existDampak = await Dampak.findOne({ _id : req.params.id})
    if(existDampak){
        res.status(200).json({
            success: true,
            data:existDampak,
            message: 'Dampak is fetched successfully'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message: 'Dampak is Not Found'
        })
    }
   
})



/**
 * @desc For Get all Dampaks
 * @route /api/dampak
 * @access Public
 */
 exports.getAllDampaks = asyncHandler(async (req, res) => {
    const allDampaks = await Dampak.find({})
    if(allDampaks){
        res.status(200).json({
            success: true,
            data:allDampaks,
            message: 'All Dampaks are fetched successfully'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message: 'Dampaks are Not Found'
        })
    }
   
})

/**
 * @desc For Delete Dampak
 * @route /api/dampak
 * @access Public
 */
/* 
exports.deleteallDampaks = asyncHandler(async (req, res) => {
    const existDampak = await Dampak.find({})
    if(existDampak){
        await existDampak.remove();
        res.status(200).json({
            success: true,
            message: 'Dampak is deleted successfully'
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message: 'Dampak is Not Found'
        })
    }
   
})*/
