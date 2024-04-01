import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Logout() {
    const [user, setUser] = useState<string | null>(null);
    const loggedInUser = localStorage.getItem('user');
    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser]);
  
    const navigate = useNavigate();
    function handleLogout(){
        setUser(null)
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiration');
        navigate("/signIn");
    };

    return (
        <>
            {!user && ( 
                <div className="navbar">
                    <NavLink to='signIn' className={"navbar-item"}>
                        Log In
                    </NavLink>
                    <NavLink to='signUp' className={"navbar-item"}>
                        Sign Up
                    </NavLink>
                </div>
            )}
            {user && (
                <div className="navbar">
                    <div className="">
                        <span>{user}, do you want to: </span>
                        <button onClick={handleLogout}>Log Out</button>
                        <span> ?</span>
                    </div>
                </div>
            )}
        </>
    );
}