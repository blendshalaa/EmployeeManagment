const pool = require('../db');



const Department={
    createDep:async({name,description,managed_by})=>{
        const result=await pool.query('INSERT into departments(name,description,managed_by)VALUES($1,$2,$3)RETURNING *',
            [name,description,managed_by]);
        return result.rows[0]
    },
  getAllDep:async()=>{
        const result=await pool.query('SELECT * FROM departments');
        return result.rows
  },

   getAllDepId:async(department_id)=>{
        const result=await pool.query('SELECT * FROM departments where department_id=$1',
            [department_id]);
       return result.rows[0]
   },

    updateDep:async(department_id,{name,description,managed_by})=>{
        const result=await pool.query('UPDATE departments SET name=$1,description=$2,managed_by=$3 WHERE department_id=$4 RETURNING *',
            [name,description,managed_by,department_id]);
        return result.rows[0]
    },

    deleteDep: async (department_id) => {
        const result = await pool.query(
            'DELETE FROM departments WHERE department_id = $1 RETURNING *',
            [department_id]
        );
        return result.rows[0];
    },



};
module.exports=Department;