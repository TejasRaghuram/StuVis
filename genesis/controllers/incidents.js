const Incident = require('../models/Incident');

const create = async (req, res) => {
    const {
        id,
        type,
        date,
        students,
        school
    } = req.body;

    try {
        const incident = Incident.create({
            id,
            type,
            date,
            students,
            school
        });
        res.status(200).json(incident);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const all = async (req, res) => {
    try {
        const incidents = await Incident.find({});
        res.status(200).json(incidents);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const get = async (req, res) => {
    try {
        const incident = await Incident.findOne({id: req.query.id});
        if(incident)
        {
            res.status(200).json(incident);
        }
        else
        {
            res.status(400).json({error: 'Incident Does Not Exist'});
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