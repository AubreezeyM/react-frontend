import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router";

const LogoutButton = () => {
    const navigate = useNavigate();
    const logoutCallback = () => {
        try {
            localStorage.setItem(REFRESH_TOKEN, '');
            localStorage.setItem(ACCESS_TOKEN, '');
        } catch (error) {
            console.log(`Logout error: ${error}`)
        }
    }

    return (
        <button
            type="button"
            onClick={() => {
                logoutCallback();
                navigate('/');
            }}>
            Logout
        </button >
    )

}

export default LogoutButton;