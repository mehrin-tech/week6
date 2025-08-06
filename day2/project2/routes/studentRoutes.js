const express=require('express')
const { getAllStudents,getFormStudent,addFormStudent,getSingleStudent } = require('../controllers/studentControllers')
const router=express.Router()

//dummy arr
let students=[
  {id:1,name:'rahul',grade:'12'},
  {id:2,name:'rihan',grade:'10'}
]


//show all students
router.get('/',getAllStudents)

//show add form
router.get('/add',getFormStudent)

//handle form submission
router.post('/add',addFormStudent)

//view single student
router.get('/:id',getSingleStudent)
module.exports=router