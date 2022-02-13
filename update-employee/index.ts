import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Pool } from "pg";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
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

};

export default httpTrigger;