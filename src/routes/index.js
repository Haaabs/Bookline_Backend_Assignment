const express = require('express')
const { signUpUser, loginUser, storeStudentDetails, storeClassDetails, getScore } = require('../controllers')
const { validateSignUpRequest, validateLoginRequest, isRequestValidated } = require('../validators')
const router = express.Router()

//signup and login api for user
router.post('/signup', validateSignUpRequest, isRequestValidated,signUpUser)
router.post('/login', validateLoginRequest, isRequestValidated, loginUser)

//api to store student details
router.post('/student', storeStudentDetails)

//api to store class details
router.post('/class', storeClassDetails)

//api to get score for a class in particular subject
router.get('/score', getScore)

module.exports = router;