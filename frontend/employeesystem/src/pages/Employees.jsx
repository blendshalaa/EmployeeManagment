import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import {data} from "autoprefixer";
import EmployeeCard from "../components/EmployeeCard.jsx";
import EmployeeForm from "../components/EmployeeForm.jsx";
import SearchFilter from "../components/SearchFilter.jsx";

function Employees() {
    const[employees,setEmployees]=useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const[newEmployee,setNewEmployee]=useState({
        name:"",
        email:"",
        department_id:"",
        hire_date:"",
        role:""

    });
    const[editMode,setEditMode]=useState(false);
    const[currentEmployee,setCurrentEmployee]=useState(null);



    useEffect(()=>{
        const fetchEmployees=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/employees');
                console.log(response.data)
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            }catch(error){
                console.error("error fetching data",data)
            }
        };
        fetchEmployees();
    },[]);




    const handleFilteredData = (filteredData) => {
        setFilteredEmployees(filteredData);
    };

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

    const handleEditClick=(employee)=>{
        setEditMode(true);
        setCurrentEmployee(employee);
        setNewEmployee({
            name:employee.name,
            email:employee.email,
            department_id:employee.department_id,
            hire_date:employee.hire_date,
            role:employee.role
        })
    };


    const handleEditSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.put(`http://localhost:5000/api/employees/${currentEmployee.employee_id}`,newEmployee);
            setEmployees(employees.map(employee=>(employee.employee_id===currentEmployee.employee_id?response.data:employee)));
            setEditMode(false);
            setNewEmployee({
                name:"",
                email:"",
                department_id:"",
                hire_date:"",
                role:""
            });
            window.alert("employee edited")
            setCurrentEmployee(null);
        }catch(error){
            console.error("error editing employee data",error)
        }
    }




    const handleDelete=async(employee_id)=>{
        try{
            const acceptDelete=window.confirm("are you sure you want to delete");
            if(acceptDelete){
             await axios.delete(`http://localhost:5000/api/employees/${employee_id}`);
                setEmployees(employees.filter(employee=>employee.employee_id!==employee_id))
            }
        }catch (error){
            console.error("error deleting",error);
        }
    };







    return (
        <div>
            <Navbar/>
            <div className="pt-24 pl-4 pr-4 md:pl-24 md:pr-24">
                <div>
                    <SearchFilter
                        data={employees}
                        filterKey="employee_name" //
                        onFilteredData={handleFilteredData}
                    />
                </div>
              <EmployeeForm newEmployee={newEmployee}
                            handleSubmit={editMode ? handleEditSubmit : handleSubmit}
                            handleInputChange={handleInputChange}
                            editMode={editMode}

                            />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmployees.map((employee) => (
                        <EmployeeCard key={employee.employee_id} employee={employee} handleDelete={handleDelete} handleEditClick={handleEditClick}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Employees;