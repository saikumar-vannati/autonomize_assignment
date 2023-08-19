require('dotenv').config()
const express = require('express')

const logger = require('./logger')

const employeeRouter = require('./routes/employee')

// Default PORT is set to 8080. 
const PORT = process.env.APPLICATION_PORT || 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Employee API's router
app.use("/api/employees", employeeRouter);

// Set 404 error code for routes not availalble
app.use("*", (req, res) => res.status(404).send("Route not found"))

app.listen(PORT, () => {
    logger.info(`SERVER IS RUNNING ON PORT ${PORT}`)
});