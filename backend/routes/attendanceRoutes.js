const express=require('express');
const router=express.Router();
const attendanceController=require('../controllers/attendanceController');





router.post('/',attendanceController.createAttendance);


router.get('/',attendanceController.getAllAttendance);

router.get('/:attendance_id',attendanceController.getAttendanceId);

router.put('/:attendance_id',attendanceController.updateAttendance);

router.delete('/:attendance_id',attendanceController.deleteAttendance);


module.exports=router