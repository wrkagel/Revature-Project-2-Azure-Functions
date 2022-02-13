import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";
import { Pool } from "pg";

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
    }   else if(req.method === "PATCH") {
        context.log('Updating an employee.');

    const pool = new Pool({
        host:process.env.POSTGRES_HOST,
        user:process.env.POSTGRES_USER,
        password:process.env.POSTGRES_PASSWORD,
        database:"postgres",
        port:5432,
        ssl:true
    });

    const employee = req.body;
    if(!employee || !employee.password || !employee.id) {
        context.res = {
            body:"Missing required information for update.",
            status:400
        }
        return;
    }

    try {
        await pool.query("update \"Employee\" set \"password\" = $1 where id = $2", [employee.password, employee.id]);
        context.res = {
            body:"Successfully updated."
        }        
    } catch (error) {
        context.res = {
            body:"Error updating.",
            status:500
        }
    }

    await pool.end();   
    }

};

export default httpTrigger;