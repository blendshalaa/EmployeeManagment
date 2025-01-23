const express=require('express');
const router=express.Router();
const PerformanceReviewController=require('../controllers/PerformanceReviewController');




router.post('/',PerformanceReviewController.createPerformanceReview);


router.get('/',PerformanceReviewController.getAllPerformanceReviews);

router.get('/:performance_id',PerformanceReviewController.getPerformanceReviewId);

router.put('/:performance_id',PerformanceReviewController.updatePerformanceReview);

router.delete('/:performance_id',PerformanceReviewController.deletePerformanceReview);



module.exports=router