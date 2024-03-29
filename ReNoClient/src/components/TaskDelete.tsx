import {
    Params,
    redirect,
    Form, 
    useLocation, 
    Link,
    useActionData
} from "react-router-dom"
import { deleteTask } from "../api";
import { requireAuth } from "../utils";
import { ServerErrorResponse } from "../interfaces";
import ActionDataError from "./ActionDataError";

export async function loader({ request, params}: { request: Request, params: Params }) {
    await requireAuth(request);
    const id = parseInt(params.id || '');
    return id;
}

export async function action({ params, request }: { params:Params, request: Request }) {
    const deleteTaskFormData = await request.formData()
    const search = (deleteTaskFormData.get('search') ?? '') as string;
    const pathname = (deleteTaskFormData.get('pathname') ?? '') as string;
    const id = parseInt(params.id || '');
    try {
        await deleteTask(id)
        return redirect(`${pathname + search}`
        )
    } catch(err) {
        return err;
    };
}

export default function TaskDelete() {
    const { 
        pathname,
        search = '', 
        genre_type
    } = (useLocation().state || {});
    const actionDataError = useActionData() as ServerErrorResponse;
   
    return (
        <div className="">
            <h3>Do you really want to delete this task?</h3>
            <div className="" >
                <Form method="delete">
                    <input hidden name='search' defaultValue={search} />
                    <input hidden name='pathname' defaultValue={pathname} />
                    <button type="submit" className="">Yes</button>
                </Form>
                <button className="">
                    <Link 
                        to=".." 
                        relative='path' 
                        state={{pathname, search, genre_type}}>
                        No
                    </Link>
                </button>
            </div>
            <div>
              {actionDataError && (
                <ActionDataError error={actionDataError}/>
                )}  
            </div>
        </div>
    );
}