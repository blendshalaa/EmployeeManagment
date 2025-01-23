const PerformanceReview=require('../models/PerformanceReview');




const createPerformanceReview=async(req,res)=>{
    try{
        const newReview=await PerformanceReview.createReviews(req.body);
        res.status(200).json(newReview)
    }catch (error){
        console.error("error creating review",error);
        res.status(500).json({message:"error creating review"})
    }
};

const getAllPerformanceReviews=async(req,res)=>{
    try{
        const getAllReview=await PerformanceReview.getAllReviews();
        res.status(200).json(getAllReview)
    }catch (error){
        console.error("error getting all reviews",error);
        res.status(500).json({message:"error getting all reviews "})
    }
};

const getPerformanceReviewId=async(req,res)=>{
    const {performance_id}=req.params;
    try{
        const getReviewId=await PerformanceReview.getReviewById(performance_id);
        if(!getReviewId){
            res.status(404).json({message:"review not found"})
        }
        res.status(200).json(getReviewId)
    }catch (error){
        console.error("error getting reviews by id",error);
        res.status(500).json({message:"error getting  reviews by id "})
    }
};

const updatePerformanceReview=async(req,res)=>{
    const{performance_id}=req.params;
    const{employee_id,review_date,review_period,rating,reviewer,comments,goals}=req.body;

    try{
        const updateReview=await PerformanceReview.updateReview(performance_id,{employee_id,review_date,review_period,rating,reviewer,comments,goals});
        if(!updateReview){
            res.status(404).json({message:"review doesnt exitst"})
        }
        res.status(200).json(updateReview)
    }catch (error){
        console.error("error updating review ",error);
        res.status(500).json({message:"error  updating review "})
    }
};

const deletePerformanceReview=async(req,res)=>{
    const{performance_id}=req.params;
    try{
        const deleteReview=await PerformanceReview.deleteReview(performance_id);
        res.status(200).json(deleteReview);
    }catch (error){
        console.error("error deleting review ",error);
        res.status(500).json({message:"error  deleting review "})
    }
};


module.exports={
    createPerformanceReview,
    getAllPerformanceReviews,
    getPerformanceReviewId,
    updatePerformanceReview,
    deletePerformanceReview
}