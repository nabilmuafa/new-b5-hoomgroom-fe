const Button = ({ value, href}) => {
    return <a className="hover:text-emerald-500 duration-100" href={href}>{value}</a>
}

export default Button;