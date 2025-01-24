const Attendance=require('../models/Attendance');




const createAttendance=async(req,res)=>{
    try{
        const newAttendance=await Attendance.createAttendance(req.body);
        res.status(200).json(newAttendance)
    }catch (error){
        console.error("error creating new attendance",error);
        res.status(500).json({message:"error creating attendance"})
    }
};

const getAllAttendance=async(req,res)=>{
    try{
        const getAttendance=await Attendance.getAttendance();
        res.status(200).json(getAttendance);
    }catch (error){
        console.error("error getting all attendance",error);
        res.status(500).json({message:"error getting all attendance"})
    }
};


const getAttendanceId=async(req,res)=>{
    const{attendance_id}=req.params
    try{
        const getAttendanceId=await Attendance.getAttendanceById(attendance_id);
        if(!getAttendanceId){
            res.status(404).json({message:"attendance doesnt exist"})
        }
        res.status(200).json(getAttendanceId)
    }catch (error){
        console.error("error getting attendance by id",error);
        res.status(500).json({message:"error  attendance by id"})
    }
};


const updateAttendance=async(req,res)=>{
    const{attendance_id}=req.params;
    const{employee_id,date,status,hours_worked,leave_reason}=req.body;
    try{
        const updatedAttendance=await Attendance.updateAttendance(attendance_id,{employee_id,date,status,hours_worked,leave_reason});
        if(!updatedAttendance){
            res.status(404).json({message:"attendance doesnt exist"})
        }
        res.status(200).json(updatedAttendance)

    }catch (error){
        console.error("error updating attendance",error);
        res.status(500).json({message:"error  updating attendance by id "})
    }
};


const deleteAttendance=async(req,res)=>{
    const{attendance_id}=req.params;

    try{
        const deletedAttendance=await Attendance.deleteAttendance(attendance_id);
        if(!deletedAttendance){
            res.status(404).json({message:"attendance doesnt exist"})
        }
        res.status(200).json(deletedAttendance)
    }catch (error){
        console.error("error deleting",error);
        res.status(500).json({message:"error deleting "})
    }
}

module.exports={
    createAttendance,
    getAllAttendance,
    getAttendanceId,
    updateAttendance,
    deleteAttendance
}
