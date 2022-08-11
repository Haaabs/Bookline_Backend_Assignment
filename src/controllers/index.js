const User = require('../models/userModel')
const Student = require('../models/studentModel')
const Class = require('../models/classModel')
const jwt = require("jsonwebtoken");

exports.signUpUser = (req, res) => {
    //find if user already exists
    User.findOne({ userID: req.body.userID }).exec((error, user) => {
        //admin exist
        if (user)
            return res.status(400).json({
                message: 'User Id in use, choose some other Id'
            });
        //create user
        const { userID, password } = req.body;
        const _user = new User({ userID, password });
        //save user
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }
            if (data) {
                return res.status(201).json({
                    message: "User created Successfully"
                });
            }
        });
    });
}

exports.loginUser = (req, res) => {
    //find if user already exists
    User.findOne({ userID: req.body.userID }).exec((error, user) => {
        if (error) return res.status(400).json({
            message: "error"
        });
        //user exist
        if (user) {
            //find user is authenticated
            if (user.authenticate(req.body.password)) {
                // if entered password is correct then create token for that user
                const token = jwt.sign({ _id: user._id, _userID: user.userID }, process.env.JWT_SECRET, { expiresIn: '30d' });
                //const { _id, firstName, lastName, email, role, fullName } = user;
                res.cookie('token', token, { expiresIn: '1d' })
                res.status(200).json({
                    token,
                    user
                });
            } else {
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }
        } else {
            return res.status(400).json({
                message: 'User do not exist'
            });
        }
    });
}

exports.storeStudentDetails = (req, res) => {
    const { name, photo } = req.body
    DOB = new Date(req.body.dateofBirth)
    const _student = new Student({
        name, dateOfBirth: DOB, photo
    })
    _student.save((error, data) => {
        if (error) {
            return res.status(400).json({
                message: 'Something went wrong',
                error: error
            })
        } else {
            return res.status(201).json({
                message: "Student Registered Successfully"
            });
        }
    })

}

exports.storeClassDetails = (req, res) => {
    console.log(req.body)
    const { title, year, classTeacher, subjectList, students } = req.body;
    const _class = new Class({
        title, year, classTeacher, subjectList, students,
    })
    _class.save((error, data) => {
        if (error) {
            return res.status(400).json({
                message: 'Something went wrong',
                error: error
            })
        } else {
            return res.status(201).json({
                message: "Class Created Successfully"
            });
        }
    })
}

function createStudentListWithGivenSubject(students, subject) {
    const List = []
    for (let student of students) {
        const { studentID, subjects } = student
        for (let ob of subjects) {
            if (ob.subject === subject) {
                List.push({ studentID: studentID, marks: ob.marks })
            }
        }
    }
    return List;
}

exports.getScore = (req, res) => {
    //console.log(req.query)
    const { _class, subject } = req.query
    Class.findOne({ title: _class }).exec((error, data) => {
        if (data) {
            const students = data.students
            const studentList = createStudentListWithGivenSubject(students, subject)
            res.status(200).json({ studentList });
        } else {
            return res.status(400).json({
                message: "Class not found",
            });
        }
    })
}