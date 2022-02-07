import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const {room} = req.query
    const response = await axios.get<any[]>("http://20.72.189.253:3000/servicerequests");
    const servicerequests = response.data;
    const serviceRequestsForRoom = [];
    servicerequests.forEach(r => {
        if(r.room === room && !r.status.startsWith("C")) {
            serviceRequestsForRoom.push(r);
        }
        });

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify(serviceRequestsForRoom)
    };

};

export default httpTrigger;