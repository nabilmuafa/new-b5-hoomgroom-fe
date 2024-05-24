import Button from "./Button";

const Navbar = () => {
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
                        <Button value="Products" href="#" />
                    </nav>
                </div>
                <div className="auth">
                    <nav className="flex items-center gap-8 font-medium">
                        <Button value="Sign In" href="/auth/login" />
                        <Button value="Register" href="/auth/register" />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Navbar;