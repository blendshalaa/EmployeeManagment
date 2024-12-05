const pool=require('../db')





const Employee={
    createEmp:async({name,email,department_id,hire_date})=>{
        const result=await pool.query('INSERT into employees(name,email,department_id,hire_date)VALUES($1,$2,$3,$4) RETURNING*',
            [name,email,department_id,hire_date]);
        return result.rows[0]
    },
    getAllEmp:async()=>{
        const result=await pool.query('SELECT * FROM employees');
        return result.rows
    },
    getEmpById:async(employee_id)=>{
        const result=await pool.query('SELECT * FROM employees where employee_id=$1',
            [employee_id]);
        return result.rows[0]
    },
    updateEmp:async(employee_id,{name,email,department_id,hire_date})=>{
        const result=await pool.query('UPDATE employees SET name=$1,email=$2,department_id=$3,hire_date=$4  WHERE employee_id=$5 RETURNING *',
            [name,email,department_id,hire_date,employee_id]);
        return result.rows[0]
    },
    deleteEmp:async(employee_id)=>{
        const result=await pool.query('DELETE FROM employees where employee_id=$1 RETURNING *',
            [employee_id]);
        return result.rows[0]
    },

};

module.exports=Employee