const Co2Data = require("../models/Co2Data");
const User = require("../models/User");

exports.totalEmission = async (req, res) => {
  try{
    const {email} = req.body
    const userId = req.user.id;
    if (!userId || !email) {
      return res.status(400).json({
        success: false,
        message: "Please login first",
      });
    }
    const monthlyReport1 = await Co2Data.find({emittedBy:userId}).populate("emittedBy").exec();
    var userAmount = 0;
    for(var i=0; i<monthlyReport1.length; i++){
      userAmount += monthlyReport1[i].amount;
    }
    const userDetails = await User.findOne({email:email});
    const monthlyReport2 = await Co2Data.find({emittedBy:userDetails._id}).populate("emittedBy").exec();
    var friendAmount = 0;
    for(var i=0; i<monthlyReport2.length; i++){
      friendAmount += monthlyReport2[i].amount;
    }
    return res.status(200).json({
      success: true,
      userAmount,
      friendAmount
    });
  } catch(err){
    return res.status(400).json({
      success: false,
    });
  }
}

exports.everyDayCo2Report = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please login first",
      });
    }
    const monthlyReport = await Co2Data.find({emittedBy:userId}).populate("emittedBy").exec();
    return res.status(200).json({
      success: true,
      monthlyReport,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching monthly CO2 emission report",
      error: err.message,
    });
  }
};

exports.userCompare = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter email",
      });
    }
    const monthlyReport2 = await Co2Data.find({emittedBy:userId});
    var emission = 0;
    for(var i=0; i<monthlyReport2.length; i++){
      emission += monthlyReport2[i].emission;
    }
    return res.status(200).json({
      success: true,
      emission,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user wise CO2 emission report",
      error: err.message,
    });
  }
}
