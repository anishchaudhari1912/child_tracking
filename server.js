const express=require('express');
const app=express();
const db=require('./Config/db');
const passport=require('./Auth');
const LocalStrategy=require('passport-local').Strategy;
const User=require('./Models/user');


//Middleware Function --
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}]Request Made to: ${req.originalUrl}`);
  next();//Move on to next phase


}
app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/' ,function (req,res){
  res.send('Welcome to our App');
})
passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
  //authentication logic here
  try{
    console.log('Received credentials:',USERNAME,password);
    const user=await User.findOne({username:USERNAME});
    if(!user)
      return done(null,false,{message:'Incorrect username'});
    
    const isPasswordMatch = user.password===password ? true : false;
    
    if(isPasswordMatch){
      return done (null,user)
    }else{
      return done(null,false,{message:'Incoreect password'});
    }
  }
  catch(err){
    return done(err);

  }


}))

const bodyParser=require('body-parser');
app.use(bodyParser.json());//req.body

//import the route file
const userRoutes=require('./routes/userRoutes');
const childRoutes=require('./routes/childRoutes');
const locationRoutes=require('./routes/locationRoutes')

//use the routers

app.use('/user',userRoutes);
app.use('/child',childRoutes);
app.use('/location',locationRoutes);


  



app.listen(3000)