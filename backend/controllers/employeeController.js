const Employee=require('../models/Employee');



const createEmployee=async(req,res)=>{

    try{
        const newEmployee=await Employee.createEmp(req.body);
        res.status(200).json(newEmployee)
    }catch(error){
        console.error("error creating employe",error);
        res.status(500).json({message:"error creating employee"})
    }
};

const getAllEmployees=async(req,res)=>{
    try{
        const getEmployee=await Employee.getAllEmp();
        res.status(200).json(getEmployee)
    }catch(error){
        console.error("error getting all  employe",error);
        res.status(500).json({message:"error getting all employee"})
    }
};

const getEmployeesId=async(req,res)=>{
  const {employee_id}=req.params;
  try{
      const employeeId=await Employee.getEmpById(employee_id);
      if(!employeeId){
          res.status(404).json({message:"Employee does not exist"})
      }
      res.status(200).json(employeeId)
  }catch(error){
      console.error("error getting employe ID",error);
      res.status(500).json({message:"error getting employee by id"})
  }
};


const updateEmployees=async(req,res)=>{
    const{employee_id}=req.params;
    const{name,email,department_id,hire_date,role}=req.body;

    try{
        const updatedEmployee=await Employee.updateEmp(employee_id,{
            name,email,department_id,hire_date,role
        });
        if(!updatedEmployee){
         res.status(404).json({message:"Employee does not exist"})
        }
        res.status(200).json(updatedEmployee)
    }catch(error){
        console.error("error updating employee",error);
        res.status(500).json({message:"error updating employee"})
    }
};


const deleteEmployees=async(req,res)=>{
    const{employee_id}=req.params;
    try{
        const deletedEmployee=await Employee.deleteEmp(employee_id);
        if(!deletedEmployee){
          return res.status(404).json({message:"Employee does not exist"})
        }
        res.status(200).json({
            message:"Employee deleted successfully",
            deletedEmployee
        })
    }catch(error){
        console.error("error deleting employee",error);
        res.status(500).json({message:"error deleting employee"})
    }
};


module.exports={
    createEmployee,
    getAllEmployees,
    getEmployeesId,
    updateEmployees,
    deleteEmployees
}

