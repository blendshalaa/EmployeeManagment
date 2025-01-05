const express=require('express');
const router=express.Router();
const benefitsController=require('../controllers/benefitsController');




router.post('/',benefitsController.createBenefits);


router.get('/',benefitsController.getAllBenefits);

router.get('/:benefit_id',benefitsController.getBenefitsById);

router.put('/:benefit_id',benefitsController.updateBenefits);

router.delete('/:benefit_id',benefitsController.deleteBenefits);


module.exports=router