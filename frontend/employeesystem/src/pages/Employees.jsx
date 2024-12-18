import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import {data} from "autoprefixer";
import EmployeeCard from "../components/EmployeeCard.jsx";

function Employees() {
    const[employees,setEmployees]=useState([]);
    const[newEmployee,setNewEmployee]=useState({
        name:"",
        email:"",
        department_id:"",
        hire_date:"",
        role:""

    })

//fetch from db

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
    },[]);




    //create employee

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:5000/api/employees",newEmployee);
            setEmployees([...employees,response.data]);
            setNewEmployee({
                name:"",
                email:"",
                department_id:"",
                hire_date:"",
                role:""
            });
        }catch(error){
            console.error("error creating new employee",error);
        }
    }

    const handleInputChange=(e)=>{
        setNewEmployee({
            ...newEmployee,
            [e.target.name]:e.target.value
        });
    };




    return (
        <div>
            <Navbar/>
            <div className="pt-24 pl-4 pr-4 md:pl-24 md:pr-24"> {/* Add padding from the sides */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {employees.map((employee) => (
                        <EmployeeCard key={employee.employee_id} employee={employee}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Employees;