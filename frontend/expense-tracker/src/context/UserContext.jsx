import React, { createContext, useState } from "react"

export const UserContext = createContext()

export function UserProvider({children}) {
    const [user, setUser] = useState(null)

    function updateUser(userData) {
        setUser(userData)
    }

    function clearUser() {
        setUser(null)
    }

    return (
        <UserContext.Provider
            value={{ user, updateUser, clearUser }}
        >
            {children}
        </UserContext.Provider>
    )
}