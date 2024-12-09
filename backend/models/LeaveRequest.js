const pool=require('../db')

const LeaveRequest={
    createLeaveReq:async({employee_id,start_date,end_date,status,request_date,approved_by})=>{
        const result=await pool.query('INSERT into leave_requests(employee_id,start_date,end_date,status,request_date,approved_by) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
            [employee_id,start_date,end_date,status,request_date,approved_by]);
        return result.rows[0]
    },
    getAllLeaveReq:async()=>{
        const result=await pool.query('SELECT * FROM leave_requests');
        return result.rows
    },
    getAllLeaveReqId:async(request_id)=>{
        const result=await pool.query('SELECT * FROM leave_requests where request_id=$1',
            [request_id]);
        return result.rows[0]
    },
    updateLeaveReq:async(request_id,{employee_id,start_date,end_date,status,request_date,approved_by})=>{
        const result=await pool.query('UPDATE leave_requests SET employee_id=$1,start_date=$2,end_date=$3,status=$4,request_date=$5,approved_by=$6 RETURNING *',
            [employee_id,start_date,end_date,status,request_date,approved_by]);
        return result.rows[0]
    },
    deleteLeaveReq:async(request_id)=>{
        const result=await pool.query('DELETE FROM leave_requests WHERE request_id=$1',
            [request_id]);
        return result.rows[0]
    }
}

module.exports=LeaveRequest