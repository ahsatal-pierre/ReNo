import { NavLink } from "react-router-dom"
import Logout from "../pages/login/Logout";

export default function Header() {

    return (
        <header className=" ">
            <nav className="" >
                <NavLink 
                    to='/' 
                    className={({isActive}: {isActive: boolean}) => isActive ? "active" : ""}
                >
                    Home
                </NavLink>
                <NavLink 
                    to='tasks' 
                    className={({isActive}: {isActive: boolean}) => isActive ? "active" : ""}
                >
                   Tasks
                </NavLink>
            </nav>
            <Logout/>
        </header>
    );
}