// //process
// when you runs nodejs progrm ,our computr starts a process.
// it has own memory space.access to cpu.a
// why should i care?
// the process obj in nodejs gives you details about your running prgrm.a
// and we can control or intereact with while it runs.a

// ==>process object 
// process is a global object .and we can use anywhere without importing.it represent the current nodejs process
//console.log(process)
//1)process.argv--> command line arguments
//console.log(process.argv)
// ==>nodemon notes.js hello world
// // //[
// //   'C:\\Program Files\\nodejs\\node.exe',
// //   'C:\\Users\\mehar\\OneDrive\\Desktop\\NODE\\week-6\\day-3\\notes.js',
// //   'hello',
// //   'world'
// // ]
//* its like recieving an order slip in a restruarnt-it tells the chef (our prgrm)what ingredients(argsmnt)to use.


//2)process.env==>environment variables.
// console.log(process.env.USERNAME)//mehr in windows username mac,linux=user
// * it is useful for api keys ,DB passwords or config values.
// eg:i'm a hotel chef,i can't hardcoding the days menu into my ImageBitmapRenderingContext,so i check a notice board (environment variables)every morning .
// so i can change it without rewriting the recipies.
// const username = process.env.USER || process.env.USERNAME;
// console.log(username);
// const os = require("os");
// console.log(os.userInfo().username);



// 3)Process.exit()==>ends the process.
// it means pulling the plug on a running blender-instantly it stops the process.

//libuv
// is a c library,it handles async i/o operations and it implements eventloop,callbackqueues.
// without libuv
// eg:-
// const fs=require('fs')
// console.log('hello start')
// const data=fs.readFileSync('plain.txt','utf8')
// console.log('file content length:',data)

// console.log('end')
//without libuv :straight blocking flow


//with libuv:-eventloop+threadpool flow
// const fs=require('fs')
// console.log('start')
// fs.readFile('plain.txt','utf8',(err,data)=>{
//     if(err) return console.error(err)
//         console.log('file content:',data)
// })
// console.log('end')


//is asynchronus ,so its working execution content to node apis,then node apis->libuv(callback+eventloop),later evetloop checks stack is empty ,take async task push into stack,after all synchronus task finished 

//Promise version(still uses libuv):-same as async but with extra microtask queue step in.
// const fs=require('fs').promises
// async function run(){
//     console.log('start')
//     const data=await fs.readFile('plain.txt','utf8')
//     console.log(data)
//     console.log('end')
// }
// run()
const fs=require('fs')

setTimeout(()=>console.log('inside in setTimeout'))
fs.readFile(__filename,()=>{
    console.log('poll ingredients file arrived')
    setImmediate(()=>console.log('check :vip order served'))

})

Promise.resolve().then(()=>console.log('microtask:priority task'))
process.nextTick(()=>console.log('first priority task'))
console.log('start')
