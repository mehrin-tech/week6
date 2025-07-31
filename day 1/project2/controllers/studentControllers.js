let students=[
    {id:1,name:"Rahul",grade:"10"},
    {id:2,name:"Rihan",grade:"9"}

]


const getAllstudents=(req,res)=>{
    res.render('students',{title:'all students',students})
}
const getAddStudents=(req,res)=>{
    res.render('addStudent',{title:'add student'})
}
const addFormStudents=(req,res)=>{
    const {name,grade}=req.body
    const newStd={
        id:students.length+1,
        name,
        grade,
    }
students.push(newStd)
res.redirect('/students')
}
const getSingleStudent=(req,res)=>{
    const student=students.find(s=>s.id===parseInt(req.params.id))
    if(!student) return res.status(404).send("student not found")
        res.render('studentDetails',{title:'student details',student})
}
module.exports={
    getAllstudents,
    getAddStudents,
    addFormStudents,
    getSingleStudent
}