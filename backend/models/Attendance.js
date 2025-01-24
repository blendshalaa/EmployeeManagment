const pool=require('../db');


const Attendance={
    createAttendance:async({employee_id,date,status,hours_worked,leave_reason})=>{
        const result=await pool.query('INSERT into attendance (employee_id,date,status,hours_worked,leave_reason)VALUES($1,$2,$3,$4,$5)RETURNING *',
            [employee_id,date,status,hours_worked,leave_reason]);
        return result.rows[0]
    },
    getAttendance:async()=>{
        const result=await pool.query('SELECT * FROM attendance');
        return result.rows
    },
    getAttendanceById:async(attendance_id)=>{
        const result=await pool.query('SELECT * FROM attendance where attendance_id=$1',
            [attendance_id]);
        return result.rows[0]
    },
    updateAttendance:async(attendance_id,{employee_id,date,status,hours_worked,leave_reason})=>{
        const result=await pool.query('UPDATE attendance SET employee_id=$1,date=$2,status=$3,hours_worked=$4,leave_reason=$5,attendance_id=$6 RETURNING *',
            [employee_id,date,status,hours_worked,leave_reason]);
        return result.rows[0]
    },
    deleteAttendance:async(attendance_id)=>{
        const result=await pool.query('DELETE FROM attendance where attendance_id=$1 RETURNING *',
            [attendance_id]);
        return result.rows[0]
    }
}


module.exports=Attendance