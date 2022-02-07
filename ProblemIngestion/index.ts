import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ServiceBusClient } from "@azure/service-bus/";
import { v4 } from "uuid";

const client = new ServiceBusClient(process.env.PROBLEM_QUEUE)

interface Problem{
    id: string
    submittedTime: number
    desc: string
    category: string
    status: "Unreviewed" | "Reviewed"
    photoLink?: string
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const problemRequest:{desc:string, category:string} = req.body;
    const problemQueue = client.createSender("problem");
    const problem: Problem  ={
            id: v4(), 
            desc: problemRequest.desc,
            category: problemRequest.category,
            submittedTime: Date.now(),
            status: "Unreviewed"
          }

    try {
        await problemQueue.sendMessages({body:JSON.stringify(problem)})
        context.res = {
            body: "Problem was successfully added"
        };

    } catch (error) {

        context.res = {
            status:500,
            body: "Problem could not be processed"
        };
        
    }
   

};

export default httpTrigger;