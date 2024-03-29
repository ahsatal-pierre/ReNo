// import { useState } from "react";
// import "./App.css";
// import Hello from "./Hello";
// import Home from "./pages/Home";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <Hello />
//       </div>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//       </div>
//       <Home />
//     </>
//   );
// }

// export default App;

import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements 
} from 'react-router-dom';
import Layout, { loader as layoutLoader} from './components/Layout';
import Home, { loader as homeLoader} from './pages/Home';
import SignIn, { loader as sigInLoader, action as sigInAction } from './pages/login/SignIn';
import SignUp, { action as signUpAction } from './pages/login/SignUp';
import Logout from './pages/login/LogOut';
import TasksLayout, { loader as tasksLayout } from './components/TasksLayout';
import Dashboard, {loader as dashboardLoader} from './components/Dashboard';
import Tasks, {loader as tasksLoader } from './pages/tasks/Tasks';
import TaskCard, { loader as taskCardLoader } from './pages/tasks/TaskCard';
import TaskCreate, { loader as taskCreateLoader, action as taskCreateAction } from './components/TaskCreate';
import TaskEdit, { loader as taskEditLoader, action as taskEditAction } from './components/TaskEdit';
import TaskDelete, { loader as taskDeleteLoader, action as taskDeleteAction } from './components/TaskDelete';
import NotFound from './pages/NotFound';
import Error from './components/Error';


const router = createBrowserRouter(createRoutesFromElements(
  <Route 
    path='/' 
    element={<Layout/>} 
    loader={layoutLoader} 
  >
    <Route 
      index 
      element={<Home/>}
      loader={homeLoader}
    />
    <Route 
      path='signin' 
      element={<SignIn/>} 
      loader={sigInLoader} 
      action={sigInAction} 
      errorElement={<Error/>} 
    />
    <Route 
      path='signup' 
      element={<SignUp/>} 
      action={signUpAction} 
      errorElement={<Error/>} 
    />
    <Route 
      path='logout' 
      element={<Logout/>}
    />
    <Route 
  path='tasks' 
  element={<TasksLayout/>} 
  loader={tasksLayout} 
>
  <Route 
    index 
    element={<Dashboard/>} 
    loader={dashboardLoader} 
    errorElement={<Error/>}
  />
  <Route 
    path='list' 
    element={<Tasks/>} 
    errorElement={<Error/>} 
    loader={tasksLoader}  
  />
      <Route 
        path='create'
        element={<TaskCreate/>} 
        loader={taskCreateLoader} 
        action={taskCreateAction} 
        errorElement={<Error/>}
      />
      <Route 
        path='list/:id' 
        element={<TasksLayout/>} 
        loader={tasksLayout}  
      >
        <Route 
          index 
          element={<TaskCard/>}
          loader={taskCardLoader}  
          errorElement={<Error/>}
        />
        <Route 
          path='edit' 
          element={<TaskEdit/>}
          loader={taskEditLoader} 
          action={taskEditAction}
          errorElement={<Error/>}  
        />
        <Route
          path='delete' 
          element={<TaskDelete/>}
          loader={taskDeleteLoader} 
          action={taskDeleteAction}
          errorElement={<Error/>} 
        />
      </Route>
    </Route>
    <Route path='*' element={<NotFound/>}/>
  </Route>
));

function App() {
  return (
     <RouterProvider router={router}/>
  );
}

export default App;
