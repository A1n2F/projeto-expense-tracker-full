import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import { NavBar } from "./NavBar"
import { SideMenu } from "./SideMenu"

export function DashboardLayout({children, activeMenu}) {
    const { user } = useContext(UserContext)

    return (
        <div>
            <NavBar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    )
}