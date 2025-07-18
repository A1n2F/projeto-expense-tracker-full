import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AuthLayout } from "../../components/layouts/AuthLayout";
import { Input } from "../../components/Inputs/Input"
import { ProfilePhotoSelector } from "../../components/Inputs/ProfilePhotoSelector";

import { validateEmail } from "../../utils/helper";

export function SignUp() {
    const [profilepic, setProfilePic] = useState(null)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    async function handleSignUp(e) {
        e.preventDefault()

        let profileImageUrl = ""

        if(!fullName) {
            setError("Por favor, digite seu nome")
            return
        }

        if(!validateEmail(email)) {
            setError("Por favor, insira um email válido")
            return
        }

        if(!password) {
            setError("Por favor, insira sua senha")
            return
        }

        setError("")
    }

    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Criar uma Conta</h3>
                <p className="text-md text-slate-700 mt-[5px] mb-10">Junte-se a nós hoje inserindo seus dados abaixo</p>

                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilepic} setImage={setProfilePic} />

                    <div className="lg:w-[70%] flex flex-col justify-center mt-10">
                        <Input 
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Nome Completo"
                            placeholder="John"
                            type="text"
                        />

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
                    </div>

                    {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
                    
                    <button type="submit" className="max-w-[70%] btn-primary">CADASTRAR</button>

                    <p className="text-sm text-slate-800 mt-3">
                        Já possui uma conta?{" "}
                        <Link className="font-medium text-primary underline" to="/login">
                            Logar
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}