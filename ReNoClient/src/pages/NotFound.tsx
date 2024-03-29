import { Link } from "react-router-dom";
export default function NotFound() {

    return (
        <div className=" ">
            <h3>Sorry, the page you were looking for was not found!</h3>
            <button className="">
                <Link to='/'>Return Home</Link>
            </button>
            
        </div>
    );
}