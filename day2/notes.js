//file operations 
// file operations refer to the  tasks or actions you can perform on fi
// 1)writeFile:-
//writefile has 3 argmts:plain.txt,content,callback
//const fs=require('fs')



// fs.writeFile('plain.txt','hello',(err)=>{
//     if(err)
//         return console.error('err')
//     console.log('success')
    
// })
// //appendFile
// fs.appendFile('plain.txt','\ngood morning',(err)=>{
//     if(err)return console.error('err')
//         console.log('success')
// })
//readFile
// fs.readFile('plain.txt','utf-8',(err,data)=>{
//     if(err) return console.error(err)
//         console.log('success:',data)
// })
//utf-8:-convert buffer to string
// fs.writeFile('students.json',json.stringify(students,null,2))
// students-array.
// null,2-to read easy way and for space
// null → no replacer (you’re not filtering keys)

// 2 → indent using 2 spaces (makes JSON more readable)

//custom promise
// const writeData=(fileName,data)=>{
//     return new Promise((res,rej)=>{
//         fs.writeFile(fileName,data,(err)=>{
//             if(err) return rej(err)
//                 res("success")
//         })
//     })
// }
// writeData('plain.txt','hello')
// .then(res=>console.log('sucess',res))
// .catch(err=>console.log(err))


//file operations part -2
// we don't need to write promises in manually in nodejs,bcoz nodejs has already  promise available. 
// using const fs=require('fs').promises
// so we use async /await with try /catch /**

// eg:

// const fs=require('fs').promises;
// async function writeData(){
//     try{
//         await fs.writeFile('plain.txt','hello from node.js')
//         console.log('file written successfully')
//     }catch(err){
//         console.error('write error:',err)
//     }
// }
//  writeData()
//append file
// const fs=require('fs').promises

// async function readData(){
//     try{
//         const Data=await fs.readFile('plain.txt','utf-8')
//             console.log('file read sucessfully',Data)

        
//     }catch(err){
//         console.error('read error:',err)
//     }
// }
// readData()

// //working with directories:-
// 1)fs.readdir-read content of a folder.
//==without using async await and promise
// const fs = require("fs");

// fs.readdir("./", (err, files) => {
//   if (err) {
//     return console.error("Error reading directory:", err);
//   }
//   console.log("Files in current directory", files);
// });
// //===using promise
// const fs = require("fs").promises;

// fs.readdir("./")
//   .then(files => console.log("Files:", files))
//   .catch(err => console.error("Error:", err));


// 2)fs.mkdir-create folder(with{recursion:true})
//with callbacks
// const fs = require("fs");

// fs.mkdir("newFolder", (err) => {
//   if (err) {
//     return console.error("Error creating directory:", err);
//   }
//   console.log("Directory created successfully
// });

// 3)fs.rmdir-delete folder(or rm() with {recursion:true})
// const fs=require('fs')
// fs.rmdir('newFolder',(err)=>{
//         if(err){
//             return console.error(err)
//         }
//         console.log("directory removed successfully")
// })


// fs.rename(oldPath,newPath)-it renames or moves a file or directory.
// const fs = require("fs");

// fs.rename("plain.txt", "newName.txt", (err) => {
//   if (err) {
//     return console.error("Error renaming file:", err);
//   }
//   console.log("File renamed successfully!");
// });
//===with promise
// const fs = require("fs").promises;

// fs.rename("oldName.txt", "newName.txt")
//   .then(() => console.log("File renamed successfully!"))
//   .catch(err => console.error("Error:", err));
// fs.unlink(path)-delete a file(not a directory)
// const fs = require("fs");

// fs.unlink("newName.txt", (err) => {
//   if (err) {
//     return console.error("Error deleting file:", err);
//   }
//   console.log("File deleted successfully!");
// });
//===with promise
// const fs = require("fs").promises;

// fs.unlink("plain.txt")
//   .then(() => console.log("File deleted successfully!"))
//   .catch(err => console.error("Error:", err));
// ex:rename a file and then delete it

//STREAMS
// streams is a event emit Object.and is a powerful tools to handls data  piece by piece instead of loading it all at once.
// there are 3 events=>
//     1)data-readable stream-emitted when a chunk of data is available to read.
//      2)end-readable stream-emitted when no more data will be provided.
//      3)error-both -emitted when a error occurs
// //chunks
// is a small piece of data that is processed by a stream-either read from a source or written to a destination.

// eg:-
// data	A new chunk of data is available	Processing file piece by piece
// end	All data has been read	Closing resources, finishing up
// error	An error happens during stream use	Handling failures, debugging
// const fs=require('fs')
// const readable=fs.createReadStream('plain.txt','utf-8')
// readable.on('data',(chunk)=>{
//     console.log('new chunk recieved',chunk)
// })
// readable.on('end',()=>{
//     console.log('finished')
// })
// readable.on('error',(err)=>{
//     console.error('error occured',err.message)
// })

//BUFFER:-
// buffer is a temporary memory storage for binary Data.
// eg:-
// const buffer=Buffer.from('Hello Mehrin')
// console.log(buffer.toString())

//write Stream()
//eg:-
// const fs=require('fs')
// const writeStream=fs.createWriteStream('plain.txt')
// writeStream.write('hello Mehrin\n')
// writeStream.end()
//events:-
// 1)finish-trigger after all data has been written and end().
// 2)error-triggered when a write operation fails.

// //pipe()
// pipe is a method in nodejs connects a readble stream to a writeable stream.
// eg:-
// const fs=require('fs')

// const readStream=fs.createReadStream('plain.txt')
// const writeStream=fs.createWriteStream('output.txt')
//  readStream.pipe(writeStream)
//  console.log('file is being copied')
// readStream reads the file in chunks

// writeStream writes those chunks to a new file

// .pipe() connects the two efficiently
// .pipe()	
// Connects streams	     -Readable -> Writable
// Memory-efficient	     -Processes data in chunks
// Chainable	        -Can be piped to multiple destinations
// Used in	            - File copying, compression, HTTP streaming

//steps to Add Data
// Read the existing student.json file

// Parse it to a JavaScript array

// Push the new student data

// Convert the array back to JSON

// Write it back to the file
// ===ex=== first method in add data to plain.txt

// const fs=require('fs')
// const userTxt='\nname:mehrin,age:22';
// fs.appendFile('plain.txt',userTxt,(err)=>{
//     if(err)return console.error(err)
//         console.log('Data added')
// })
//adds text line by line
//No structure or format validation
//suitable for logs or simple note-like data


//callback
// const students=[
//     {id:1,name:'mehrin'},
//     {id:2,name:'mehrin'}
// ]

// fs.writeFile('students.json',JSON.stringify(students,null,2),(err)=>{
//    if(err) return console.error(err)
//     console.log("success")

// })

//===promise===

// const writeData=(filename,data)=>{
// return new Promise((res,rej)=>{

//  fs.writeFile(filename,data,(err)=>{
//    if(err) return rej(err)
//     res("success")

// })
// })

// }
// writeData('plain.txt','hello').then().catch()this is the way of using promise
//we don't write promise ,nodejs is already promise available .



//===basic encoding===
