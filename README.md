# autonomize_assignment

Setup Autonomize assignment:

Clone the respository

```git clone https://github.com/saikumar-vannati/autonomize_assignment.git```

Open autonomize_assignment directory

```cd autonomize_assignment```

Run npm install to install the required packages

```npm install```

Start the server. By default server will be running on PORT 8080. To change the port update .env file

```npm start```

To test the API's, please open the new terminal and run the following command

```npm test```

# System Configuration

Operating System: Ubuntu 22

Node.JS Version: v18.16.0


# Test Results

```
> autonomize_assignment@1.0.0 test
> node test.js

▶ Autonomize Assignment APIs
  ▶ Add Employee API
    ✔ Success: Should create Employee successfully (2531.519831ms)
    ✔ Error: Should return validation error  (13.797699ms)
  ▶ Add Employee API (2548.13563ms)

  ▶ Get All Employees API
    ✔ Success: Should return list of all Employees (7.354999ms)
  ▶ Get All Employees API (8.405499ms)

  ▶ Get Employee API
    ✔ Sucess: Should return employee data successfully (8.505999ms)
    ✔ Error: Should return validation error (6.4406ms)
    ✔ Error: Should return employee not found (5.6645ms)
  ▶ Get Employee API (22.023699ms)

  ▶ Update Employee API
    ✔ Success: Should Update Employee successfully (6.5939ms)
    ✔ Error: Should return validation error for invalid ID (7.604499ms)
    ✔ Error: Should return validation error (11.3847ms)
    ✔ Error: Should return employee not found (6.402099ms)
  ▶ Update Employee API (34.149398ms)

  ▶ Delete Employee API
    ✔ Sucess: Should delete employee data successfully (7.5222ms)
    ✔ Error: Should return validation error (6.479899ms)
    ✔ Error: Should return employee not found (4.7388ms)
  ▶ Delete Employee API (19.846599ms)

  ▶ 404 - Route not found
    ✔ Should return 404 Employee not found (4.6992ms)
  ▶ 404 - Route not found (5.2986ms)

▶ Autonomize Assignment APIs (2641.075823ms)

ℹ tests 1
ℹ pass 1
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2648.222523
```