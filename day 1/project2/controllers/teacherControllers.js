let teachers=[
    {id:1,name:"Mrs.Lakshmi",sub:'Math'},
    {id:2,name:'Mr.Sunil',sub:'science'}
]
const getAllTeachers=(req,res)=>{
    res.render('teachers',{title:'All teachers',teachers})
}
const getAddTeachers=(req,res)=>{
    res.render('addTeacher',{title:'add Teacher'})
}
const addFormTeachers=(req,res)=>{
    const  {name,sub}=req.body
    const newTchr={
      id:teachers.length+1,
      name,
      sub,
    }
}
const getSingleTeacher=(req,res)=>{
    const teacher=teachers.find(t=>t.id===req.params.id)
    if(!teacher) return res.status(404).send("teachers not found")
        res.render('teacherDetails',{title:'teacher details',teacher})
}

module.exports={
    getAllTeachers,
    getAddTeachers,
    addFormTeachers,
    getSingleTeacher,
}