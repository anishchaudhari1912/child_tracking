const express=require('express');
const router=express.Router();
const user=require('./../Models/user');
const{jwtAuthMiddleware,generateToken}=require('./../jwt');
router.post('/signup',async(req,res)=>{
    try{
    const data=req.body//Assuming the request body contains the person data
    
    //Create a new user document using the Mongoose model
  const newuser=new user(data);

    //save the new person to the database
    const response=await newuser.save();
    console.log('data saved');

    const payload={
      id:response.id,
      username:response.username
    }
    console.log(JSON.stringify(payload));
    const token =generateToken(payload);
    console.log("token is:",token);


    res.status(200).json({response:response, token:token});
  
    
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

//Login Route
router.post('/login',async(req,res)=>{
  try{
    //Extract the username and password from request body
    const {username,password} =req.body;

    //Find the User by username
    const User=await user.findOne({username:username});

    //If user does not exit or password does not match ,return error

    if(!user || !(await User.comparePassword(password) != undefined)){

      return res.status(401).json({error:"Invalid Username or Password"});
    }

    //generate token
    const payload={
      id:user.id,
      username:User.username
    }

    const token=generateToken(payload);
    //return token as response

    res.json(token);

  }
  catch(err){

    console.error(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

//Profile Route
router.get('/profile',async(req,res)=>{
  try{
    const userData=req.user;
    console.log("user data:",userData);
    
    const userID =userData.id;

    const User=await user.findById(userID);

    res.status(200).json({User});

  
  }
  catch(err){
    console.error(err);
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