import { useEffect, useState } from "react";
import { CustomPieChart } from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"]

export function RecentIncomeWithChart({data, totalIncome}) {
    const [chartData, setChartData] = useState([])

    const balanceIncome = [
        { name: "Total Income", amount: totalIncome }
    ]

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }))

        setChartData(dataArr)
    }

    useEffect(() => {
        prepareChartData()

        return () => {}
    }, [data])

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={balanceIncome}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    )
}