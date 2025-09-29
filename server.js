const express=require('express');
const app=express();
const db=require('./Config/db');




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