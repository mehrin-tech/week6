// let teachers=[
//     {id:1,name:"Mrs.Lakshmi",sub:'Math'},
//     {id:2,name:'Mr.Sunil',sub:'science'}
// ]
// const getAllTeachers=(req,res)=>{
//     res.render('teachers',{title:'All teachers',teachers})
// }
// const getAddTeachers=(req,res)=>{
//     res.render('addTeacher',{title:'add Teacher'})
// }
// const addFormTeachers=(req,res)=>{
//     const  {name,sub}=req.body
//     const newTchr={
//       id:teachers.length+1,
//       name,
//       sub,
//     }
//     teachers.push(newTchr)
//     res.redirect('/teachers')
// }
// const getSingleTeacher=(req,res)=>{
//     const teacher=teachers.find(t=>t.id===parseInt(req.params.id))
//     if(!teacher) return res.status(404).send("teachers not found")
//         res.render('teacherDetails',{title:'teacher details',teacher})
// }

// module.exports={
//     getAllTeachers,
//     getAddTeachers,
//     addFormTeachers,
//     getSingleTeacher,
// }
// Sample teacher data
let teachers = [
  { id: 1, name: "Mrs. Lakshmi", sub: "Math" },
  { id: 2, name: "Mr. Sunil", sub: "Science" },
];

// Controller: List all teachers
const getAllTeachers = (req, res) => {
  res.render('teachers', { title: 'All Teachers', teachers });
};

// Controller: Show add teacher form
const getAddTeachers = (req, res) => {
  res.render('formTeacher', { title: 'add Teacher' });
};

// Controller: Handle form submission to add new teacher
const addFormTeachers = (req, res) => {
  const { name, sub } = req.body;

  const newTeacher = {
    id: teachers.length + 1,
    name,
    sub,
  };

  teachers.push(newTeacher);
  res.redirect('/teachers');
};

// Controller: View a single teacher's details
const getSingleTeacher = (req, res) => {
  const teacherId = parseInt(req.params.id, 10);
  const teacher = teachers.find((t) => t.id === teacherId);

  if (!teacher) {
    return res.status(404).send("Teacher not found");
  }

  res.render('teacherDetails', { title: 'Teacher Details', teacher });
};

// Export all controllers
module.exports = {
  getAllTeachers,
  getAddTeachers,
  addFormTeachers,
  getSingleTeacher,
};
