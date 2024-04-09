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

async function editComment(req, res) {
    try {
        //get IDs
        const id = req.params.postId
        const comId = req.params.comId

        const commentEdit = req.body
        //find Post and Comment
        const post = await Post.findById(id)
        const comment = post.comments.id(comId)
        //replace text
        comment['text'] = commentEdit.text
        await post.save()

        res.json({
            message: "Comment edited successfully!"
        })

    } catch (error) {
        console.error(error)
    }
}

async function deleteComment(req, res) {
    try {
        //get IDs
        const id = req.params.postId
        const comId = req.params.comId

        //find Post and Comment
        const post = await Post.findById(id)
        const comment = post.comments.id(comId)
        comment.deleteOne()

        await post.save()

        res.json({
            message: "Comment successfully deleted!"
        })

    } catch (error) {
        console.error(error)
    }
}

export {
    getAllComments,
    postComment,
    editComment,
    deleteComment
}