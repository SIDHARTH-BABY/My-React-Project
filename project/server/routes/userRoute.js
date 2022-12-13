const express = require('express')
const router = express.Router()
const User = require("../../server/models/userModel")

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('express')
const authMiddleware = require("../../server/middlewares/authMiddleware")

router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(200).send({ message: 'user already exists', success: false })
        }
        const password = req.body.password

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        req.body.password = hashedPassword

        const newuser = new User(req.body)

        await newuser.save()

        res.status(200).send({ message: 'user created successfully', success: true })


    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'error creating user', success: false, error })

    }

})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res
                .status(200)
                .send({ message: 'user does not exist', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Password is incorrect", success: false })
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })

            res.status(200).send({ message: 'login success', success: true, data: token })
        }
    } catch (error) {

        console.log(error);
        res
            .status(500)
            .send({ message: "error Logging", success: false, error })

    }

})

router.get('/get-user-info-by-id', authMiddleware, async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.body.userId })
        console.log(user);
        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", success: false })
        } else {
            res.status(200).send({
                success: true, data: {
                    _id :user._id, 
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    unSeenNot: user.unseenNotifications
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: 'error getting user info', success: false, error })

    }

})

//update user
router.put('/update-user/:id', async (req, res) => {

    try {
        const id = req.params.id

        const { currentUserId, currentUserAdminStatus, password } = req.body

        if (id === currentUserId || currentUserAdminStatus) {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const user = await User.findByIdAndUpdate(id, req.body, {
                new: true,
            });


            res.status(200).json(user);
        } else {

            res.status(403).json("Access Denied!")
        }


    } catch (error) {
        res.status(500).json(error)

    }
})


//delete user

router.delete('/delete-user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { currentUserId, currentUserAdminStatus } = req.body
        if (currentUserId === id || currentUserAdminStatus) {
            await User.findByIdAndDelete(id)
            res.status(200).json("User deleted")
        } else {
            res.status(403).json("You can only delete your profile")
        }
    } catch (error) {
        res.status(500).json(error)

    }
})


//Follow user
router.put('/follow-user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { currentUserId } = req.body
        if (currentUserId === id) {
            res.status(403).json("action forbidden")
        } else {
            const followUser = await User.findById(id)
            const followingUser = await User.findById(currentUserId)
            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } })
                await followingUser.updateOne({ $push: { following: id } })
                res.status(200).json("user followed")
            } else {
                res.status(403).json("User is already followed by you")
            }
        }

    } catch (error) {
        res.status(500).json(error)

    }
})


//Unfollow user
router.put('/unfollow-user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { currentUserId } = req.body
        if (currentUserId === id) {
            res.status(403).json("action forbidden")
        } else {
            const followUser = await User.findById(id)
            const followingUser = await User.findById(currentUserId)
            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } })
                await followingUser.updateOne({ $pull: { following: id } })
                res.status(200).json("user Unfollowed")
            } else {
                res.status(403).json("User is not followed by you")
            }
        }

    } catch (error) {
        res.status(500).json(error)

    }
})






module.exports = router;