const cluster=require('cluster')
const os=require('os')

if(cluster.isPrimary){
    const cpuCount=os.cpus().length
    for(let i=0;i<cpuCount;i++){
        cluster.fork()
    }
}else{
    const express=require('express')
    const app=express()

    app.get('/',(req,res)=>{
        res.send('hello')
    })

    app.listen(3000,()=>{
        console.log(`single worker PID ${process.pid} listening on http://localhost:3000`)
    })
}
// Node.js runs on a single thread.

// Modern CPUs have multiple cores.

// cluster allows us to fork multiple worker processes, each handling requests independently.

// This way, we can use all CPU cores to improve performance.