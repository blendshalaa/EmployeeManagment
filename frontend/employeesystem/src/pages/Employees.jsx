import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import {data} from "autoprefixer";

function Employees() {
    const[employees,setEmployees]=useState([]);

    useEffect(()=>{
        const fetchEmployees=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/employees');
                console.log(response.data)
                setEmployees(response.data);
            }catch(error){
                console.error("error fetching data",data)
            }
        };
        fetchEmployees();
    },[])
    return (
        <div>
            <Navbar/>
            <div className='pt-20 p-4'>
                <ul>
                    {employees.map(employee=>(
                        <li key={employee.employee_id}>
                            <div>{employee.name}</div>
                            <div>{employee.email}</div>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
    );
}

export default Employees;