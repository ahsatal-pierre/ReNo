import { Link } from "react-router-dom";

export async function loader() {
    return null;
}
  
export default function Home() {
    return (
        <div className=" ">
            <h2 className="">Welcome to my React Node template</h2>

            <div className="">
                <h3 className="">Create a task list</h3>
                <Link className="" to="/tasks">
                Link to My tasks &rarr;
                </Link>
            </div>
        </div>
    );
}