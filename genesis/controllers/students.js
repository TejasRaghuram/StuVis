const Student = require('../models/Student');

const create = async (req, res) => {
    const {
        name,
        id,
        grade,
        school,
        gender,
        race,
        residential_area,
        economically_disadvantaged,
        special_education,
        gifted,
        chronically_absent
    } = req.body;

    try {
        const student = Student.create({
            name,
            id,
            grade,
            school,
            gender,
            race,
            residential_area,
            economically_disadvantaged,
            special_education,
            gifted,
            chronically_absent
        });
        res.status(200).json(student);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const all = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const get = async (req, res) => {
    try {
        const student = await Student.findOne({id: req.query.id});
        if(student)
        {
            res.status(200).json(student);
        }
        else
        {
            res.status(400).json({error: 'Student Does Not Exist'});
        }
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    create,
    all,
    get
};