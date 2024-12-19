import React, {useEffect, useState} from 'react';
import '../styles/tailwind.css'
import Sidebar from "../components/SideBar.jsx";
import axios from "axios";

function Dashboard() {

    const[employeeCount,setEmployeeCount]=useState(0);
    const[departmentCount,setDepartmentCount]=useState(0);


    useEffect(()=>{
        const fetchEmployeeCount=async()=>{
            try{
                const response=await axios.get("http://localhost:5000/api/employees");
                setEmployeeCount(response.data.length)
            }catch (error){
                console.error("error fetching employeeCount",error)
            }

        };
        fetchEmployeeCount()
    },[]);

    useEffect(()=>{
        const fetchDepartmentCount=async()=>{
            try{
                const response=await axios.get("http://localhost:5000/api/employees");
                setDepartmentCount(response.data.length);
            }catch (error){
                console.error("error fetching departmentCount",error)
            }
        }
    })

    return (

    <>
        <Sidebar/>

        <div>
            <p>Total employe count : {employeeCount}</p>
            <p>Total department count : {departmentCount}</p>
        </div>

    </>
    );
}

export default Dashboard;