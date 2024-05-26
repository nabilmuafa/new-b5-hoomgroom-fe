'use client';
import Button from "./Button";
import { useContext } from "react";
import { AuthContext } from "../../../auth-provider";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import InputSearch from "./InputSearch";

const Navbar = () => {
    const context = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = context.isAuthenticated
    const username = context.username[0]
    const role = context.role[0]
    const router = useRouter();
    return (
        <header className="sticky top-0 z-10 border-b">
            <div className="flex items-center justify-between px-8 max-w-screen-2xl mx-auto">
                <div className="text-emerald-500 items-center py-6">
                    <p className="font-bold text-xl">
                        <a href="/">HoomGroom</a>
                    </p>
                </div>
                <div className="">
                    <nav className="flex items-center gap-8 font-medium">
                        <Button value="Home" href="/" />
                        <Button value="Products" href="/product"/>
                        {(isAuthenticated && role === "ADMIN") ? <Dropdown /> : null}
                    </nav>
                </div>
                <div className="auth">
                    <RightSideNavbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username} role={role} router={router} />
                </div>
            </div>
        </header>
    );
}

const RightSideNavbar = ({ isAuthenticated, setIsAuthenticated, username, role, router }) => {
    async function handleLogout(e) {
        e.preventDefault();
    
        const res = await fetch('/api/auth/logout', {
            method: 'GET',
        });
    
        if (res.ok) {
            localStorage.removeItem("token")
            setIsAuthenticated(false)
            router.push('/');
        }
        else {
            console.error("Log out failed")
        }
    }

    if (!isAuthenticated) {
        return (
            <nav className="flex items-center gap-8 font-medium">
                <InputSearch />
                <Button value="Sign In" href="/auth/login" />
                <Button value="Register" href="/auth/register" />
            </nav>  
        )
    } else {
        return (
            <div className="flex items-center gap-2">
                <InputSearch />
                <a href="/cart" className="hover:text-emerald-500 duration-100 pr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </a>
                <div className="text-right">
                    <p className="text-sm">{username}</p>
                    <p className="text-xs">{role}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <button onClick={handleLogout} className="hover:text-red-500 duration-100 pl-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                </button>
            </div>
        )
    }
}

export default Navbar;