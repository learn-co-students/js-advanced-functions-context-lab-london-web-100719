const createEmployeeRecord = (array) => {
    return {
        firstName: array[0], 
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordArray) => {
    return recordArray.map(record => createEmployeeRecord(record));
}

const createTimeInEvent = function(datestamp) {
    const [date, time] = datestamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time),
        date, 
    });
    return this;
}

const createTimeOutEvent = function(datestamp) {
    const [date, time] = datestamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time),
        date, 
    });
    return this;
}

const hoursWorkedOnDate = function(date) {
    const timeIn = this.timeInEvents.find(recordDate => recordDate.date === date).hour;
    const timeOut = this.timeOutEvents.find(recordDate => recordDate.date === date).hour;
    
    return (timeOut - timeIn) / 100;
}

const wagesEarnedOnDate = function(datestamp) {
    return this.payPerHour * hoursWorkedOnDate.call(this, datestamp);
}

let allWagesFor = function () {
    let dates = this.timeInEvents.map(event => event.date);

    return dates.reduce((wageTotal, date) => {
        return wageTotal + wagesEarnedOnDate.call(this, date)
    }, 0)
}

const findEmployeeByFirstName = (recordArray, firstName) => {
    return recordArray.find(record => record.firstName == firstName);
}

const calculatePayroll = (recordArray) => {
    return recordArray.reduce((sum, record) => allWagesFor.call(record) + sum, 0 );
}