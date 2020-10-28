import express from 'express'
import {getUser} from './REST/users.js'
import checkPassword from './authentication/utils.js'
import {createToken} from "./authentication/utils.js";


export default function(req,res) {
    const user = getUser(req.body.user)
    if (!user || !checkPassword(req.body.password, user.passwordHash)) {
        console.log('User was not found or password was wrong retunring: Invalid user/password combination')
        return res.status(403).json({errorMessage: 'Invalid user/password combination'});
    } else {
        const payload = {
            user: user.name,
            roles: user.roles
        }
        console.log('Created payload')
        const tokenString = createToken(payload)
        console.log('created tokenString')
        return res.status(200).json({token: tokenString})
    }
}