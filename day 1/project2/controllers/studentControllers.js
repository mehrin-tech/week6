const path=require('path')
const fs=require('fs').promises
const filepath=path.join(__dirname,'../data/students.json')
// // Sample student data
let students = [
  { id: 1, name: "Rahul", grade: "10" },
  { id: 2, name: "Rihan", grade: "9" },
  {id:3,name:'mehfil',grade:"10"}
];

// Simulate async fetch
const fetchAllStudents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(students);
    }, 1000);
  });
};

// Controller: List all students
const getAllStudents = async (req, res) => {
  try {
    const data=await fs.readFile(filepath,'utf-8')
   // const studentsList = await fetchAllStudents();
   const studentsList=JSON.parse(data)
    res.render('students', { title: 'All Students', students: studentsList });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch students");
  }
};

// const getAllStudents=(req,res)=>{
//   res.render('students',{title:"all students",students})
// }
// Controller: Show add student form
const getAddStudents = (req, res) => {
  res.render('formStudent', { title: 'Add Student' });
};

// Controller: Handle form submission to add new student
const addFormStudents = async(req, res) => {
  const { name, grade } = req.body;
 const data=await fs.readFile(filepath,'utf-8')
  const students=JSON.parse(data)
  const newStudent = {
    id: students.length >0?students[students.length-1].id+1:1,
    name,
    grade,
  };
  students.push(newStudent);
  await fs.writeFile(filepath,JSON.stringify(students,null,2))
  res.redirect('/students');
};
//fetch single student
const {NotFoundError}=require('../utils/errors')
const fetchSingleStudent=(id)=>{
  return new Promise((res)=>{
setTimeout(()=>{
  const student=students.find(s=>s.id===parseInt(id))
  res(student)
     },1000)
  })
  
 
}
// Controller: View a single student's details
// const getSingleStudent = (req, res) => {
//   const studentId = parseInt(req.params.id, 10); // use radix 10
//   const student = students.find((s) => s.id === studentId);
//   if (!student) return res.status(404).send("Student not found");
//   res.render('studentDetails', { title: 'Student Details', student });
// };
const getSingleStudent=async(req,res,next)=>{
  //try{
    const student=await fetchSingleStudent(req.params.id)
   
 
  if (!student) {
    //err is a obj
   // const err=new Error('student not found from array')
    const err=new NotFoundError('student not found from array')
   //err.statusCode=404
    //err handle next middlwre kodukkum
   // return next(err)
  throw(err)
  }
  res.render('studentDetails',{title:'student details',student})

  // }catch(err){
  //  // return res.status(500).send("student not found")
  //   //kitiya errne middlewre kodukkm
  //   next(err)

  // }
}

// Export all controllers
module.exports = {
  getAllStudents,
  getAddStudents,
  addFormStudents,
  getSingleStudent,
};
