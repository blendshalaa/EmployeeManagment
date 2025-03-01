const Benefits=require('../models/Benefits');



const createBenefits=async(req,res)=>{
    try{
      const newBenefit=await Benefits.createBenefit(req.body);
      res.status(200).json(newBenefit)
    }catch(error){
        console.error("error creating new Benefit",error);
        res.status(500).json({message:"error creating benefit",error})
    }
};

const getAllBenefits=async(req,res)=>{
    try{
        const allBenefits=await Benefits.getAllBenefits();
        res.status(200).json(allBenefits);
    }catch (error){
        console.error("error creating benefits",error);
        res.status(500).json({message:"error getting all benefits",error})
    }
};

const getBenefitsById=async(req,res)=>{
    const{benefit_id}=req.params;
    try{
        const benefitID=await Benefits.getBenefitById(benefit_id)
        if(!benefit_id){
            res.status(404).json({message:"error benefit not found"});
        }
        res.status(200).json(benefitID)
    }catch(error){
        console.error("could not find benefit by id",error);
        res.status(500).json("Error cant find benefit by id",error);
    }
};

const updateBenefits = async (req, res) => {
    const { benefit_id } = req.params;
    const { employee_id, benefit_type, benefit_details, start_date, end_date } = req.body;

    try {
        const rowsUpdated = await Benefits.updateBenefit(benefit_id, {
            employee_id,
            benefit_type,
            benefit_details,
            start_date,
            end_date,
        });

        if (rowsUpdated === 0) {
            res.status(404).json({ message: "Benefit not found" });
        } else {
            res.status(200).json({ message: "Benefit updated successfully" });
        }

    } catch (error) {
        console.error("Error updating benefits:", error);
        res.status(500).json({ message: "Error updating benefit", error });
    }
};

const deleteBenefits = async (req, res) => {
    const { benefit_id } = req.params;

    try {
        const isDeleted = await Benefits.deleteBenefit(benefit_id);

        if (!isDeleted) {
            res.status(404).json({ message: "Benefit not found" });
        } else {
            res.status(200).json({ message: "Benefit deleted successfully" });
        }

    } catch (error) {
        console.error("Error deleting benefits:", error);
        res.status(500).json({ message: "Error deleting benefit", error });
    }
};


module.exports={
    createBenefits,
    getAllBenefits,
    getBenefitsById,
    updateBenefits,
    deleteBenefits
}
