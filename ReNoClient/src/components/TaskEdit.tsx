import { 
    useLoaderData, 
    Form, 
    useLocation, 
    Link,
    redirect,
    useActionData,
    Params
} from "react-router-dom";
import { editTask, getTasksById } from "../api";
import { requireAuth } from "../utils";
import { TaskData, ServerErrorResponse } from "../interfaces";
import ActionDataError from "./ActionDataError";


export async function loader({ request, params }: { request: Request, params: Params}) {
    await requireAuth(request);
    const id = parseInt(params.id || '');
    return getTasksById(id);
}

export async function action({ request, params}: { request: Request, params: Params}) {
    const id = parseInt(params.id || '') as number;
    const editTaskFormData = await request.formData()
    const title = (editTaskFormData.get('title') ?? '') as string;
    const overview = (editTaskFormData.get('overview') ?? '') as string;
    const done = (editTaskFormData.get('done') ?? '') as unknown as boolean;
    const search = (editTaskFormData.get('search') ?? '') as string;
    const pathname = (editTaskFormData.get('pathname') ?? '') as string;
    
   try {
       await editTask(
        id, 
        {
            title, 
            overview, 
            done
        });
    return redirect(`${ pathname + search }`)
   } catch(err) {
    return { error: err, pathname, search }
   };
}

export default function TaskEdit() {
    const { 
        title, 
        overview, 
        done
    } = useLoaderData() as TaskData;
   
    const actionData = useActionData() as {
        error: ServerErrorResponse, 
        pathname: string, 
        search: string
    };
    const actionDataError = actionData?.error;
    const { state } = useLocation();
    const search = ( state?.search || actionData?.search ) || '';
    const pathname = ( state?.pathname || actionData?.pathname ) || '';

 
    return(
        <div className="">
            <Link 
                to=".." 
                relative='path' 
                state={{pathname, search}}
            >
                &larr; <span>Back </span>
            </Link>
            <div className="">
                <Form 
                    className="" 
                    replace  
                    method="patch"
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
                    // defaultValue={done}
                    />
                    <textarea  
                    name="overview"
                    placeholder="Description"
                    defaultValue={overview}
                    />
                    <input hidden name='search' defaultValue={search} />
                    <input hidden name='pathname' defaultValue={pathname} />
                    <button 
                        className="" 
                        type="submit"
                    >
                        edit
                    </button> 
                </Form>
                {actionDataError && (
                    <ActionDataError error={actionDataError}/>
                )}
            </div>
        </div>
    );
}