import Post from "../models/postModel.js"


async function getAllComments (req, res) {
    try {
        const id = req.params.postId
        const comments = await Post.findById(id).comments

        res.json(comments)
    } catch (error) {
        console.error(error)
    }
}

async function postComment (req, res) {
    try {
        const id = req.params.postId
        const comment = req.body
        const post = await Post.findById(id)

        comment["timePosted"] = new Date()
        post.comments.push(comment)
        await post.save()

        res.status(201).json({
            message: "Comment created successfully"
        })
    } catch (error) {
        console.error(error)
    }
}
// const comId = req.params.comId
// const comments = post.comments.id()

export {
    getAllComments,
    postComment
}