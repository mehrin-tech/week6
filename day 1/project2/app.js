const express=require('express')
const app=express()
const path= require ('path')


// process.on('uncaughtException',(err)=>{
//     console.log("uncaught exception",err.message)
//     process.exit(1)
// })//app stop for the working use 6 to 9 line.

const studentRoutes= require('./routes/studentRoutes')
const teacherRoutes=require('./routes/teacherRoutes')
const { NotFoundError, BadRequestError } = require('./utils/errors')
const { errorHandleMiddleware } = require('./middleware.js/errorHandling')



app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/students',studentRoutes)
app.use('/teachers',teacherRoutes)



// const {welcome}=require('./controllers/moduleType.mjs')
//     app.get('/welcome',welcome)

// const {addition}=require('./controllers/moduleType.mjs')
//   app.get('/addition',addition)

//in es6 module import:
// import ('./controllers/moduleType.mjs').then(({addition,welcome})=>{
//     app.get('/welcome',welcome)
//     app.get('/addition',addition)
// })
// Without the semicolon, JavaScript might try to treat 
// the IIFE as a continuation of the previous line,
//  which can lead to a syntax error or unexpected behavior.
// (async()=>{
//     const {welcome,addition}=await import('./controllers/moduleType.mjs')
//     app.get('/welcome',welcome)
//     app.get('/addition',addition)
  
// })()

app.get('/',(req,res)=>{
    res.render('home',{title:"welcome to school portal"})
});
//err handling middleware:-
app.use(errorHandleMiddleware)
   
   



const port=5000
app.listen(port,()=>console.log(`http://localhost:5000`))

