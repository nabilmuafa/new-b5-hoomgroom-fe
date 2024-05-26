"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

const Page = () => {
    return (
        <div className="bg-white mx-auto">
            <RegisterForm />
        </div>
    )
}

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [sex, setSex] = useState("");
    const [registerRole, setRegisterRole] = useState("");
    const [fullName, setFullName] = useState("");

    const [registerErrorMsg, setRegisterErrorMsg] = useState("");
    const [registerIsLoading, setRegisterIsLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        setRegisterIsLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: (JSON.stringify({
                "username":username,
                "password":password,
                "birthDate": birthDate,
                "email": email,
                "sex": sex,
                "fullName": fullName,
                "role": registerRole
            })),
        })

        if (res.ok) {            
            router.push("/auth/login");
        }
        else {
            const msg = await res.json();
            console.log(msg);
            setRegisterErrorMsg("Register failed. Check your input fields for invalid values.")
            setRegisterIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-[0_0_100px_0_rgba(0,0,0,0.16)] px-12 pb-8 mt-12">
            <p className="text-center py-8 text-2xl font-bold">Register to <span className="text-emerald-500">HoomGroom</span></p>
            <form method="POST" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-4 text-black">
                    <div>
                        <p className="text-sm font-bold mb-2">Username</p>
                        <input onChange={(e) => setUsername(e.target.value)} id="id_username" name="username" className="w-full rounded-lg px-3 py-2 border border-gray-400 text-sm" type="text" value={username} placeholder="Username" />
                    </div>
                    <div>
                        <p className="text-sm font-bold mb-2">Full Name</p>
                        <input onChange={(e) => setFullName(e.target.value)} id="id_fullName" name="fullName" className="w-full rounded-lg px-3 py-2 border border-gray-400 text-sm" type="text" value={fullName} placeholder="John Doe" />
                    </div>
                    <div>
                        <p className="text-sm font-bold mb-2">Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} id="id_email" name="email" className="w-full rounded-lg px-3 py-2 border border-gray-400 text-sm" type="text" value={email} placeholder="john@mail.co" />
                    </div>
                    <div>
                        <p className="text-sm font-bold mb-2">Date of Birth<span className="font-normal"> (format: YYYY-MM-DD)</span></p>
                        <input onChange={(e) => setBirthDate(e.target.value)} id="id_birthDate" name="birthDate" className="w-full rounded-lg px-3 py-2 border border-gray-400 text-sm" type="text" value={birthDate} placeholder="YYYY-MM-DD" />
                    </div>
                    <div className="flex gap-x-4">
                        <div className="flex-1 flex-grow">
                            <p className="text-sm font-bold mb-2">Sex</p>
                            <select value={sex} onChange={(e) => {setSex(e.target.value)}} id="id_sex" name="sex" className="w-full rounded-lg px-3 py-2 border border-gray-400 text-sm">
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                        </div>
                        <div className="flex-1 flex-grow">
                        <p className="text-sm font-bold mb-2">Role</p>
                            <select value={registerRole} onChange={(e) => setRegisterRole(e.target.value)} id="id_role" name="role" className="w-full rounded-lg px-3 py-2 border border-gray-400 text-sm">
                                <option value="ADMIN">Admin</option>
                                <option value="USER">User</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-bold mb-2">Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} id="id_password" name="password" className="w-full rounded-lg px-3 py-2 border border-gray-400 text-sm" type="password" value={password} placeholder="Password" required />
                    </div>
                    <RegisterButtonAndMessage registerIsLoading={registerIsLoading} registerErrorMsg={registerErrorMsg} />
                </div>
            </form>
            <p className="text-sm text-center pt-4">Already have an account? <Link href="/auth/login" className="text-emerald-600 hover:text-emerald-700">Log in.</Link></p>
        </div>
    )
}

const RegisterButtonAndMessage = ({ registerIsLoading, registerErrorMsg }) => {
    return (
        <div className="mt-2">
            <p className="text-center text-sm font-medium text-red-500">{registerErrorMsg}</p>
            <button disabled={registerIsLoading} type="submit" className={`flex items-center justify-center w-full rounded-md font-bold text-white ${registerIsLoading ? "bg-slate-400" : "bg-emerald-500 hover:bg-emerald-600 hover:text-white"} px-12 py-4 duration-200 mt-2`}>
                <svg aria-hidden="true" className={`${!registerIsLoading ? "hidden" : null} w-5 h-5 text-gray-100 animate-spin fill-emerald-500`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="pl-2">Register</span>
            </button>
        </div>
    )
}

export default Page;