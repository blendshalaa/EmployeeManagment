const express=require('express');
const router=express.Router();
const employeeController=require('../controllers/employeeController');




router.post('/',employeeController.createEmployee);


router.get('/',employeeController.getAllEmployees);

router.get('/:employees_id',employeeController.getEmployeesId);

router.put('/:employees_id',employeeController.updateEmployees);

router.delete('/:employees_id',employeeController.deleteEmployees);



module.exports=router