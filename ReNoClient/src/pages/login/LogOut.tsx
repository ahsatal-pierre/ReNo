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
                <div className="">
                    <NavLink to='signIn'>
                        Log In
                    </NavLink>
                    <NavLink to='signUp'>
                        Sign Up
                    </NavLink>
                </div>
            )}
            {user && (
                <div className="">
                    <div className="">
                        {user.charAt(0).toUpperCase()}
                    </div>
                    <div className="">
                        <span>{user}</span>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            )}
        </>
    );
}