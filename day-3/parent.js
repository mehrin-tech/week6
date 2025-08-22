const {fork}=require("child_process")

const child=fork("./child.js")
child.on("message",(msg)=>{
    console.log("Parent got:",msg)
})

child.send({task:"start"})
