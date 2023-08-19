const db = require("../db")
const logger = require("../logger");

const { validUUID, validEmployee } = require("../utils/validator")

exports.getAll = (req, res) => {
    try {
        const employees = db.getAll();
        return res.status(200).send(employees);
    } catch (err) {
        logger.error(err);
        return res.status(500).send("Something went wrong, please try again later");
    }
}

exports.get = (req, res) => {
    try {
        if (!validUUID(req.params.id))
            return res.status(400).send("Please provide valid details");

        const employee = db.getById(req.params.id)
        if (!employee)
            return res.status(404).send("Employee not found, please provide valid details");

        return res.status(200).send(employee);
    } catch (err) {
        logger.error(err);
        return res.status(500).send("Something went wrong, please try again later");
    }
}

exports.add = (req, res) => {
    try {
        if (!validEmployee(req.body))
            return res.status(400).send("Please provide valid details");
        db.add(req.body)
        return res.status(201).send('Employee is created');
    } catch (err) {
        logger.error(err);
        return res.status(500).send("Something went wrong, please try again later");
    }
}

exports.update = (req, res) => {
    try {
        if (!validUUID(req.params.id) || !validEmployee(req.body))
            return res.status(400).send("Please provide valid details");

        const employee = db.updateById(req.params.id, req.body);
        if (!employee)
            return res.status(404).send("Employee not found, please provide valid details");

        return res.status(200).send(employee);
    } catch (err) {
        logger.error(err);
        return res.status(500).send("Something went wrong, please try again later");
    }
}

exports.delete = (req, res) => {
    try {
        if (!validUUID(req.params.id))
            return res.status(400).send("Please provide valid details");

        let status = db.deleteById(req.params.id);
        if (!status)
            return res.status(404).send("Employee not found, please provide valid details");

        return res.status(204).send('Employee is deleted');
    } catch (err) {
        logger.error(err);
        return res.status(500).send("Something went wrong, please try again later");
    }
}