const userpage = require('../models/userpage')
const userPage = require('../models/userpage')
const comment = require('../models/comment')


exports.getInformasi= async (req, res) =>{
        try {
            const userGetInformasi = await userPage.find()

            res.json({
                message: "succes get data",
                data: userGetInformasi
            })
        } catch (error) {
            
        }
    },

exports.getInformasiById = async (req, res)=>{
    // try {
        const InformationById = await userPage.findOne({_id: req.params.id}).populate('postedBy').exec((err, result) =>{
            if(err) {
                return res.json({
                    error: err
                })
            }
            res.json({
                result: result
            })
        })

    //     res.status(200).json({
    //         message: "success get detail information",
    //         data: InformationById
    //     })
    // } catch  {
    //     res.status(404).json({
    //         message: "information not found"
    //     })
    // }
    
},

exports.addInformasi = async (req, res) =>{
        const {name, title, content, alamat, postedBy, image} = req.body
        const informasi = await userPage.create({name, title,  content, alamat, postedBy, image})

        res.status(200).json({
            message: "success add information",
            data: informasi
        })
        

        /*
        const userInformasi = new userPage(data)
        userInformasi.save()
       

        res.json({
            message: "succes add data",
            data: userInformasi
        })
        */
    },

// exports.addInformasiById = async (req, res) =>{
//     const {textComment} = req.body
//     const commentUser = await comment.create({textComment})
//     res.status(200).json({
//         message: "success add data",
//         data: commentUser
//     })

    
    
// }

exports.updateInformasi = async (req, res) =>{
    const {name, title, content, alamat, image} = req.body
    const userInformasi = await userPage.findById(req.params.id)
    
    if(userInformasi){
        userInformasi.name = name
        userInformasi.title = title
        userInformasi.content = content
        userInformasi.alamat = alamat
        userInformasi.image = image
        const informationUpdate = await userInformasi.save()
            res.status(200).json({
                message: "update information successfuly",
                data: informationUpdate
            })
        }
        else{
            res.status(404).json({
                message: "update missing"
            })
        }
            
              
        
},

exports.deleteInformasi = (req, res) =>{
    userPage.findOneAndDelete({_id: req.params.id}, (err, deleteObj)=>{
        if(err){
            res.status(404).json({
                error: "item not found"
            })
        }else{
            res.status(200).json({
                message: "item successfuly deleted"
            })
        }
    })
}




