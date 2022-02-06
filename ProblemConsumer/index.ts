import { AzureFunction, Context } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos";

const cosmosClient = new CosmosClient(process.env.COSMOS_CONN)
const database = cosmosClient.database("room-service-db")
const container = database.container("problems")

const serviceBusQueueTrigger: AzureFunction = async function(context: Context, mySbMsg: any): Promise<void> {
    
    const problem = JSON.parse(mySbMsg)
    container.items.create(problem)
    context.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx', mySbMsg);
};

export default serviceBusQueueTrigger;
