const express=require('express');
const router=express.Router();

const location=require('./../Models/location');

router.post('/',async(req,res)=>{
    try{
    const data2=req.body//Assuming the request body contains the person data
    
    //Create a new user document using the Mongoose model
  const newLocation=new location(data2);

    //save the new person to the database
    const response=await newLocation.save();
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
    const data2=await location.find();
    console.log('data fetched');
    res.status(200).json(data2);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});

  }

})

module.exports=router;



