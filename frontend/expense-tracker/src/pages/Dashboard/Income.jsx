import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { IncomeOverview } from "../../components/Income/IncomeOverview";
import { AddIncomeForm } from "../../components/Income/AddIncomeForm";

import { Modal } from "../../components/Modal";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export function Income() {
    const [incomeData, setIncomeData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null })
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

    async function fetchIncomeDetails() {
        if(loading) return

        setLoading(true)

        try {
            const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)

            if(response.data) {
                setIncomeData(response.data)
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleAddIncome(income) {}

    async function deleteIncome(id) {}

    async function handleDownloadIncomeDetails() {}

    useEffect(() => {
        fetchIncomeDetails()

        return () => {}
    }, [])

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>
                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Modal>
            </div>
        </DashboardLayout>
    )
}