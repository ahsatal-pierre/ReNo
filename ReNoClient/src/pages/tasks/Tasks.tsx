import React, { Suspense } from "react";
import { Link, useSearchParams, useLoaderData, useLocation, Await } from "react-router-dom";
import { getTasks } from '../../api';
import { TaskData } from "../../interfaces";

export async function loader({ request }: { request: Request }) {
    const tasks = await getTasks();
    return { tasks };
}

export default function Tasks() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname } = useLocation();
    const tasksPromise = useLoaderData() as { tasks: TaskData[] };

    function handleFilterChange(key: string, value: string | null) {
        setSearchParams(prevParams => {
            value === null
                ? prevParams.delete(key)
                : prevParams.set(key, value);
            return prevParams;
        });
    }

    function renderTasks(tasks: TaskData[]) {
        const taskElements = tasks.map((task, i) => (
            <Link
                className=""
                key={task.id}
                to={`${task.id}`}
                state={{ pathname, search: `?${searchParams.toString()}` }}
            >
                <div className="">
                    <h4>{i + 1}.</h4>
                    <h4 className="">{task.title}</h4>
                    <span>{task.done ? "✔️" : "❌"}</span>
                </div>
            </Link>
        ));

        return (
            <>
                <Link
                    className=""
                    to="../create"
                    state={{ pathname, search: `?${searchParams.toString()}` }}
                >Create new</Link>
                <div className="">
                    {(searchParams.has('sort_title')) && (
                        <>
                            <button
                                className=""
                                onClick={() => handleFilterChange('sort_title', 'up')}
                            >
                                &#x2191;
                            </button>
                            <button
                                className=""
                                onClick={() => handleFilterChange('sort_title', 'down')}
                            >
                                &#x2193;
                            </button>
                        </>
                    )}
                    {searchParams.has('sort_title') && (
                        <button
                            className=""
                            onClick={() => {
                                handleFilterChange('sort_title', null);
                            }}
                        >
                            Clear filter
                        </button>
                    )}
                </div>
                <div className="">{taskElements}</div>
            </>
        );
    }

    return (
        <div className="">
            <h3>My Tasks List</h3>
            <Suspense fallback={<h2>Loading tasks...</h2>}>
                <Await resolve={tasksPromise.tasks}>
                    {renderTasks}
                </Await>
            </Suspense>
        </div>
    );
}
