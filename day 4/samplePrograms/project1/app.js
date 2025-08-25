
// const express=require("express")
// const cookieParser=require('cookie-parser')
// const app=express()

// app.use(cookieParser('my-secret-key'))

// app.get('/set',(req,res)=>{
//   res.cookie("username","Mehrin",{
//     httpOnly:true,
//     secure:false,
//     sameSite:"lax",
//     maxAge:60000
//   })
//   res.send("cookie set ")
// })
// app.get('/read',(req,res)=>{
//   res.send(req.cookies)
// })

// app.get('/clear',(req,res)=>{
//   res.clearCookie("username")
//   res.send("cookie cleared")
// })

// app.listen(3000,()=>{
//   console.log('http://localhost:3000')
// })

// res.cookie() → server sets cookie → browser stores it.

// Browser sends cookie automatically on future requests.

// req.cookies → read normal cookies.

// req.signedCookies → read tamper-proof signed cookies.

// res.clearCookie() → remove cookie from client.