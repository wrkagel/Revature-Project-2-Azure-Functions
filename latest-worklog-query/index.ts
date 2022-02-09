import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const response = await axios.get(`http://20.72.189.253:3000/worklogs`)
    const response2 = await axios.get(`http://20.72.189.253:3000/employees`)
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
    for(let i = 0; i < employees.length; i++){
        empWorklogs[employees[i].id].fname = employees[i].fname
        empWorklogs[employees[i].id].lname = employees[i].lname
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify(empWorklogs)
    };

};

export default httpTrigger;