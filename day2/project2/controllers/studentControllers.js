const path=require('path')
const fs=require('fs').promises
const filepath=path.join(__dirname,'../data/students.json')

//dummy arr
let students=[
  {id:1,name:'rahul',grade:'12'},
  {id:2,name:'rihan',grade:'10'}
]

//asynchrouns fetch students
const fetchAllStudents=()=>{
    return new Promise((res)=>{
        setTimeout(()=>{
            res(students)
        },1000)
    })
}

// const getAllStudents=(req,res)=>{
//   res.render('students',{title:"All students",students})
// }
const getAllStudents=async(req,res)=>{
    try{
        const data=await fs.readFile(filepath,'utf-8')
       // const studentsList=await fetchAllStudents()
       const students=JSON.parse(data)
        res.render('students',{title:"All students",students})
    }catch(err){
res.status(500).send("failed to fetch students")
    }
 // res.render('students',{title:"All students",students})
}

const getFormStudent=(req,res)=>{
  res.render('formStudent',{title:'Add student'})
}

const addFormStudent= async(req,res)=>{
  const {name,grade}=req.body
  //step:1read the existing file
  const data=await fs.readFile(filepath,'utf-8')
  //step 2: parse JSON to obj
  const students=JSON.parse(data)
  const newStd={
    id:students.length+1,
    name,
    grade
  }
  //step 3: add the new student
  students.push(newStd)
  //step 4: convert back to json string
  await fs.writeFile(filepath,JSON.stringify(students,null,2))
  
  res.redirect('/students')
}
//fetch single student
const fetchSingleStudent=async(id)=>{
    //data take in memory
//     return new Promise((res)=>{
//         setTimeout(()=>{
//             const student=students.find(s=>s.id===parseInt(id))
//             res(student)
//         },1000)

// })
const data=await fs.readFile(filepath,'utf-8')
const students=JSON.parse(data)
const student=students.find(s=>s.id===parseInt(id))
return student
}
const getSingleStudent=async(req,res)=>{
    try{
        const student=await fetchSingleStudent(req.params.id)
// const student=students.find(s=>s.id===id)
            if(!student){
                //create err obj
               const err=new Error('student not found')
               //return res.status(404).send('student not found')
              
             } res.render('studentDetails',{title:'studentDetails',student})
    }catch(err){
  return res.status(500).send('internal server error')
    }
 
}
module.exports={
    getAllStudents,
    getFormStudent,
    addFormStudent,
    getSingleStudent
}
