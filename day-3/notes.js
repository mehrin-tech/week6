// //process
// when you runs nodejs progrm ,our computr starts a process.
// it has own memory space.access to cpu.its own environment.exit codes and status.input /output streams.
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
//const username = process.env.USER || process.env.USERNAME;
// console.log(username);
//const os = require("os");
// console.log(os.userInfo().username);



// 3)Process.exit()==>ends the process.
// it means pulling the plug on a running blender-instantly it stops the process.
//eg:-
// const name=process.argv[2]
// if(!name){
//     console.log("err:pls provide your name")
//     process.exit(1)//err
// }
// console.log(`hello,${name}`)
// process.exit(0)//sucess

//4)process.pid-process ID
// * pid stands for Process ID.
// *it is a unique number assigned by the operating system to running nodejs process.
// *this ID can be used to track ,manage,or kill a process from the OS or other scripts.
//console.log("process ID:",process.pid)
//Use cases:

//* Logging which process is running (useful in servers with multiple instances).

// *Sending signals to a process: kill -SIGTERM <pid> from terminal.


//5)process.cwd()-current working directory
//*cwd -current working Directory.
//*it returns the directory from which the node process was started,not the directory where the script is located.
//eg:-
// console.log("__dirname:",__dirname)__dirname: C:\Users\mehar\OneDrive\Desktop\NODE\week-6\day-3
// console.log('current working directory:',process.cwd())
//current working directory: C:\Users\mehar\OneDrive\Desktop\NODE\week-6\day-3

// Feature	__dirname	process.cwd()
// Path	Script file directory	Directory where Node was run
// Changes if run elsewhere?	 No	    Yes
// Use case	Require files, file paths	Resolve paths dynamically

//======libuv
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
// const fs=require('fs')

// setTimeout(()=>console.log('inside in setTimeout'))
// fs.readFile(__filename,()=>{
//     console.log('poll ingredients file arrived')
//     setImmediate(()=>console.log('check :vip order served'))

// })

// Promise.resolve().then(()=>console.log('microtask:priority task'))
// process.nextTick(()=>console.log('first priority task'))
// console.log('start')


//working of priority tasks
//1st priority ,eventloop checks  callstack is empty? the eventloop take process.nextTick () pushed in to callstack,
// after any promise task?then eveloop take promise  and puhed in to callstack,later eventloop check callback queues and pushed in to callstack.


//=====eventloop phases:-
// 1) timers phase:-setTimeout,setInterval callbacks run .then if the timer limit is finished later it execute
// 2)pending callback phase:pending cB processed async operations
// 3)idle/prepare phase:-event loop internally prepare cheyyunnathinulla tyme.
// 4)main work happens Headers,new i/o events checked
// 5)check phase:-
// setImmediate() callbacks run
// 6) close callback phase:-
// close events callbacks run 
// ==>microtask queueMicrotask=(special priority)
// process.nextick and promise callbacks  are extra priority tasks,so these tasks  more priority than others


// ====flow of callbacks====
// timers=>microtaskques1)process.nextTick and 2)promise==>pending CB==>microtaskqueue===>pollqueue==>checkQueue==>close


//=====parts of libuv======
// 1)eventloop
// 2)Timers
// 3)i/o polling
// 4)Threadpool-heavy tasks handl cheyyan
// 5)signal handling-os signal nodeokke react cheyyunathinu vendi
// 6)file system operations-read/writes files 
// 7)process  Handling-child process ne manage cheyyunninide proces handlg


//=====Node file.js runs :-what really happens======




//workerthreads:-
// multiple threads inside the same nodejs process that shared the Memory.
// it runs the same process.but each worker has its own eventloop.
// if any blocks of main threads in working on  synchronus task,there are 2 major ways to avoid blocking:-1)worker threads 2)childprocess.to avoid the block of main thread creatte a worker threads.
// 1)worker threads:-
// if a file.js runs on nodejs,it create a process ,inside of process v8 engine,libuv,memory space,c++,node api,globalobj.if there is any heavy tasks for blocking the main thread create a instance of worker thread.it communicates passing through messges(main thread->worker threads).
// *nodejs  give a  built in module  for create worker thread.
// *worker threads -in the same process have extra separate v8 engine,libuv.thats the instance of in main thread.Memory
// //main.js
// inside of worker threads have available in class.it is used to create  worker instance.
// woker->class->new worker instance

