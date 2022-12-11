const express = require('express');
const mongoose = require('mongoose')
const router = express.Router()
const User = require("../../server/models/userModel")
const postModel = require("../../server/models/postModel")

//Create New Post
router.post('/', async (req, res) => {
    try {
        const newPost = new postModel(req.body);
        await newPost.save();
        res.status(200).json("Post created!");
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get Post

router.get('/get-post/:id', async (req, res) => {
    try {
        const id = req.params.id
        const post = await postModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }

})


//update post

router.put('/update-post/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { userId } = req.body
        let post = await postModel.findById(id)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json(" Post updated");
        } else {

            res.status(403).json("Action Forbidden")

        }

    } catch (error) {
        res.status(500).json("hello" + error);
    }
})

//Delete Post

router.delete('/delete-post/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { userId } = req.body
        let post = await postModel.findById(id)
        if (post.userId === userId) {
            await post.deleteOne()
            res.status(200).json(" Post deleted");
        } else {
            res.status(403).json("Action Forbidden")
        }
    } catch (error) {
        res.status(500).json("hello" + error);
    }
})


// Like or Unlike Post


router.put("/like-post/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { userId } = req.body

        let post = await postModel.findById(id)

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json(" Post liked");

        } else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json(" Post Unliked");
        }
    } catch (error) {
        res.status(500).json("hello" + error);
    }
})


//Get Timeline post

router.get('/timeline-post/:id', async (req,res)=>{
    try {
        const userId = req.params.id;
        const currentUserPosts = await postModel.find({ userId: userId });

        const followingPosts = await User.aggregate([
            {
              $match: { 
                _id: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $lookup: {
                from: "posts",
                localField: "following",
                foreignField: "userId",
                as: "followingPosts",
              },
            },
            {
              $project: {
                followingPosts: 1,
                _id: 0,
              },
            },
          ]);

          res
          .status(200)
          .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
          .sort((a,b)=>{
              return b.createdAt - a.createdAt;
          })
          );
        
    } catch (error) {
        res.status(500).json("hello" + error);
    }
})

module.exports = router;