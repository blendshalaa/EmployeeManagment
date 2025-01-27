const pool=require('../db');



const Benefits={
    createBenefit:async({employee_id,benefit_type,benefit_details,start_date,end_date})=>{
        const result=await pool.query("INSERT into benefits_and_compensation(employee_id,benefit_type,benefit_details,start_date,end_date)VALUES($1,$2,$3,$4,$5) RETURNING*",
            [employee_id,benefit_type,benefit_details,start_date,end_date]);
        return result.rows[0]
    },
    getAllBenefits:async()=>{
        const result=await pool.query("SELECT * FROM benefits_and_compensation");
        return result.rows;
    },
    getBenefitById:async(benefit_id)=>{
        const result=await pool.query("SELECT * FROM benefits_and_compensation where benefit_id=$1",
            [benefit_id]);
        return result.rows[0];
    },

    updateBenefit: async (benefit_id, { employee_id, benefit_type, benefit_details, start_date, end_date }) => {
        try {
            const result = await pool.query(
                `UPDATE benefits_and_compensation 
       SET employee_id = $1, 
           benefit_type = $2, 
           benefit_details = $3, 
           start_date = $4, 
           end_date = $5 
       WHERE benefit_id = $6`,
                [employee_id, benefit_type, benefit_details, start_date, end_date, benefit_id]
            );
            return result.rowCount > 0;
        } catch (error) {
            console.error("Error updating benefit:", error);
            throw error;
        }
    },
    deleteBenefit: async (benefit_id) => {
        try {
            const result = await pool.query("DELETE FROM benefits_and_compensation WHERE benefit_id = $1", [benefit_id]);
            return result.rowCount > 0;
        } catch (error) {
            console.error("Error deleting benefit:", error);
            throw error;
        }
    },

}

module.exports=Benefits