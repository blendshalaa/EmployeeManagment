import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
function Departments() {

    const[departments,setDepartments]=useState([]);
  const[newDepartment,setNewDepartment]=useState({
      name:"",
      description:"",
      managed_by:""
  })


    useEffect(() => {
        const fetchDepartments=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/departments');
                console.log(response.data)
                setDepartments(response.data)
            }catch (error) {
                console.error("error fetching data", error)

            }
        };

      fetchDepartments();
    }, []);


    //create a department


    const handleSubmit=async(e)=>{
        try{
            const response=await axios.post("http://localhost:5000/api/departments",newDepartment);
            setDepartments([...departments,response.data]);
            setNewDepartment({
                name:"",
                description:"",
                managed_by:""
            })

        }catch (error){
            console.error("error creating department",error)
        }
    }


    const handleInputChange=(e)=>{
        setNewDepartment({
            ...newDepartment,
            [e.target.name]:e.target.value
        });
    };



    return (
        <div>
            <Navbar />
            <div className="pt-20 p-4">
                {departments.length === 0 ? (
                    <p>No departments to display</p>
                ) : (
                    <ul>
                        {departments.map(department => (
                            <li key={department.department_id}>
                                <div>{department.name}</div>
                                <div>{department.description}</div>
                                <div>{department.managed_by}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Departments;