import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = process.env.SECRET_KEY

async function getUsers(req, res) {
    try {
        const users = await User.find({})

        if (!users) {
            console.log('Could not fetch users')
        }

        res.json(users)
    } catch (error) {
        console.error(error)
    }
}

async function signin(req, res) {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username: username}) //find user in DB
        const passwordIsValid = await bcrypt.compare(password, user.password) //checkpassword

        //.compare returned falsy
        if (!passwordIsValid) {
            res.status(401).json({
                passwordError: `The password was incorrect`
            })
        }

        //Sign the JWT token
        const token = jwt.sign(
            { username: username },
            SECRET,
            {expiresIn: '1d'}
        )
        //respond with ONLY token
        res.json({
            token: token
        })
    } catch (error) {
        console.error(error)
    }
}

async function register(req, res) {
    try {
        const userData = req.body // extract userData
        //hash password
        userData.password = await bcrypt.hash(userData.password, 8)
        //create user
        const user = await User.create(userData)

        res.json({ //send success message back
            successMessage: `The user ${user.username} has been created successfully`
        })
    } catch (error) {
        console.error(error)
    }
}

export {
    signin,
    register,
    getUsers
}