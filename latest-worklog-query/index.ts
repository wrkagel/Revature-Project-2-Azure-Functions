import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const response = await axios.get(`http://20.75.185.122:3000/worklogs`);
    const response2 = await axios.get(`http://20.75.185.122:3000/employees`);
    const worklogs = response.data
    const employees = response2.data

    const empWorklogs = {}
    for(let i = 0; i<worklogs.length;i++){
        const current = empWorklogs[worklogs[i].employeeId];
        const logTime = new Date(worklogs[i].timestamp).valueOf();
        if(!current || logTime>current.logTime){
            empWorklogs[worklogs[i].employeeId] = worklogs[i]
            empWorklogs[worklogs[i].employeeId].logTime = logTime
        }
    }
    const returnArr = [];
    for(let i = 0; i < employees.length; i++){
        const index = employees[i].id;
        const workLog = empWorklogs[index];
        if(workLog) {
            workLog.fname = employees[i].fname
            workLog.lname = employees[i].lname
            returnArr.push(workLog);
        }
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify(returnArr)
    };

};

export default httpTrigger;