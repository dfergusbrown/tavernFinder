import Post from "../models/postModel.js";

async function searchPosts(req, res) {
    try {
        const searchParam = req.body
        const searchObj = {}

        if (searchParam) {
            const freqArr = []
            for (const [key, value] of Object.entries(searchParam)) {
                if (value !== '') {
                    if (key === "keyword") {
                        searchObj["$or"] = [
                                { "campaignName": { "$regex": value, "$options": "i" } },
                                { "description": { "$regex": value, "$options": "i" } }
                            ]
                    } else if (key === "totalSlots") {
                        searchObj[key] = {$gte: value}
                    } else if (key === `daysOfWkOpts1` ||
                                key === `daysOfWkOpts2` ||
                                key === `daysOfWkOpts3` ||
                                key === `daysOfWkOpts4` ||
                                key === `daysOfWkOpts5` ||
                                key === `daysOfWkOpts6` ||
                                key === `daysOfWkOpts7`) {
                        freqArr.push(value) // add values to array
                        const inObj = {} // create includes object
                        inObj['$in'] = freqArr // add array to object
                        searchObj['freqDays'] = inObj
                    } else {
                        searchObj[key] = value
                    }
                }
            }
        }
        console.log(searchObj)
        const posts = await Post.find(searchObj).populate('userId', 'username').exec()

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

        const posts = await Post.find({}).populate('userId', 'username').exec()
        res.json(posts)
    } catch (error) {
        console.error(error)
    }
}

async function getPostsById(req, res) {
    try {
        const id = req.params.id
        const posts = await Post.find({_id: id}).populate('userId', 'username').exec()
        res.json(posts)
    } catch (error) {
        console.error(error)
    }
}

async function getPostsByUserId(req, res) {
    try {
        const userId = req.params.userId
        const posts = await Post.find({userId: userId})

        res.json({
            results: posts
        })
    } catch (error) {
        console.error(error)
    }
}

async function createPost(req, res) {
    try {
        const postData = req.body
        postData.userId = req.params.userId

        const post = await Post.create(postData)
        post ? console.log('post successful') : null
        res.status(201).json(post)
    } catch (error) {
        console.error(error)
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
    searchPosts,
    getPostsById,
    getPostsByUserId
}