const express = require("express");
const { getFormDetail, getAllForms } = require("../../controllers/formController");
const router = express.Router();

router.route("getform").get(getAllForms)
router.route("getform/:id").get(getFormDetail)