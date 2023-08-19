const assert = require('assert')
const test = require('node:test')
const fetch = require("node-fetch")

const DOMAIN_URL = "http://localhost:8080"

let USERID1 = ""
let USERID2 = ""

test("Autonomize Assignment APIs", async (t) => {

    // Testing Add Employee API end point
    await t.test("Add Employee API", async (t) => {

        // Success response: Should be able to create employee successfully
        // Should return status 200 success for both employees
        await t.test("Success: Should create Employee successfully", async (t) => {
            let headers = new Headers();
            headers.set('Content-Type', 'application/json')

            const body = {
                "employeeName": "Saikumar Vannati",
                "salaryAmount": "25000",
                "age": 20,
                "email": "sai1@email.com",
                "degreeDetails": [
                    "Btech"
                ]
            }

            const response = await fetch(`${DOMAIN_URL}/api/employees`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })

            assert.strictEqual(response.status, 201, "Should return 201 status")

            const newEmployeeData = {
                "employeeName": "SK Vannati",
                "salaryAmount": "250000",
                "age": 25,
                "email": "sai2@email.com",
                "degreeDetails": [
                    "Btech", "Mtech"
                ]
            }

            const newResponse = await fetch(`${DOMAIN_URL}/api/employees`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })

            assert.strictEqual(newResponse.status, 201, "Should return 201 status")
        });

        // Error response: Employee name field is not present
        // Should return validation message with 400 status
        await t.test("Error: Should return validation error ", async (t) => {
            let headers = new Headers();
            headers.set('Content-Type', 'application/json')

            const body = {
                "salaryAmount": "25000",
                "age": 20,
                "email": "sai1@email.com"
            }

            const response = await fetch(`${DOMAIN_URL}/api/employees`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })

            assert.strictEqual(response.status, 400, "Should return 400 status")
            const resMsg = await response.text();
            assert.strictEqual(resMsg, "Please provide valid details", "Should return a validation message")
        });
    });

    // Test Get All Employees end point
    await t.test("Get All Employees API", async (t) => {

        //Success response: Should return list of employees
        await t.test("Success: Should return list of all Employees", async (t) => {

            const response = await fetch(`${DOMAIN_URL}/api/employees`, {
                method: 'GET'
            })

            const responseBody = await response.json()

            assert.strictEqual(response.status, 200, "Should return 200 status")

            assert.ok(responseBody, "Should return list of employees")
            assert.ok(responseBody.length > 0, "Should return list of employees")

            USERID1 = responseBody[0]['id']
            USERID2 = responseBody[0]['id']
        })
    })

    // Test Get Employee API
    await t.test("Get Employee API", async (t) => {

        // Success response: Should return employee data given Employee id
        // Should return status code 200
        await t.test("Sucess: Should return employee data successfully", async (t) => {
            const response = await fetch(`${DOMAIN_URL}/api/employees/${USERID1}`, {
                method: 'GET'
            })

            const responseBody = await response.json()

            assert.strictEqual(response.status, 200, "Should return 200 status")

            assert.ok(responseBody, "Should return employee data")

            let expected = {
                "employeeName": "Saikumar Vannati",
                "salaryAmount": "25000",
                "age": 20,
                "email": "sai1@email.com",
                "degreeDetails": [
                    "Btech"
                ]
            }
            expected.id = USERID1
            assert.deepEqual(responseBody, expected, "Should return valid employee data")
        })

        // Error case: Passing invalid ID
        // Should return validation error with status 400
        await t.test("Error: Should return validation error", async (t) => {
            const response = await fetch(`${DOMAIN_URL}/api/employees/some-invalid-uuid`, {
                method: 'GET'
            })

            assert.strictEqual(response.status, 400, "Should return 400 status")
            const resMsg = await response.text();
            assert.strictEqual(resMsg, "Please provide valid details", "Should return a validation message")
        })

        // Error case: Passing valid ID but employee id not available in the database
        // Should return employee not found with status 404
        await t.test("Error: Should return employee not found", async (t) => {
            const response = await fetch(`${DOMAIN_URL}/api/employees/773714b8-2d7e-4bc3-8ff0-5b06481b5681`, {
                method: 'GET'
            })

            assert.strictEqual(response.status, 404, "Should return 404 status")
            const resMsg = await response.text();
            assert.strictEqual(resMsg, "Employee not found, please provide valid details", "Should return employee not found message")
        })
    })

    await t.test("Update Employee API", async (t) => {

        // Success response: Updating the existing employee data
        // Should return updated employee details with status 200
        await t.test("Success: Should Update Employee successfully", async (t) => {
            let headers = new Headers();
            headers.set('Content-Type', 'application/json')

            const body = {
                "employeeName": "Saikumar Vannati",
                "salaryAmount": "25000",
                "age": 20,
                "email": "sai1@email.com",
                "degreeDetails": [
                    "Btech", "PhD"
                ]
            }

            const response = await fetch(`${DOMAIN_URL}/api/employees/${USERID1}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)
            })

            assert.strictEqual(response.status, 200, "Should return 200 status")

            const responseBody = await response.json();

            body.id = USERID1;

            assert.deepEqual(responseBody, body, "Should return updated employee details")
        })

        // Error case: Passing invalid ID
        // Should return validation error with status 400
        await t.test("Error: Should return validation error for invalid ID", async (t) => {
            let headers = new Headers();
            headers.set('Content-Type', 'application/json')

            const body = {
                "employeeName": "Saikumar Vannati",
                "salaryAmount": "25000",
                "age": 20,
                "email": "sai1@email.com",
                "degreeDetails": [
                    "Btech", "PhD"
                ]
            }

            const response = await fetch(`${DOMAIN_URL}/api/employees/some-random-uuid`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)
            })

            assert.strictEqual(response.status, 400, "Should return 400 status")
            const resMsg = await response.text();
            assert.strictEqual(resMsg, "Please provide valid details", "Should return a validation message")
        })

        // Error response: Employee name field is not present
        // Should return validation message with 400 status
        await t.test("Error: Should return validation error", async (t) => {
            let headers = new Headers();
            headers.set('Content-Type', 'application/json')

            const body = {
                "salaryAmount": "25000",
                "age": 20,
                "email": "sai1@email.com",
                "degreeDetails": [
                    "Btech", "PhD"
                ]
            }

            const response = await fetch(`${DOMAIN_URL}/api/employees/${USERID2}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)
            })

            assert.strictEqual(response.status, 400, "Should return 400 status")
            const resMsg = await response.text();
            assert.strictEqual(resMsg, "Please provide valid details", "Should return a validation message")
        })

        // Error case: Passing valid ID but employee id not available in the database
        // Should return employee not found with status 404
        await t.test("Error: Should return employee not found", async (t) => {
            let headers = new Headers();
            headers.set('Content-Type', 'application/json')

            const body = {
                "employeeName": "Saikumar Vannati",
                "salaryAmount": "25000",
                "age": 20,
                "email": "sai1@email.com",
                "degreeDetails": [
                    "Btech", "PhD"
                ]
            }

            const response = await fetch(`${DOMAIN_URL}/api/employees/773714b8-2d7e-4bc3-8ff0-5b06481b5681`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)
            })

            assert.strictEqual(response.status, 404, "Should return 404 status")
            const resMsg = await response.text();
            assert.strictEqual(resMsg, "Employee not found, please provide valid details", "Should return employee not found message")
        })

    })

    await t.test("Delete Employee API", async (t) => {

        // Success: Should delete the existing employee data
        // Should return status 204 deleted
        await t.test("Sucess: Should delete employee data successfully", async (t) => {
            const response = await fetch(`${DOMAIN_URL}/api/employees/${USERID1}`, {
                method: 'DELETE'
            })

            assert.strictEqual(response.status, 204, "Should return 204 status")

            const newResponse = await fetch(`${DOMAIN_URL}/api/employees/${USERID1}`, {
                method: 'GET'
            })

            assert.strictEqual(newResponse.status, 404, "Should return 404 status")
            const resMsg = await newResponse.text();
            assert.strictEqual(resMsg, "Employee not found, please provide valid details", "Should return employee not found message after deleting")
        })

        // Error case: Passing invalid ID
        // Should return validation error with status 400
        await t.test("Error: Should return validation error", async (t) => {
            const response = await fetch(`${DOMAIN_URL}/api/employees/some-invalid-uuid`, {
                method: 'DELETE'
            })

            assert.strictEqual(response.status, 400, "Should return 400 status")
            const resMsg = await response.text();
            assert.strictEqual(resMsg, "Please provide valid details", "Should return a validation message")
        })

        // Error case: Passing valid ID but employee id not available in the database
        // Should return employee not found with status 404
        await t.test("Error: Should return employee not found", async (t) => {
            const response = await fetch(`${DOMAIN_URL}/api/employees/773714b8-2d7e-4bc3-8ff0-5b06481b5681`, {
                method: 'DELETE'
            })

            assert.strictEqual(response.status, 404, "Should return 404 status")
            const resMsg = await response.text();
            assert.strictEqual(resMsg, "Employee not found, please provide valid details", "Should return employee not found message")
        })
    })

    // 404: Route Not found
    await t.test("404 - Route not found", async (t) => {

        // For routes other than, /api/employees/, app should return 404
        await t.test("Should return 404 Employee not found", async (t) => {

            const response = await fetch(`${DOMAIN_URL}/api/random`, {
                method: 'DELETE'
            })

            assert.strictEqual(response.status, 404, "Should return 404 not found status")

            const responseBody = await response.text();

            assert.strictEqual(responseBody, "Route not found", "Should return route not found message")
        })
    })
})