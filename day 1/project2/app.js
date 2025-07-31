import express from 'express'
const app=express()
import path from 'path'

import studentRoutes from './routes/studentRoutes'
// const teacherRoutes=require('./routes/teacherRoutes')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))


app.use('/students',studentRoutes)
// app.use('/teachers',teacherRoutes)

app.get('/',(req,res)=>{
    res.render('home',{title:"welcome to school portal"})
})
app.listen(5000,()=>console.log(`http://localhost:5000`))