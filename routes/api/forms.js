const express = require("express");
const router = express.Router();

const { 
    getFormDetail, 
    getAllForms,
    deleteForm,
    createForm,
    updateFormDetail
} = require("../../controllers/formController");

router.post('/create',createForm)
router.get("/get",getAllForms)
router.get("/get/:id",getFormDetail)
router.put("/update",updateFormDetail)
router.delete("/delete/:id",deleteForm)

module.exports = router