import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');


    const address:string = "http://20.75.185.122:3000";

    if(req.method === "POST") {

    const employee = req.body;
        
        const response = await axios.post(`${address}/employees`, employee);
        if(response) {
            context.res = {
                body:response.data,
                status:response.status,
                headers:response.headers
            };
        } else {
            context.res = {
                body: 'Error communicating with server',
                status: 500
            }
        }

    } else if(req.method === "GET") {
    
        const response = await axios.get(`${address}/employees`);
        if(response) {
            context.res = {
                body:response.data,
                status:response.status,
                headers:response.headers
            };
        } else {
            context.res = {
                body: 'Error communicating with server',
                status: 500
            }
        }
}

};

export default httpTrigger;