const express=require('express')
const path=require('path')
const app=express()

const studentRoutes=require('./routes/studentRoutes')

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render('home',{title:"Welcome to students portal"})
})



app.use('/students',studentRoutes)

app.use((err,req,res,next)=>{
  //handle err
})
const port=5000
app.listen(port,()=>console.log(`http://localhost:5000`))
