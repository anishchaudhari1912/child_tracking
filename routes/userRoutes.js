const express=require('express');
const router=express.Router();
const user=require('./../Models/user');

router.post('/',async(req,res)=>{
    try{
    const data=req.body//Assuming the request body contains the person data
    
    //Create a new user document using the Mongoose model
  const newuser=new user(data);

    //save the new person to the database
    const response=await newuser.save();
    console.log('data saved');
    res.status(200).json(response);
  
    
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

router.get('/',async(req,res)=>{
  try{
    const data=await user.find();
    console.log('data fetched');
    res.status(200).json(data);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});

  }


})

module.exports=router;