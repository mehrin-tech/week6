const { NotFoundError } = require("../utils/errors")

let teachers=[
    {id:1,name:"Mrs.Lakshmi",sub:'Math'},
    {id:2,name:'Mr.Sunil',sub:'science'}
]
//simulatw async fetch
const fetchAllTeachers=()=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(teachers)
    },1000)
  })
}
//controller:List all students
const getAllTeachers=async(req,res)=>{
  try{
 const teachersList=await fetchAllTeachers()
 res.render('teachers',{title:'All Teachers',teachers:teachersList})
  }catch(err){
  console.log(err)
  res.status(500).send("failed to fetch teachers")
  }
}
// const getAllTeachers=(req,res)=>{
//     res.render('teachers',{title:'All teachers',teachers})
// }

//controller:show add teacher form
const getAddTeachers=(req,res)=>{
    res.render('formTeacher',{title:'add Teacher'})
}

//controller:handle form submission to add new student
const addFormTeachers=(req,res)=>{
    const  {name,sub}=req.body
    const newTeacher={
      id:teachers.length+1,
      name,
      sub,
    }
    teachers.push(newTeacher)
    res.redirect('/teachers')
}

//controller:view a single teachers details
// const getSingleTeacher=(req,res)=>{
//     const teacher=teachers.find(t=>t.id===parseInt(req.params.id))
//     if(!teacher) return res.status(404).send("teachers not found")
//         res.render('teacherDetails',{title:'teacher details',teacher})
// }

//fetch single teacher
const fetchSingleTeacher=(id)=>{
  return new Promise((res)=>{
    setTimeout(()=>{
      const teacher=teachers.find(t=>t.id===parseInt(id))
      res(teacher)
    },1000)
  })
}

const getSingleTeacher=async(req,res,next)=>{

 // try{
  const teacher=await fetchSingleTeacher(req.params.id)

  if(!teacher){
    const err=new NotFoundError('teacher not found from array')
    throw(err)
  }
  res.render('teacherDetails',{title:'teacher details',teacher})
// }catch(err){
//   next(err)
// }
}

module.exports={
    getAllTeachers,
    getAddTeachers,
    addFormTeachers,
    getSingleTeacher,
}
// // Sample teacher data
// let teachers = [
//   { id: 1, name: "Mrs. Lakshmi", sub: "Math" },
//   { id: 2, name: "Mr. Sunil", sub: "Science" },
// ];

// // Controller: List all teachers
// const getAllTeachers = (req, res) => {
//   res.render('teachers', { title: 'All Teachers', teachers });
// };

// // Controller: Show add teacher form
// const getAddTeachers = (req, res) => {
//   res.render('formTeacher', { title: 'add Teacher' });
// };

// // Controller: Handle form submission to add new teacher
// const addFormTeachers = (req, res) => {
//   const { name, sub } = req.body;

//   const newTeacher = {
//     id: teachers.length + 1,
//     name,
//     sub,
//   };

//   teachers.push(newTeacher);
//   res.redirect('/teachers');
// };

// // Controller: View a single teacher's details
// const getSingleTeacher = (req, res) => {
//   const teacherId = parseInt(req.params.id, 10);
//   const teacher = teachers.find((t) => t.id === teacherId);

//   if (!teacher) {
//     return res.status(404).send("Teacher not found");
//   }

//   res.render('teacherDetails', { title: 'Teacher Details', teacher });
// };

// // Export all controllers
// module.exports = {
//   getAllTeachers,
//   getAddTeachers,
//   addFormTeachers,
//   getSingleTeacher,
// };
