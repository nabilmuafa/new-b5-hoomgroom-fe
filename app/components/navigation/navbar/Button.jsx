import Link from "next/link";

const Button = ({ value, href}) => {
    return <Link className="hover:text-emerald-500 duration-100" href={href}>{value}</Link>
}

export default Button;