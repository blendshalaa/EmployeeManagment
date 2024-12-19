const Department=require('../models/Department');


const createDepartment=async (req,res)=>{
    try{
        const newDepartment=await Department.createDep(req.body);
        res.status(200).json(newDepartment)
    }catch (error){
        console.error('Error creating department',error);
        res.status(500).json({message:"Error creating department",error})
    }
};

const getAllDepartments=async(req,res)=>{
    try{
        const departments=await Department.getAllDep();
        res.status(200).json(departments)
    }catch(error){
        console.error("error getting all departments",error);
        res.status(500).json({message:"error geting departments",error})
    }
};

const getAllDepartmentsById=async(req,res)=>{
    const {department_id}=req.params;
    try{
      const department=await Department.getAllDepId(department_id);
      if(!department_id){
          return res.json(404).json({message:"department not found"})
      }
      res.status(200).json(department)
    }catch (error){
        console.error("error getting department by id",error);
        res.status(500).json({message:"error geting dep by id",error})
    }
};


const updateDepartment=async(req,res)=>{
    const{department_id}=req.params;
    const{name,description,managed_by,location}=req.body;
    try{
        const updatedDep=await Department.updateDep(department_id,{
            name,
            description,
            managed_by,
            location
        });
        if(!updatedDep){
            return res.status(404).json({ message: "department not found" });
        }
        res.status(200).json(updatedDep)

    }catch(error){
        console.error("error updating department",error);
        res.status(500).json("error updating department",error)
    }
};


const deleteDepartment = async (req, res) => {
    const { department_id } = req.params;
    try {
        const deletedDep = await Department.deleteDep(department_id);
        if (!deletedDep) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json({
            message: "Department deleted successfully",
            deletedDep
        });
    } catch (error) {
        console.error("Error deleting department", error.message);
        res.status(500).json({ message: "Error deleting department" });
    }
};


module.exports={
    createDepartment,
    getAllDepartments,
    getAllDepartmentsById,
    updateDepartment,
    deleteDepartment
}


