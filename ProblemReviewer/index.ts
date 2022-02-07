import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos";

const cosmosClient = new CosmosClient(process.env.COSMOS_CONN)
const database = cosmosClient.database("room-service-db")
const container = database.container("problems")

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const {id} = req.params

   
    if(req.method === "PATCH"){

        const {status} = req.body;
        const response = await container.item(id,id).read()
        const problem = response.resource;
        problem.status = status;
        container.items.upsert(problem);

        context.res = {
            body: 'responseMessage'
        };
    

    }else{

        if(id){
            const response = await container.item(id,id).read()
            const problem = response.resource;

            context.res = {
                body: problem
            };
        
        }else{
            const response = await container.items.readAll().fetchAll();
            const problems = response.resources

            context.res = {
                body: problems,
                
            };   
        }   
    }
    

};

export default httpTrigger;