// //workerfile.js
// 1)parentPort:-A messgPort Object.it is used to communicate btw worker and parent.
// *Lets the worker send messages back to the main thread (and also receive messages from it).
// *Methods:
// parentPort.postMessage(data) → Send message to parent.
// parentPort.on('message', callback) → Listen for messages from parent.

// 2)workerData: Data you pass when creating a Worker.
// *Used to send initial data/configuration from the main thread to the worker thread at the time of creation.
// *Only available inside the worker file.


//eg:-
//notes.js
// const {Worker}=require('worker_threads')
// const worker=new Worker('./first.js')
// worker.on('message',(msg)=>{
//     console.log('recieved from worker:',msg)
// })
// worker.postMessage(5)
// //main thread file->use new worker ()
// //worker file-> use parentPort and workerdata

//types of event
// message → when the worker sends a message to the parent.

// error → if the worker throws an uncaught exception.

// exit → when the worker stops (returns an exit code).

// online → when the worker is ready (has started execution).

// messageerror → when a message sent can’t be deserialized.


// //2)childProcess
// it is a completely separate instance of the nodejs Process.
// then it runs different memory space,with its own v8 engine,instance,evetloop,and garbage collector.it communicates  only via Inter-Process Communication(IPC).
// process.send() / process.on('message')). Data must be serialized (turned into strings or buffers).
// its running on cpu heavy tasks ,independent scripts or executing shell commands where isolation is needed.
// *Module: child_process (e.g., spawn, exec, fork).

// Pros:

// Fully isolated (a crash in child won’t affect parent).

// Can utilize multiple CPU cores.

// Perfect for running completely different scripts or external commands.

//  Cons:

// Heavyweight: Creates a full new Node.js instance (memory overhead).

// IPC is slower because data is copied/serialized.


//example:-
// four methods in childprocess:-
//1)exec:-its runs the commands inside the shell

// const  {exec}=require('child_process')
// exec("dir",(error,stdout,stderr)=>{
//     if(error){
//         console.log(`error:${error.message}`)
//         return
//     }
//     console.log(`files:\n ${stdout}`)
// })

//2)execFile:- it runs  a binary or executable  file directly,without shell.
//* its more secure than exec becoz it avoids  shell injection
//*and more efficient ,becoz it doesn't create the extra shell process.
// const {execFile}=require('child_process')

// execFile("node",["-v"],(error,stdout)=>{
//     if(error) throw error ;
//     console.log(`node version : ${stdout}`)
// })
//-v =>print node version  -> node version : v22.15.1
//-V =>print V8 version -> Node.js v22.15.1


// 3)spawn:- spawns a process and streams data via stdout/stderr. is a new process without using a shell by default
// *Output is received in chunks, not buffered.
// *Suitable for large outputs (e.g., logs, media processing).

//ex:-
// const {spawn} =require("child_process")

// const child= spawn("ping",["-n","4","facebook.com"])//(-n) on windows,(-c) on linux and mac

// child.stdout.on("data",(data)=>{
//     console.log(`output:${data}`)
// })//stdout is a stream .data is recieved in chunks ,not all at once.Each data event gives a Buffer. Node automatically converts to string in console.log.
// child.stderr.on("data",(data)=>{
//     console.log(`error: ${data}`)
// })//stderr  f the command prints to stderr (errors or warnings), you capture it separately.
// //Example: wrong hostname or permission error will appear here.
// child.on("close",(code)=>{
//     console.log(`process exited with code ${code}`)
// })//when the process completely exist.  code->exit code,0->success,Non zero->err occured


//4) fork:- special case of spawn it is used for running nodejs scripts.it create a new V* instance(separte memory space).it has built in IPC channel for msg passing .





// Higher startup cost.
//===real world analogy====
// Child Process = A whole new kitchen with its own chef, ingredients, and stove.

// Worker Thread = Another chef working in the same kitchen, sharing the fridge and tools.

//Cluster
//*separate memory per worker
// *the cluster in nodejs  that allows you to create multiple nodejs Process .that all share the same server port.
// *this is useful because nodejs is single threaded.so by default it can't fully use all CPU cores.

// *with cluster,you can fork multiple process (usually one per CPU core) to handle incoming requests concurrentl