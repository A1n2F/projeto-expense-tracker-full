const User = require("../models/User")
const jwt = require("jsonwebtoken")

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h"})
}

exports.registerUser = async (request, response) => {
    const { fullName, email, password, profileImageUrl } = request.body

    if(!fullName || !email || !password) {
        return response.status(500).json({ message: "All fields are required" })
    }

    try {
        const existingUser = await User.findOne({ email })

        if(existingUser) {
            return response.status(400).json({ message: "Email already in use" })
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        })

        response.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (error) {
        response.status(500).json({ message: "Error registering user", error: error.message })
    }
}

exports.loginUser = async (request, response) => {
    const { email, password } = request.body

    if(!email || !password) {
        return response.status(400).json({ message: "All fields are required" })
    }

    try {
        const user = await User.findOne({ email })

        if(!user || !(await user.comparePassword(password))) {
            return response.status(400).json({ message: "Invalid credentials" })
        }

        response.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (error) {
        response.status(500).json({ message: "Error registering user", error: error.message })
    }
}

exports.getUserInfo = async (request, response) => {
    try {
        const user = await User.findById(request.user.id).select("-password")

        if(!user) {
            return response.status(400).json({ message: "User not found" })
        }

        response.status(200).json(user)
    } catch (error) {
        response.status(500).json({ message: "Error registering user", error: error.message })
    }
}