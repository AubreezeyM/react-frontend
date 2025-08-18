import { Link } from "react-router"

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <ul className="navbar-ul">
                <li className="navbar-item"><Link to='/'>Home</Link></li>
                <li className="navbar-item"><Link to='/login'>Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;