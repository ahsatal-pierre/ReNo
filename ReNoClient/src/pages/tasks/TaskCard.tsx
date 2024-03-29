import { 
    Link, 
    useLocation, 
    useLoaderData, 
    Params 
} from "react-router-dom";
import { getTasksById } from '../../api'
import { requireAuth } from "../../utils";
import { TaskData } from "../../interfaces";

export async function loader({ request, params }: { request: Request, params: Params }) {
    await requireAuth(request);
    const id = parseInt(params.id ?? '');
    return getTasksById(id);
}

export default function TaskCard() {
    const { 
        pathname,
        search = ''
    } = (useLocation().state || {});

    const { 
        title,
        overview,
        done = null
    } = useLoaderData() as TaskData;
   
    return (
        <div className=" ">
            <div className="">
                <Link
                    to={`${pathname + search}`} 
                    relative='path'
                >
                    &larr; Back to tasks
                </Link>
                <div className="">
                    <Link 
                        className="" 
                        to="edit" 
                        state={{ pathname, search}}
                    >
                        Edit
                    </Link>
                    <Link 
                        className="" 
                        to="" 
                        state={{ pathname, search}}
                    >
                        Delete
                    </Link>
                </div>
            </div>
            <div className="">

                <div className="" >
                    <h2>{title}</h2>
                    <p>{overview}</p>
                </div>
            </div>
        </div>
    )
}