import bcrypt from 'bcrypt';
import pkg from 'bcrypt';
const {genSaltSync} = pkg;

import jwt from 'jsonwebtoken'

const mySecret = 'My Secret on the Server side', bearerPrefix = 'Bearer';

export function hashPassword(plainPassword){
    return bcrypt.hashSync(plainPassword,genSaltSync(10))
}

export default function checkPassword(plainPassword, hash){
    return bcrypt.compareSync(plainPassword, hash)
}

export function createToken(payload){
    console.log('Signed token: ' + jwt.sign(payload, mySecret))
    return jwt.sign(payload, mySecret)
}

export function verifyToken(authorization){
    console.log("Verify Token: " + authorization)
    return authorization.startsWith(bearerPrefix) && jwt.verify(authorization.substr(bearerPrefix.length), mySecret)
}