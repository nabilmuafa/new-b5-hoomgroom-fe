'use client';
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

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            router.push('/');
        }
        else {
            console.error("Login failed")
        }
    }

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-[0_0_100px_0_rgba(0,0,0,0.16)] px-12 pb-8">
            <p className="text-center py-8 text-2xl font-bold">Log in to <span className="text-emerald-500">HoomGroom</span></p>
            <form method="POST" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-7 text-black">
                    <div>
                        <p className="font-bold mb-2">Username</p>
                        <input onChange={(e) => setUsername(e.target.value)} id="id_username" name="username" className="w-full rounded-lg px-4 py-3 border border-gray-400" type="text" value={username} placeholder="Username" />
                        <p className="absolute text-xs text-red-500 pt-1" id="username-msg"></p>
                    </div>
                    <div>
                        <p className="font-bold mb-2">Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} id="id_password" name="password" className="w-full rounded-lg px-4 py-3 border border-gray-400" type="password" value={password} placeholder="Password" required />
                        <p className="absolute text-xs text-red-500 pt-1" id="password-msg"></p>
                    </div>
                    <button type="submit" className="mt-5 w-full rounded-md font-bold text-white bg-emerald-500 px-12 py-4 hover:bg-emerald-600 hover:text-white duration-200">Log in</button>
                </div>
            </form>
            <p className="text-sm text-center pt-8">Don't have an account? <Link href="/auth/register" className="text-emerald-600 hover:text-emerald-700">Create one.</Link></p>
        </div>
    )
}

export default Page;