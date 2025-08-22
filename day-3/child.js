process.on("message",(msg)=>{
    console.log("child got:",msg)
    process.send({result:"done"})
})