import express from 'express'
import auction from './auction.js'
import user from './users.js'
import {verifyToken} from "../authentication/utils.js";

const router = new express.Router();

router.get('/test', (req,res) =>{
    res.end("Patat")
})

router.use((req,res,next) =>{
    try{
        const payload = verifyToken(req.header('Authorization'))
        if(payload){
            req.token = payload
            return next();
        }
    }catch (problem){
        console.log(`Error occerd. Problem: ${problem}`)
    }
    res.status(403).end(`Missing valid JSON web token.`)
})


router.use("/auctions", auction)
router.use('/user',user)


export default router