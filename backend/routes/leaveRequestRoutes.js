const express=require('express');
const router=express.Router();
const leaverequestController=require('../controllers/leaverequestController');



router.post("/",leaverequestController.createLeaveRequest);

router.get("/",leaverequestController.getAllLeaveRequests);

router.get("/:request_id",leaverequestController.getLeaveRequestById);

router.put("/:request_id",leaverequestController.updateLeaveRequest);

router.delete("/:request_id",leaverequestController.deleteLeaveRequest);



module.exports=router