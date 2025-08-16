const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let students = [];
let courses = [
    { id: 1, name: 'JavaScript Basics' },
    { id: 2, name: 'Node.js Fundamentals' }
];

// Home
app.get('/', (req, res) => {
    res.send('Welcome to our school');
});

// Registration form
app.get('/register', (req, res) => {
    res.render('register');
});

// Handle registration
app.post('/register', (req, res) => {
    const { name, age } = req.body;
    const newStudent = {
        id: students.length + 1,
        name,
        age
    };
    students.push(newStudent);

    // Pass student to courses page
    res.render('courses', { std: newStudent, courses });
});

// Courses page (if visited directly, no student info)
app.get('/courses', (req, res) => {
    res.render('courses', { std: null, courses });
});

app.listen(5001, () => console.log('http://localhost:5001'));
