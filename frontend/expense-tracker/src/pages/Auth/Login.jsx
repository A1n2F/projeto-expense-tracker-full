import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import { AuthLayout } from "../../components/layouts/AuthLayout";
import { Input } from "../../components/Inputs/Input";

import { UserContext } from "../../context/userContext";

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const { updateUser } = useContext(UserContext)

    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        if(!validateEmail(email)) {
            setError("Por favor, insira um email válido")
            return
        }

        if (!password) {
            setError("Por favor, insira sua senha")
            return 
        }

        setError("")

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            })

            const { token, user } = response.data

            if(token) {
                localStorage.setItem("token", token)
                updateUser(user)
                navigate("/dashboard")
            }
        } catch (error) {
            if(error.response && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("Something went wrong. Please try again.")
            }
        }
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-black">Bem-vindo de volta</h3>
                <p className="text-sm text-slate-700 mt-[5px] mb-6">Por favor, insira seus dados para fazer login</p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target}) => setEmail(target.value)}
                        label="Email"
                        placeholder="john@email.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={({ target}) => setPassword(target.value)}
                        label="Senha"
                        placeholder="Min 8 caracteres"
                        type="password"
                    />

                    {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        LOGIN
                    </button>

                    <p className="text-sm text-slate-800 mt-3">
                        Ainda não tem uma conta?{" "}
                        <Link className="font-medium text-primary underline" to="/signup">
                            Cadastrar-se
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}