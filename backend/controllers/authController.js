const User = require("../models/User")
const jwt = require("jsonwebtoken")

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h"})
}

exports.registerUser = async (request, response) => {}

exports.loginUser = async (request, response) => {}

exports.getUserInfo = async (request, response) => {}