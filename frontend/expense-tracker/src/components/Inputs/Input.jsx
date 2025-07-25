import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

export function Input({ value, onChange, placeholder, label, type }) {
    const [showPassword, setShowPassword] = useState(false)

    function toggleShowPassword() {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <label className="text-sm text-slate-800">{label}</label>

            <div className="input-box">
                <input 
                    type={type == 'password' ? showPassword ? 'text' : 'password' : "type"}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                    value={value}
                    onChange={(e) => onChange(e)}
                />

                {type === "password" && (
                    <>
                        {showPassword ? (
                            <FaRegEye 
                                size={22} 
                                className="text-primary cursor-pointer" 
                                onClick={() => toggleShowPassword()}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className="text-slate-400 cursor-pointer"
                                onClick={() => toggleShowPassword()}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}