const express = require("express");
const router = express.Router();
// const UserAuth =require('../middleware/userAuth')
const{ loginUser,signUp,homePage,addPlan,editTask,deletePro }=require("../controller/user")

router.post("/login",loginUser),
router.post("/signup",signUp),
router.get("/home",homePage),
router.post("/addplan",addPlan)
router.post("/edit",editTask)
router.post("/delete",deletePro)

module.exports=router;