// const jwt = require('jsonwebtoken')
// const Comment = require('../models/commentmodal')
// const signedUpCopy = require('../models/signupmodals')

// const secret = 'secret123'

// function getuserfromToken(token){
//     const userInfo = jwt.verify(token, secret)
//     return signedUpCopy.findById(userInfo.id)
// }


// const addCommentToPost = (req, res) => {
//     const token = req.cookies.token
//     getuserfromToken(token)
//     .then(userInfo => {
//         const {rootId} = req.body
//         const comment = new Comment({
//         author: userInfo.userName,
//         title: req.body.postBodyComment,
//         body: req.body.postBodyComment,
//         postedat: new Date(),
//         rootId, 
//     })
//     comment.save()
//     .then(savedcomment => {
//         console.log(savedcomment)
//     })
//     }) .catch(error => {
//         console.log(error)
//     })

//     return res.json({status: 'ok'})
// }

// module.exports = {addCommentToPost}