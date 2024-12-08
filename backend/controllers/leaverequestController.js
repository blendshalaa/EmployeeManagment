const LeaveRequest=require('../models/LeaveRequest');


const createLeaveRequest= async (req,res)=>{
    try{
        const newLeaveRequest=await LeaveRequest.createLeaveReq(req.body);
        res.status(200).json(newLeaveRequest)
    }catch(error){
        console.error("error creating new leave request",error);
        res.status(400).json({message:"error creating new leave request"})
    }
};

const getAllLeaveRequests=async(req,res)=>{
    try{
        const AllLeaveRequests=await LeaveRequest.getAllLeaveReq();
        if(!AllLeaveRequests){
            res.status(404).json({message:"no leave requests found"})
        }
        res.status(200).json(AllLeaveRequests);
    }catch(error){
        console.error("error getting all leave requests",error);
        res.status(400).json({message:"error getting all leave requests"})
    }
};

const getLeaveRequestById=async(req,res)=>{
    const {request_id}=req.params;

    try{
     const requestById=await LeaveRequest.getAllLeaveReqId(request_id);
     if(!requestById){
         res.status(404).json({message:"leave request doesnt exist"})
     }
     res.status(200).json(requestById)
    }catch(error){
        console.error("error getting leave request by id",error);
        res.status(400).json({message:"error getting leave request by id"})
    }
};

const updateLeaveRequest=async(req,res)=>{
    const{request_id}=req.params;
    const{employee_id,start_date,end_date,status,request_date,approved_by}=req.body;

    try{
        const updatedLeaveReq=await LeaveRequest.updateLeaveReq(request_id,{
            employee_id,start_date,end_date,status,request_date,approved_by
        });
        if(!updatedLeaveReq){
            res.status(404).json({message:"error leave request not found"})
        }
        res.status(200).json(updatedLeaveReq)
    }catch(error){
        console.error("error updating leave request",error);
        res.status(400).json({message:"error updating leave request"})
    }
};


const deleteLeaveRequest=async(req,res)=>{
    const{request_id}=req.params;

    try{
        const deletedLeaveRequest=await LeaveRequest.deleteLeaveReq(request_id);
        if(!deletedLeaveRequest){
            res.status(404).json({message:"leave request not found"});

        }
        res.status(200).json(deletedLeaveRequest)
    }catch(error){
        console.error("error deleting leave request",error);
        res.status(400).json({message:"error deleting leave request"})
    }
};


module.exports={
    createLeaveRequest,
    getAllLeaveRequests,
    getLeaveRequestById,
    updateLeaveRequest,
    deleteLeaveRequest
}

