import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AuthLayout } from "../../components/layouts/AuthLayout";
import { Input } from "../../components/Inputs/Input"

import { validateEmail } from "../../utils/helper";

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        if(!validateEmail(email)) {
            setError("Por favor, insira um endereço de email válido.")
            return
        }

        if(!password) {
            setError("Por favor, digite a senha.")
            return
        }

        setError("")
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Bem-vindo de volta</h3>
                <p className="text-sm text-slate-700 mt-1 mb-6 ">Por favor insira seus dados para fazer login</p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email"
                        placeholder="john@example.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Senha"
                        placeholder="Min 8 caracteres"
                        type="password"
                    />

                    {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">LOGIN</button>

                    <p className="text-sm text-slate-800 mt-3">
                        Ainda não tem uma conta?{" "}
                        <Link className="font-medium text-primary underline" to="/signup">
                            Cadastre-se
                        </Link>
                    </p>

                </form>
            </div>
        </AuthLayout>
    )
}