const express = require('express');
const router = express.Router();
const departmentController=require('../controllers/departmentController');


router.post('/',departmentController.createDepartment);

router.get('/',departmentController.getAllDepartments);

router.get('/:department_id',departmentController.getAllDepartmentsById);

router.put('/:department_id',departmentController.updateDepartment);

router.delete('/:department_id',departmentController.deleteDepartment);


module.exports=router