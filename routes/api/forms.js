const express = require("express");
const { 
    getFormDetail, 
    getAllForms,
    deleteForm,
    createForm,
    updateFormDetail
} = require("../../controllers/formController");
const router = express.Router();

router.route("/createform").post(createForm)
router.route("getform").get(getAllForms)
router.route("getform/:id").get(getFormDetail)
router.route("/updateForm").patch(updateFormDetail)
router.route("/deleteForm").delete(deleteForm)