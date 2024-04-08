import { Schema, model } from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'That username is already in use'],
        minlength: [6, 'Username must be at least 6 characters long'],
        maxlength: [14, 'Username cannot be more than 14 characters long'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstName: {type: String, required: [true, 'First name is required']},
    lastName: {type: String, required: [true, 'Last name is required']},
    email:  {type: String, required: [true, 'email is required']},
    userBio: String,
    //add notifications here
})

const User = model('User', userSchema)

export default User