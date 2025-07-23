import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

import { AuthLayout } from "../../components/layouts/AuthLayout";
import { Input } from "../../components/Inputs/Input";  
import { ProfilePhotoSelector } from "../../components/Inputs/ProfilePhotoSelector";

import { UserContext } from "../../context/userContext";

export function SignUp() {
    const [profilePic, setProfilePic] = useState(null)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null)

    const { updateUser } = useContext(UserContext)

    const navigate = useNavigate()

    async function handleSignUp(e) {
        e.preventDefault()

        let profileImageUrl = ""

        if(!fullName) {
            setError("Por favor, digite seu nome")
            return
        }

        if(!validateEmail(email)) {
            setError("Por favor, digite um email válido")
            return
        }

        if(!password) {
            setError("Por favor, digite uma senha")
            return
        }

        setError("")

        try {
            if(profilePic) {
                const imgUploadRes = await uploadImage(profilePic)
                profileImageUrl = imgUploadRes.imageUrl || ""
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, { fullName, email, password, profileImageUrl })

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
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-black">Crie sua Conta</h3>
                <p className="text-sm text-slate-700 mt-[5px] mb-6">Junte-se a nós hoje, inserindo seus dados abaixo</p>

                <form onSubmit={handleSignUp}>

                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className="flex flex-col max-w-3xl gap-4">
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Nome Completo"
                            placeholder="John"
                            type="text"
                        />

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
                    </div>

                    {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary max-w-3xl">
                        CADASTRAR
                    </button>

                    <p className="text-sm text-slate-800 mt-3">
                        Já tem uma conta?{" "}
                        <Link className="font-medium text-primary underline" to="/login">
                            Logar
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}