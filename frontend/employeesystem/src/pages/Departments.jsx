import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import DepartmentCard from "../components/DepartmentCard.jsx";
import DepartmentForm from "../components/DepartmentForm.jsx";



function Departments() {

    const[departments,setDepartments]=useState([]);
  const[newDepartment,setNewDepartment]=useState({
      name:"",
      description:"",
      managed_by:"",
      location:""
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:5000/api/departments", {
                ...newDepartment,
                managed_by: newDepartment.managed_by || null,  // If managed_by is empty, set it to null
            });
            setDepartments([...departments, response.data]);


            setNewDepartment({
                name: "",
                description: "",
                managed_by: "",
                location: "",
            });

        } catch (error) {
            console.error("Error creating department", error);
        }
    };



    const handleInputChange=(e)=>{
        setNewDepartment({
            ...newDepartment,
            [e.target.name]:e.target.value
        });
    };





    return (
        <div>
            <Navbar/>
            <div className="pt-24 pl-4 pr-4 md:pl-24 md:pr-24">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Departments</h2>

                <DepartmentForm newDepartment={newDepartment} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.map((department) => (
                        <DepartmentCard key={department.id} department={department}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Departments;