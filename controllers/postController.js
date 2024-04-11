import Post from "../models/postModel.js";

async function searchPosts(req, res) {
    try {
        const searchParam = req.body
        const searchObj = {}
        if (searchParam) {
            for (const [key, value] of Object.entries(searchParam)) {
                if (value !== '') {
                    if (key === "campaignName" ||
                        key === "description") {
                        searchObj["$or"] = [
                                { "campaignName": { "$regex": value, "$options": "i" } },
                                { "description": { "$regex": value, "$options": "i" } }
                            ]
                    } else if (key === "totalSlots") {
                        searchObj[key] = {$gte: value}
                    } else if (key === "freqDays") {
                        searchObj[key] = {$in: value}
                    } else {
                        searchObj[key] = value
                    }
                }
            }
        }
        console.log(searchObj)
        const posts = await Post.find(searchObj)

        res.json({
            numOfResults: posts.length,
            results: posts
        })
    } catch (error) {
        console.error(error)
    }
}

async function getPosts(req, res) {
    try {
        console.log('get all posts initiated')
        const posts = await Post.find({})
        // console.log(posts)
        res.json(posts)
    } catch (error) {
        console.error(error)
    }
}

async function createPost(req, res) {
    try {
        const postData = req.body
        const post = await Post.create(postData)
        res.status(201).json(post)
    } catch (error) {
        console.log(error)
    }
}

async function updatePost(req, res) {
    try {
        const postId = req.params.id
        const updateData = req.body

        const update = await Post.findByIdAndUpdate({_id: postId}, updateData)
        res.status(200).json({
            successMessage: `Successfully updated post ${update._id}`
        })
    } catch (error) {
        console.error(error)
    }
}

async function deletePost(req, res) {
    try {
        const postId = req.params.id
        
        const deleted = await Post.findByIdAndDelete({_id: postId})
        res.status(200).json({
            successMessage: `Successfully deleted post ${deleted._id}`
        })
    } catch (error) {
        console.error(error)
    }
}

export {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    searchPosts
}