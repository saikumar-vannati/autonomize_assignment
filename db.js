const { v4: uuidv4 } = require('uuid')
const logger = require('./logger')

class EmployeeDb {

    constructor() {
        this.employees = {};
    }

    getAll() {
        return Object.values(this.employees)
    }

    getById(id) {
        return this.employees[id]
    }

    add(employee) {
        let id = uuidv4()
        employee.id = id
        this.employees[id] = employee
        logger.debug(`Employee is created with id ${id}`)
        return true;
    }

    updateById(id, employee) {
        if (this.employees[id]) {
            employee.id = id
            this.employees[id] = employee
            return this.employees[id]
        }
    
        return null;
    }

    deleteById(id) {
        if (this.employees[id]) {
            delete this.employees[id]
            logger.debug(`Employee is deleted with id ${id}`)
            return true;
        }
    
        return false;
    }
}

const db = new EmployeeDb()

module.exports = db;