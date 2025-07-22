const User = require("../models/User")
const Income = require("../models/Income")

exports.addIncome = async (request, response) => {
    const userId = request.user.id

    try {
        const { icon, source, amount, date } = request.body

        if(!source || !amount || !date) {
            return response.status(400).json({ message: "All fields are required" })
        }

        const newIncome = new Income({
            userId, 
            icon,
            source,
            amount,
            date: new Date(date)
        })

        await newIncome.save()
        response.status(200).json(newIncome)
    } catch (error) {
        response.status(500).json({ message: "Server Error" })
    }
}

exports.getAllIncome = async (request, response) => {}

exports.deleteIncome = async (request, response) => {}

exports.downloadIncomeExcel = async (request, response) => {}
