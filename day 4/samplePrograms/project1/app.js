// import express from "express"
// import cookieParser from "cookie-parser"

// const app=express()
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))


// app.use(cookieParse(process.env.COOKIE_SECRET || "dev-secret"))


// app.get('/set/basic',(req,res)=>{
//     res.cookie("theme","dark",{
//         maxAge:1000*60*30,
//         sameSite:"lax"
//     })
//     res.send("set basic cookie")
// })

// app.get("/set/secure",(req,res)=>{
//     res.cookie("sid","rendom-session-id",{
//         httpOnly:true,
//         secure:true,
//         sameSite:"lax",
//         maxAge:1000*60*60


//     })
//     res.send("set secure cookie")
// })

// app.get("/set/signed",(req,res)=>{
//     res.cookie("prefs",{lang:"en", tz:"Asia/kolkata"}, {
//         signed:true,
//         httpOnly:true,
//         samSite:"lax",
//         maxAge:1000*60*10
//     })
//     res.send("set signed Json cookie")
// })

// app.get("/set/cross",(req,res)=>{
//     res.cookie("cross","ok",{
//         httpOnly:true,
//         secure:true,
//         sameSite:"none",
//         maxAge:1000*60*5
//     })
//     res.send("set cross-site cookie")
// })

// app.get("/clear/:name",(req,res)=>{
   
//     res.clearCookie(req.params.name,{path:"/",sameSite:"lax"})
//    res.redirect("/")

// })



// app.listen(3000,()=>console.log("http://localhost:3000"))
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("super-secret-rotate-me")); // enable signed cookies

app.get("/", (req, res) => {
  res.send(`
    <h1>Cookie Demo</h1>
    <ul>
      <li><a href="/set/basic">Set basic</a></li>
      <li><a href="/set/secure">Set secure (httpOnly)</a></li>
      <li><a href="/set/signed">Set signed JSON</a></li>
      <li><a href="/get/basic">Get basic</a></li>
      <li><a href="/get/secure">Get secure</a></li>
      <li><a href="/get/signed">Get signed</a></li>
      <li><a href="/clear/theme">Clear 'theme'</a></li>
    </ul>
  `);
});

app.get("/set/basic", (req, res) => {
  res.cookie("theme", "dark", { maxAge: 1000 * 60 * 30, sameSite: "lax" });
  res.redirect("/");
});

app.get("/set/secure", (req, res) => {
  res.cookie("sid", "abc123", { httpOnly: true, secure: false, sameSite: "lax" });
  res.redirect("/");
});

app.get("/set/signed", (req, res) => {
  res.cookie("prefs", { lang: "en", tz: "Asia/Kolkata" }, {
    signed: true, httpOnly: true, sameSite: "lax", maxAge: 1000 * 60 * 10
  });
  res.redirect("/");
});

app.get("/get/basic", (req, res) => {
  res.json({ cookies: req.cookies });
});

app.get("/get/secure", (req, res) => {
  res.json({ sid: req.cookies.sid || null });
});

app.get("/get/signed", (req, res) => {
  res.json({ signedCookies: req.signedCookies });
});

app.get("/clear/:name", (req, res) => {
  res.clearCookie(req.params.name, { path: "/", sameSite: "lax" });
  res.redirect("/");
});

app.listen(3000);
