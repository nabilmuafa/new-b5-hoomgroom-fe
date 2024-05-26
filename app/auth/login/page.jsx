"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../auth-provider";

import Link from "next/link";
import { extractDetails } from "../../utils/jwtUtil";

const Page = () => {
    return (
        <div className="bg-white mx-auto">
            <p className="text-emerald-500 text-5xl font-extrabold text-center pt-16">HoomGroom</p>
            <p className="text-center text pb-12">By B05</p>
            <LoginForm />
        </div>
    )
}

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const context = useContext(AuthContext)
    const [isAuthenticated, setIsAuthenticated] = context.isAuthenticated
    const setContextUsername = context.username[1];
    const [role, setRole] = context.role
    const [loginErrorMsg, setLoginErrorMsg] = useState("");
    const [loginIsLoading, setLoginIsLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        setLoginIsLoading(true);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: (JSON.stringify({
                "username":username,
                "password":password 
            })),
        })

        if (res.ok) {
            const data = await res.json()
            localStorage.setItem("token", data.token)
            setIsAuthenticated(true);
            setContextUsername(username);
            setRole(extractDetails(data.token).role);
            router.push("/");
        }
        else {
            setLoginErrorMsg("Login failed. Make sure you inputted the correct credentials.")
            setLoginIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-[0_0_100px_0_rgba(0,0,0,0.16)] px-12 pb-8">
            <p className="text-center py-8 text-2xl font-bold">Log in to <span className="text-emerald-500">HoomGroom</span></p>
            <form method="POST" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-7 text-black">
                    <div>
                        <p className="text-sm font-bold mb-2">Username</p>
                        <input onChange={(e) => setUsername(e.target.value)} id="id_username" name="username" className="w-full rounded-lg px-4 py-3 border border-gray-400" type="text" value={username} placeholder="Username" />
                    </div>
                    <div>
                        <p className="text-sm font-bold mb-2">Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} id="id_password" name="password" className="w-full rounded-lg px-4 py-3 border border-gray-400" type="password" value={password} placeholder="Password" required />
                    </div>
                    <LoginButtonAndMessage loginIsLoading={loginIsLoading} loginErrorMsg={loginErrorMsg} />
                </div>
            </form>
            <p className="text-sm text-center pt-8">Don&#39;t have an account? <Link href="/auth/register" className="text-emerald-600 hover:text-emerald-700">Create one.</Link></p>
        </div>
    )
}

const LoginButtonAndMessage = ({ loginIsLoading, loginErrorMsg }) => {
    return (
        <div className="mt-2">
            <p className="text-center text-sm font-medium text-red-500">{loginErrorMsg}</p>
            <button disabled={loginIsLoading} type="submit" className={`flex items-center justify-center w-full rounded-md font-bold text-white ${loginIsLoading ? "bg-slate-400" : "bg-emerald-500 hover:bg-emerald-600 hover:text-white"} px-12 py-4 duration-200 mt-2`}>
                <svg aria-hidden="true" className={`${!loginIsLoading ? "hidden" : null} w-5 h-5 text-gray-100 animate-spin fill-emerald-500`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="pl-2">Log in</span>
            </button>
        </div>
    )
}

export default Page;