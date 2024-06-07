const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userH = require("../helpers/userH");
const { token } = require("../utils/jwt");
const { use } = require("../routes/user");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      const user = await userH.findUser(email);
      console.log(user);

      if (!user) {
        res.status(404).json({ message: "invalid user" });
      } else {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          const Token = token(email, user.role);
          res
            .status(200)
            .json({ message: "user loggedIn", token: Token, role: "user" });
        } else {
          res.status(400).json({ message: "invalid password" });
        }
      }
    } catch (error) {
      res.status(404).json({ message: "login error" });
    }
  },
  signUp: async (req, res) => {
    try {
      // console.log(req.body);
      const { name, email, password, age } = req.body;
      const pwLength = Object.values(password).length;
      const datas = req.body;
      const user = await userH.findUser(email);
      if (!user) {
        if (pwLength >= 6) {
          const insertdata = await userH.insert(datas);
          res.status(200).json({ message: "successfully inserted user data" });
        } else {
          res
            .status(400)
            .json({ message: "Password should be atleast 6 characters" });
        }
      } else {
        console.log("existing email");
        res.status(400).json({ message: "email Exist" });
      }
    } catch (error) {
      const firstErrorKey = Object.keys(error.errors)[0]; // Get the first error key
      const validationMessage = error.errors[firstErrorKey].message;
      // console.log(validationMessage, "jhfjhgfh");
      res.status(400).json({ error: validationMessage });
    }
  },
  addPlan:async (req,res)=>{
    console.log(req.body);
    const {planName,tasks,deadline}=req.body.plan

    const token=req.headers.authorization
    let email
    if(token==null) return res.sendStatus(401)
        jwt.verify(token,process.env.secret_key,async (err,user) =>{
    if(err) return res.sendStatus(403);
    console.log(user);
    email=user.mail
    })

    const insert=await userH.pushPlan(planName,tasks,deadline,email)
    if(insert){
        res.status(200).json({message:'plan added',})
    }
    else{
        res.status(403).json({message:'plan not added'})
    }

  },
  homePage:async (req,res)=>{
    const token=req.headers.authorization
    let email
    if(token==null) return res.sendStatus(401)
        jwt.verify(token,process.env.secret_key,async (err,user) =>{
    if(err) return res.sendStatus(403);
    // console.log(user);
    email=user.mail
    })
    const plans=await userH.allplans(email)
    console.log("plns",plans);
    if(plans){
        res.status(200).json({plans:plans.plan})
    }

  },
  editTask:async (req,res)=>{
    console.log(req.body);
    const{taskId,proId}=req.body
    const token=req.headers.authorization
    let email
    if(token==null) return res.sendStatus(401)
        jwt.verify(token,process.env.secret_key,async (err,user) =>{
    if(err) return res.sendStatus(403);
    // console.log('user',user);
    email=user.mail
    })
    try {
        const user=await userH.findUser(email)
        // console.log(user);
        const Project= user.plan.find(project=> project._id.toString() === proId)
        const Task= Project.tasks.find(task=> task._id.toString() === taskId)
        Task.done=true
        const doneCount = Project.tasks.filter(task => task.done === true).length;
        const totalCount=Project.tasks.length
        Project.completed=(doneCount/totalCount)*100
        if(Project.completed == 100){
            Project.status="completed"
        }
        await user.save();

    //    console.log("aaaaaaaaa",Project);
       res.status(200).json({message:"donetask",task:Project.tasks})
        
    } catch (error) {
        console.error(error);
    }
    
  },
  deletePro:async (req,res)=>{
    console.log(req.body);
    const {proId}=req.body
    const token=req.headers.authorization
    let email
    if(token==null) return res.sendStatus(401)
        jwt.verify(token,process.env.secret_key,async (err,user) =>{
    if(err) return res.sendStatus(403);
    // console.log('user',user);
    email=user.mail
    })
    try {
        const delPlan = await userH.deletePlan(email,proId)
        console.log("dddddd",delPlan);
        res.status(200).json({message:"deleted"})     
    } catch (error) {
        console.error(error);
    }
  }
}