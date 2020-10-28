import express from 'express'

const router = express.Router();

const users = [{
        name: 'Luuk',
        email: 'luuk.hamming@gmail.com',
        //Wachtwoord: Pat4t
        passwordHash: '$2b$10$Se4JSu1vuBhJGaMf9guQyONicQvLY3Xq7z6jpRbNl7hhUgfLRLvE6',
        roles: ['admin', 'user'],
        hasBidOn: []
    },
    {
        name: 'normalUser',
        email: 'normal.user@gmail.com',
        //Wachtwoord: Us3r
        passwordHash: '$2b$10$x/ZXop6qKcsJbnaKhP.1.Ox0A6kVY.R2EgXzHV0nElzvvwMFVBRJa',
        roles: ['user'],
        hasBidOn: []
}];

router.get('/', (req,res) =>{
    res.json(users);
});

router.get('/userInfo', (req,res) => {
    res.json(req.token.roles)
})

router.post('/addNewUser', (req,res) => {
    console.log("Inside post of new user!")
    console.log(`Inside of reqBody: ${req.body.newUser}`)
})

export function getUser(name){
    const foundItem = users.find(item => item.name === name);
    if(foundItem !== undefined){
        //Als die bestaat return hem
        console.log(`Found user: ${foundItem.name}`)
        return foundItem;
    }else{
        return undefined
    }
}

export function addUser(newUser){
    console.log("Added a new user")
    users.push(newUser)
    console.log(users)
}

export default router