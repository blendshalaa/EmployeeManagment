import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import DepartmentCard from "../components/DepartmentCard.jsx";
import DepartmentForm from "../components/DepartmentForm.jsx";
import SearchFilter from "../components/SearchFilter.jsx";



function Departments() {

    const[departments,setDepartments]=useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
  const[newDepartment,setNewDepartment]=useState({
      name:"",
      description:"",
      managed_by:"",
      location:""
  });
  const[editMode,setEditMode]=useState(false);
  const[currentDepartment,setCurrentDepartment]=useState(null);



    useEffect(() => {
        const fetchDepartments=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/departments');
                console.log(response.data)
                setDepartments(response.data);
                setFilteredDepartments(response.data);
            }catch (error) {
                console.error("error fetching data", error)

            }
        };

      fetchDepartments();
    }, []);


    const handleFilteredData = (filteredData) => {
        setFilteredDepartments(filteredData);
    };


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


    //handleeedit

    const handleEditClick = (department) => {
        setEditMode(true);
        setCurrentDepartment(department);
        setNewDepartment({
            name: department.name,
            description: department.description,
            managed_by: department.managed_by,
            location: department.location,
        });
    };

    const handleEditSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.put(`http://localhost:5000/api/departments/${currentDepartment.department_id}`,newDepartment);
          setDepartments(departments.map(department=>(department.department_id===currentDepartment.department_id? response.data:department)));
          setEditMode(false)
            setNewDepartment({
                name: "",
                description: "",
                managed_by: "",
                location: "",
            });
          window.alert("department edited")
          setCurrentDepartment(null)
        }catch (error){
            console.error("error editing the department",error)

        }
    }



//Delete
    const handleDelete=async(department_id)=>{
        try{
            const acceptDelete=window.confirm("are you sure ?");
            if(acceptDelete){
                await axios.delete(`http://localhost:5000/api/departments/${department_id}`);
               setDepartments(departments.filter(department=>department.department_id!==department_id))
            }
        }catch(error){
            console.log("error deleting departments",error)
        }
    }




    return (
        <div>
            <Navbar/>
            <div className="pt-24 pl-4 pr-4 md:pl-24 md:pr-24">
                <div>
                    <SearchFilter
                        data={departments}
                        filterKey="name"
                        onFilteredData={handleFilteredData}
                    />
                </div>


                <DepartmentForm
                    newDepartment={newDepartment}
                    handleSubmit={editMode ? handleEditSubmit : handleSubmit}
                    handleInputChange={handleInputChange}
                    editMode={editMode}
                />


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDepartments.map((department) => (
                        <DepartmentCard key={department.id} department={department} handleDelete={handleDelete} handleEditClick={handleEditClick}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Departments;