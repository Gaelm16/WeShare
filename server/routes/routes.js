const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signedUpCopy = require('../models/signupmodals')
const Comment = require('../models/commentmodal')

const secret = 'secret123'

router.post('/register', async (req, res) => {
    try{
    const password = await bcrypt.hashSync( req.body.passWord, 10)
    
    const signedUpUser = new signedUpCopy({ 
        userName:req.body.userName,
        passWord: password
    })
    console.log(signedUpUser)
    await signedUpUser.save()
    .then(userInfo => {
        const token = jwt.sign({id:userInfo._id, userName:userInfo.userName}, secret) 
        console.log(token)
        res.cookie('token', token,{
            httpOnly: true
        })
    })
    } catch(err){
        console.log(err)
    }

    res.json({status: 'ok'})
})

router.post('/login', async (req, res) => {
  const {userName,passWord} = req.body;
  const signed = await signedUpCopy.findOne({userName})

  if(!signed) {
    return res.json({status: 'error', error: 'Invalid username/password'})
  }

  if(await bcrypt.compare(passWord, signed.passWord)){
    const token = jwt.sign({id: signed._id, userName: signed.userName}, secret)
    res.cookie('token', token,{
            httpOnly: true
        })
    // console.log({data: token})
    // res.header('auth-token', token).send(token)
    return res.json({status: 'ok', data: token, result: signed})
  } 

    return res.json({status: 'error', error: 'Invalid username/password'})
});

router.get('/loggedIn', async (req, res) => {
   try{
        const token = req.cookies.token
        if(!token) {
            return res.json(false)
        }

        getuserfromToken(token)

        // jwt.verify(token, secret)

        res.json(true)
    } catch(err) {
        res.json(false)
    }
})

router.get('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    .send()
})

//function that gets user from token
function getuserfromToken(token){
    const userInfo = jwt.verify(token, secret)
    return signedUpCopy.findById(userInfo.id)
}

router.post('/posts', (req, res) => {
    const token = req.cookies.token
    getuserfromToken(token)
    .then(userInfo => {
        const comment = new Comment({
        author: userInfo.userName,
        title: req.body.title,
        body: req.body.body,
        postedat: new Date(),
    })
    comment.save()
    .then(savedcomment => {
        console.log(savedcomment)
    })
    }) .catch(error => {
        console.log(error)
    })

    return res.json({status: 'ok'})
})

router.get('/posts', (req, res) => {
    Comment.find({rootId: null}).sort({postedat: -1}).then(comments => {
        res.json(comments)
    })
})

router.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id).then(comment => {
        res.json(comment)
    })
})

router.get('/comments/root/:rootId', (req, res) => {
    Comment.find({_rootId: req.params.rootId}).sort({postedat: -1}).then(comments => {
        res.json(comments)
    })
})

router.post('/comments/:id', (req, res) => {
    const token = req.cookies.token
    getuserfromToken(token)
    .then(userInfo => {
        const {rootId} = req.body
        const comment = new Comment({
        author: userInfo.userName,
        title: req.body.postBodyComment,
        body: req.body.postBodyComment,
        postedat: new Date(),
        rootId, 
    })
    comment.save()
    .then(savedcomment => {
        console.log(savedcomment)
    })
    }) .catch(error => {
        console.log(error)
    })

    return res.json({status: 'ok'})
})

router.get('/profile', (req, res) => {
    const token = req.cookies.token
    getuserfromToken(token)
    .then(userInfo => {
        Comment.find({author: userInfo.userName, rootId: null}).sort({postedat: -1}).then(myposts => {
            res.json(myposts)
        })
    })
})

router.delete('/profile/:id', (req, res) => {
    const {id} = req.params
    Comment.findByIdAndDelete({_id: id}).then(deleteposts => {
        res.json(deleteposts)
    })
})

router.put('/profile/:id', (req, res) => {
    // const newtitle = req.body.newtitle
    // const newbody = req.body.newbody
    const id = req.params.id

    Comment.findByIdAndUpdate(id, {
        title: req.body.title,
        body: req.body.body
    })
    .then(updatedpost => {
        res.json(updatedpost)
    })
})


module.exports = router