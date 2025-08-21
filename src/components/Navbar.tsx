import { Link } from "react-router"
import LogoutButton from "./LogoutButton";

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <ul className="navbar-ul">
                <li className="navbar-item"><Link to='/'>Home</Link></li>
                <li className="navbar-item"><Link to='/login'>Login</Link></li>
                <li className="navbar-logout"><LogoutButton /></li>
                <li className="navbar-item"><Link to='/user'>User</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;