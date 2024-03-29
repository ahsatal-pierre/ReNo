import { createTask } from "../api"
import { 
    Form, 
    redirect,
    useActionData, 
    useLocation, 
    Link 
} from "react-router-dom";
import { requireAuth } from "../utils";
import { ServerErrorResponse } from "../interfaces";
import ActionDataError from "./ActionDataError";

export async function loader({ request}: {request: Request}) {
    await requireAuth(request)
    return null
}

export async function action({ request }: {request: Request}) {
    const createTaskFormData = await request.formData()
    const title = (createTaskFormData.get('title') ?? '') as string;
    const overview = (createTaskFormData.get('overview') ?? '') as string;
    const done = (createTaskFormData.get('done') ?? '') as unknown as boolean; 
    const search = (createTaskFormData.get('search') ?? '') as string;
    const pathname = (createTaskFormData.get('pathname') ?? '') as string;
   
    try {
        await createTask({
            title, 
            overview, 
            done
        })
        return redirect(
            `${pathname + search }`
        )
    } catch(err) {
    return {error: err, pathname, search}
    };
}

export default function TaskCreate() {
    const actionData = useActionData() as {
        error: ServerErrorResponse, 
        pathname: string, 
        search: string
    };
    const actionDataError = actionData?.error;
    const { state } = useLocation();
    const { 
        title, 
        overview, 
        done
    } = state?.data || {};
    const search = ( state?.search || actionData?.search ) || '';
    const pathname = ( state?.pathname || actionData?.pathname ) || '';

    return(
        <div className="">
            <Link to={`${pathname + search}`}>&larr; Back</Link> 
            <div className="">
                <Form 
                    className="" 
                    replace 
                    method="post"  
                >
                    <input 
                    name="title"
                    type="text"
                    placeholder="Title"
                    defaultValue={title}
                    />
                    <input 
                    name="done"
                    type="text"
                    placeholder="is done or not"
                    defaultValue={done}
                    />
                    <input hidden name='search' defaultValue={search} />
                    <input hidden name='pathname' defaultValue={pathname} />
                    <button 
                        className="" 
                        type="submit"
                    >
                        Add
                    </button>
                </Form>
                {actionDataError && (
                    <ActionDataError error={actionDataError} />
                )}
            </div>
        </div>
    );
}