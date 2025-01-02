
import './styles/tailwind.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import NotFound from "./components/NotFound.jsx";
import Departments from "./pages/Departments.jsx";
import Employees from "./pages/Employees.jsx";

import LogInPage from "./pages/LogInPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {

    const router=createBrowserRouter([

        {
            path:'/',
            element:<Dashboard/>,
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
