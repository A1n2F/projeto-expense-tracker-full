const xlsx = require("xlsx")
const Expense = require("../models/Expense")


exports.addExpense = async (request, response) => {
    const userId = request.user.id

    try {
        const { icon, category, amount, date } = request.body

        if(!category || !amount || !date) {
            return response.status(400).json({ message: "All fields are required" })
        }

        const newExpense = new Expense({
            userId, 
            icon,
            category,
            amount,
            date: new Date(date)
        })

        await newExpense.save()
        response.status(200).json(newExpense)
    } catch (error) {
        response.status(500).json({ message: "Server Error" })
    }
}

exports.getAllExpense = async (request, response) => {
    const userId = request.user.id

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 })

        response.json(expense)
    } catch (error) {
        response.status(500).json({ message: "Server Error" })
    }
}

exports.deleteExpense = async (request, response) => {
    try {
        await Expense.findByIdAndDelete(request.params.id)
        
        response.json({ message: "Expense deleted successfully" })
    } catch (error) {
        response.status(500).json({ message: "Server Error" })
    }
}

exports.downloadExpenseExcel = async (request, response) => {
    const userId = request.user.id

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 })

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)

        xlsx.utils.book_append_sheet(wb, ws, "Expense")
        xlsx.writeFile(wb, 'expense_details.xlsx')
        
        response.download('expense_details.xlsx')
    } catch (error) {
        response.status(500).json({ message: "Server Error" })
    }
}
