const express=require('express');
const router=express.Router();
const Child=require('./../Models/child');


router.post('/',async(req,res)=>{
    try{
    const data1=req.body//Assuming the request body contains the person data
    
    //Create a new user document using the Mongoose model
  const newChild=new Child(data1);

    //save the new person to the database
    const response=await newChild.save();
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
    const data1=await Child.find();
    console.log('data fetched');
    res.status(200).json(data1);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});

  }

})

module.exports=router;