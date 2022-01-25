const mongoose = require('mongoose')

const commentTemplate = new mongoose.Schema({
    author: {
        type: String,
    },
    title: {
        type: String,
        required:true
    },
    body: {
        type: String,
        required: true
    },
    postedat:{
        type: Date, 
        required: true
    },
    parentId: {
        type: mongoose.ObjectId,
        required: false
    },
    rootId: {
        type: mongoose.ObjectId,
        required: false
    }
})

module.exports = mongoose.model('comments', commentTemplate)