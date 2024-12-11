
import './styles/tailwind.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./components/NotFound.jsx";
import Departments from "./pages/Departments.jsx";
import Employees from "./pages/Employees.jsx";
import LeaveRequests from "./pages/LeaveRequests.jsx";
import LogInPage from "./pages/LogInPage.jsx";

function App() {

    const router=createBrowserRouter([

        {
            path:'/',
            element:<HomePage/>,
            errorElement:<NotFound/>
        },
        {
            path:'/login',
            element:<LogInPage/>,
            errorElement:<NotFound/>
        },
        {
            path:"/departments",
            element:<Departments/>,
            errorElement:<NotFound/>
        },
        {
            path:"/employees",
            element:<Employees/>,
            errorElement:<NotFound/>
        },
        {
            path:"/leaveRequests",
            element:<LeaveRequests/>,
            errorElement:<NotFound/>
        }

    ])


  return (
    <>
<div>
    <RouterProvider router={router}/>
</div>
     </>
  )
}

export default App
