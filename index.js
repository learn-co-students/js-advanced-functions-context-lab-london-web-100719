/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const createEmployeeRecord = (employee) => {
//     return {
//         firstName: employee[0],
//         familyName: employee[1],
//         title: employee[2],
//         payPerHour: employee[3],
//         timeInEvents: [],
//         timeOutEvents: []
//     }
// }

const createEmployeeRecord = (employee) => {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (employees) => {
    return employees.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = function (time) {
    let [date, hour] = time.split(" ")
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date,
    })
    return this
}

const createTimeOutEvent = function (time) {
    let [date, hour] = time.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date,
    })
    return this
}

const hoursWorkedOnDate = function (date) {
    let timeIn = this.timeInEvents.find(e => e.date === date)
    let timeOut = this.timeOutEvents.find(e => e.date === date)
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
}

const wagesEarnedOnDate = function (date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

const calculatePayroll = (employees) => {
    return employees.reduce((payroll, employee) => payroll + allWagesFor.call(employee), 0)
}

const findEmployeeByFirstName = (employees, firstName) => {
    return employees.find(employee => employee.firstName === firstName)
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}




// the payroll system
//     process an Array of Arrays into an Array of employee records
//       8) has a function called createEmployeeRecords
//       createEmployeeRecords
//         9) its implementation makes use of of the createEmployeeRecord function
//         10) creates two records
//         11) correctly assigns the first names
//     it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
//       12) has a function called createTimeInEvent
//       createTimeInEvent
//         13) creates the correct type
//         14) extracts the correct date
//         15) extracts the correct hour
//     it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
//       16) has a function called createTimeOutEvent
//       createTimeOutEvent
//         17) creates the correct type
//         18) extracts the correct date
//         19) extracts the correct hour
//     Given an employee record with a date-matched timeInEvent and timeOutEvent
//       20) hoursWorkedOnDate calculates the hours worked when given an employee record and a date
//       hoursWorkedOnDate
//         21) calculates that the employee worked 2 hours
//     Given an employee record with a date-matched timeInEvent and timeOutEvent
//       22) wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
//       wagesEarnedOnDate
//         23) calculates that the employee earned 54 dollars
//         24) uses hoursWorkedOnDate
//     Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
//       ✓ allWagesFor aggregates all the dates' wages and adds them together
//       allWagesFor
//         25) calculates that the employee earned 378 dollars
//         26) uses wagesEarnedOnDate
//     Given an array of multiple employees
//       27) payrollExpense aggregates all the dates' wages and adds them together
//       payrollExpense
//         28) calculates that the employees earned 770 dollars
//     runs payroll using the mock data provided by Ultron data systems
//       Dependent functions: createEmployeeRecords
//         takes CSV data, returns an array of employee records
//           29) exists
//           30) returns an Array with 2 records for Loki and Natalia
//       Dependent functions: findEmployeeByFirstName(collection, firstNameString)
//         31) exists
//         32) finds "Loki" 
//       Full Payroll Test
//         from several imported CSV structures
//           calculatePayroll
//             33) exists
//             34) correctly sums the payroll burden to $11,880 when passed an array of employee records