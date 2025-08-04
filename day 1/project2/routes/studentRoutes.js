// const express=require('express')
// const router=express.Router()
// const {
//     getAllStudents,
//      getAddStudents,
//       addFormStudents,
//        getSingleStudent
//     }=require('../controllers/studentControllers.js')




// //show all students
// router.get('/',getAllStudents)
// //show add form
// router.get('/add',getAddStudents)
// //handle form submission
// router.post('/add',addFormStudents)
// //view single stdunt

// router.get('/:id',getSingleStudent)

// module.exports=router
const express = require('express');
const router = express.Router();

const {
  getAllStudents,
  getAddStudents,
  addFormStudents,
  getSingleStudent
} = require('../controllers/studentControllers');

// GET /students - List all students
router.get('/', getAllStudents);

// GET /students/add - Show add student form
router.get('/add', getAddStudents);

// POST /students/add - Handle form submission
router.post('/add', addFormStudents);

// GET /students/:id - View a single student by ID
router.get('/:id', getSingleStudent);

module.exports = router;
