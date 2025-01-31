
import './styles/tailwind.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import NotFound from "./components/NotFound.jsx";
import Departments from "./pages/Departments.jsx";
import Employees from "./pages/Employees.jsx";

import LogInPage from "./pages/LogInPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BenefitsPage from "./pages/BenefitsPage.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import AttendancePage from "./pages/AttendancePage.jsx";
import PerformanceReviewPage from "./pages/PerformanceReviewPage.jsx";

const queryClient = new QueryClient();

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
        {
            path:"/benefits",
            element:<BenefitsPage/>,
            errorElement:<NotFound/>
        },{
        path:'/attendance',
            element:<AttendancePage/>,
            errorElement:<NotFound/>
        },
        {
            path:'/performanceReview',
            element:<PerformanceReviewPage/>,
            errorElement:<NotFound/>
        }


    ])


  return (
    <>
<div>
    <QueryClientProvider client={queryClient}>
        <div>
            <RouterProvider router={router} />
        </div>
    </QueryClientProvider>
</div>
     </>
  )
}

export default App
