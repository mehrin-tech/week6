const express=require('express')
const router=express.Router()
const {
    getAllStudents,
     getAddStudents,
      addFormStudents,
       getSingleStudent}=require('../controllers/studentControllers')

let students=[
    {id:1,name:"Rahul",grade:"10"},
    {id:2,name:"Rihan",grade:"9"}

]
//show all students
router.get('/',getAllStudents)
//show add form
router.get('/add',getAddStudents)
//handle form submission
router.post('/add',addFormStudents)
//view single stdunt

router.get('/:id',getSingleStudent)

module.exports=router