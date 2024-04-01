import { Link } from "react-router-dom";

export async function loader() {
    return null;
}
  
export default function Home() {
    return (
        <div className=" ">

            <div className="">
                <Link className="" to="/tasks/create">Create a task</Link>
                <br />
                <Link className="" to="/tasks">
                Link to My tasks &rarr;
                </Link>
            </div>
        </div>
    );
}