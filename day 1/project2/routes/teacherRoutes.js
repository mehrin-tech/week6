// const express=require('express')
// const {
//     getAllTeachers,
//     getAddTeachers,
//     addFormTeachers,
//     getSingleTeacher
// }=require('../controllers/teacherControllers.js')

// const router=express.Router()

// //show all teachers

// router.get('/',getAllTeachers)

// //show add teachers
// router.get('/add',getAddTeachers)

// //handle form submission

// router.post('/add',addFormTeachers)

// //view single
// router.get('/:id',getSingleTeacher)

// module.exports=router
const express = require('express');
const router = express.Router();

const {
  getAllTeachers,
  getAddTeachers,
  addFormTeachers,
  getSingleTeacher
} = require('../controllers/teacherControllers');

// GET /teachers - List all teachers
router.get('/', getAllTeachers);

// GET /teachers/add - Show add teacher form
router.get('/add', getAddTeachers);

// POST /teachers/add - Handle form submission
router.post('/add', addFormTeachers);

// GET /teachers/:id - View single teacher details
router.get('/:id', getSingleTeacher);

module.exports = router;
