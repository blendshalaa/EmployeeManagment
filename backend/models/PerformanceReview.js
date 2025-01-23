const pool=require('../db');




const PerformanceReview={
    createReviews:async({employee_id,review_date,review_period,rating,reviewer,comments,goals})=>{
        const result=await pool.query('INSERT into performance_reviews (employee_id,review_date,review_period,rating,reviewer,comments,goals) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING*',
            [employee_id,review_date,review_period,rating,reviewer,comments,goals]);
        return result.rows[0]
    },
    getAllReviews:async()=>{
        const result=await pool.query('SELECT * FROM performance_reviews');
        return result.rows
    },
    getReviewById:async(performance_id)=>{
        const result=await pool.query('SELECT * FROM performance_reviews where performance_id = $1',
            [performance_id]);
        return result.rows[0]
    },
    updateReview:async(performance_id,{employee_id,review_date,review_period,rating,reviewer,comments,goals})=>{
        const result=await pool.query('UPDATE performance_reviews SET employee_id=$1,review_date=$2,review_period=$3,rating=$4,reviewer=$5,comments=$6,goals=$7 WHERE performance_id=$8 RETURNING *',
            [employee_id,review_date,review_period,rating,reviewer,comments,goals,performance_id]);
        return result.rows[0];
    },
    deleteReview:async(performance_id)=>{
        const result=await pool.query('DELETE FROM performance_reviews where performance_id=$1 RETURNING *',
            [performance_id])
    }

}

module.exports=PerformanceReview