const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    classTeacher: { type: String, required: true, trim: true },
    subjectList: [
        { type: String, required: true }
    ],
    students: [
        {
            rollNo: { type: Number },
            studentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
            subjects: [
                {
                    subject: { type: String },
                    marks: { type: Number }
                }
            ]
        }
    ],
    createdAt: Date,
    updatedAt: Date
}, { timeStamp: true })

module.exports = mongoose.model('Class', classSchema)