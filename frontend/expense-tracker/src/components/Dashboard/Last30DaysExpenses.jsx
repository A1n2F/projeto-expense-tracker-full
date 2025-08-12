import { useEffect, useState } from "react"
import { prepareExpenseBarChartData } from "../../utils/helper"
import { CustomBarChart } from "../Charts/CustomBarChart"

export function Last30DaysExpenses({data, totalExpense}) {
    const [chartData, setChartData] = useState([])

    const balanceExpense = [
        { name: "Total Expense", amount: totalExpense },
    ]

    useEffect(() => {
        const result = prepareExpenseBarChartData(data)
        setChartData(result)

        return () => {}
    }, [data])

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart data={chartData} />
        </div>
    )
}