import { NavLink } from "react-router-dom"
import Logout from "../pages/login/LogOut";

export default function Header() {

    return (
        <header className="navbar-brand" >    
            <nav>
                <NavLink 
                    to='/' 
                    className={({isActive}: {isActive: boolean}) => isActive ? "active" : "navbar-item"}
                >
                    Home
                </NavLink>
                <NavLink 
                    to='tasks' 
                    className={({isActive}: {isActive: boolean}) => isActive ? "active" : "navbar-item"}
                >
                   Tasks
                </NavLink>
                
            </nav>
            <div className="navbar-item">
            <Logout/>
            </div>   
        </header>
    );
}