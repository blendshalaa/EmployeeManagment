const express=require('express');
const router=express.Router();
const employeeController=require('../controllers/employeeController');




router.post('/',employeeController.createEmployee);


router.get('/',employeeController.getAllEmployees);

router.get('/:employee_id',employeeController.getEmployeesId);

router.put('/:employee_id',employeeController.updateEmployees);

router.delete('/:employee_id',employeeController.deleteEmployees);



module.exports=router