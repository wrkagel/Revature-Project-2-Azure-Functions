import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import busboy from 'busboy'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const bb = busboy({headers:req.headers});
    bb.on('file', (name, file, info) => {
        const {filename, encoding, mimeType} = info;
        
    });

};

export default httpTrigger;