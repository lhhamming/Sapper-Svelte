import {getUser} from "./REST/users.js";
import passwordCheck from './validity/passwordCheck'
import checkPassword, {createToken} from "./authentication/utils.js";
import emailValidation from "./validity/emailValidation";
import users, {addUser} from "./REST/users.js";
import bcrypt from 'bcrypt'

export default function(req,res) {
    const name = req.body.user;
    const password = req.body.password;
    const email = req.body.userEmail;
    if(name || password || email) {
        if (!getUser(req.body.user)) {
            //If it is undefined we can continue cause it doesnt exist.
            if (passwordCheck(password) && emailValidation(email)) {
                //the email and password are valid
                const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                const newUser = {
                    name: name,
                    email: email,
                    passwordHash: passwordHash,
                    roles: ['user'],
                    hasBidOn: []
                }

                addUser(newUser)

                const payload = {
                    user: name,
                    roles: 'user'
                }

                return res.status(200).json({token: payload})
            }
            return res.status(403).json({
                errorMessage: 'The password must contain atleast 1 Capital Letter and one number and must be longer than 6 characters ' +
                    '\n The email should be valid with an @ and .nl or .com at the end'
            })
        }
        return res.status(403).json({errorMessage: 'The username has already been chosen. Choose another one'})
    }
    return res.status(403).json({errorMessage: 'Please fill in all of the other forms'})
}