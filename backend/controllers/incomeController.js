const xlsx = require("xlsx")
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

exports.getAllIncome = async (request, response) => {
    const userId = request.user.id

    try {
        const income = await Income.find({ userId }).sort({ date: -1 })

        response.json(income)
    } catch (error) {
        response.status(500).json({ message: "Server Error" })
    }
}

exports.deleteIncome = async (request, response) => {
    try {
        await Income.findByIdAndDelete(request.params.id)
        
        response.json({ message: "Income deleted successfully" })
    } catch (error) {
        response.status(500).json({ message: "Server Error" })
    }
}

exports.downloadIncomeExcel = async (request, response) => {
    const userId = request.user.id

    try {
        const income = await Income.find({ userId }).sort({ date: -1 })

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)

        xlsx.utils.book_append_sheet(wb, ws, "Income")
        xlsx.writeFile(wb, 'income_details.xlsx')
        
        response.download('income_details.xlsx')
    } catch (error) {
        response.status(500).json({ message: "Server Error" })
    }
}
