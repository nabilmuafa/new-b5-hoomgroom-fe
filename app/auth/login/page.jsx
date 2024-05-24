'use client';
import { useState } from "react";

const Page = () => {
    return (
        <div className="bg-white">
            Hello World!
            <LoginForm />
        </div>
    )
}

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            })

            if (!res.ok) {
                throw new Error('fail')
            }
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="max-w-sm mx-auto">
            <form method="POST" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-7 text-black">
                    <div>
                        <p className="text-sm font-bold mb-2">USERNAME</p>
                        <input onChange={(e) => setUsername(e.target.value)} id="id_username" name="username" className="w-full rounded-lg px-4 py-3 bg-gray-300" type="text" value={username} placeholder="Username" />
                        <p className="absolute text-xs text-red-500 pt-1" id="username-msg"></p>
                    </div>
                    <div>
                        <p className="text-sm font-bold mb-2">PASSWORD</p>
                        <input onChange={(e) => setPassword(e.target.value)} id="id_password" name="password" className="w-full rounded-lg px-4 py-3 bg-gray-300" type="password" value={password} placeholder="Password" required />
                        <p className="absolute text-xs text-red-500 pt-1" id="password-msg"></p>
                    </div>
                    <button type="submit" className="mt-5 w-full rounded-md font-bold text-black border border-black px-12 py-4 hover:bg-black hover:text-white duration-300">LOGIN</button>
                </div>
            </form>
        </div>
    )
}

export default Page