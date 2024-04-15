import jwt from 'jsonwebtoken';
import Post from '../models/postModel.js';

const SECRET = process.env.SECRET_KEY

async function verifyAuth (req, res, next) {
    const tokenHeader = req.headers.authorization
    const token = tokenHeader.substring(7)
    const validToken = jwt.verify(token, SECRET)
    
    const id = req.params.id
    const post = await Post.findById(id)

    if (!validToken || token.exp > new Date()) {
        res.status(498).json({
            tokenError: `Invalid token or expired, re-authenticate`
        })
    } else if (post.userId.toString() !== validToken.userId) {
        res.status(401).json({
            message: `You are not authorized to perform this function`
        })
    } else {
        next()
    }

}

async function extractId(req, res, next) {
    const tokenHeader = req.headers.authorization
    const token = tokenHeader.substring(7)
    const validToken = jwt.verify(token, SECRET)

    req.params.userId = validToken.userId

    if (!validToken || token.exp > new Date()) {
        res.status(498).json({
            tokenError: `Invalid token or expired, re-authenticate`
        })
    }
    next()
}

// verifyAuthUser
// verifyAuthComment

export {
    verifyAuth,
    extractId    
} 