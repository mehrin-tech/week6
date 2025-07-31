const express=require('express')
const {
    getAllTeachers,
    getAddTeachers,
    addFormTeachers,
    getSingleTeacher
}=require('../controllers/teacherControllers')

const router=express.Router()

let teachers=[
    {id:1,name:"Mrs.Lakshmi",sub:'Math'},
    {id:2,name:'Mr.Sunil',sub:'science'}
]
//show all teachers

router.get('/',getAllTeachers)

//show add teachers
router.get('/add',getAddTeachers)

//handle form submission

router.post('/add',addFormTeachers)

//view single
router.get('/:id',getSingleTeacher)

module.exports=router