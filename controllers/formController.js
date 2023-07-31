const Forms = require("../models/forms")
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");

exports.getAllForms = catchAsyncError(async (req, res ) => {
    const alumniCount = await Forms.countDocuments();
  
    const apiFeatures = new ApiFeatures(Forms.find(), req.query)
      .search()
      .filter();
    const Forms = await apiFeatures.query;
    res.status(200).json({
      success: true,
      alumni,
      alumniCount,
    });
});

//Get Form Details
exports.getFormDetail = catchAsyncError(async (req, res, next) => {
    const form = await Forms.findById(req.params.id);
  
    if (!form) {
      return next(new ErrorHandler("Form not found", 404));
    }
  
    res.status(200).json({ success: true, form });
});