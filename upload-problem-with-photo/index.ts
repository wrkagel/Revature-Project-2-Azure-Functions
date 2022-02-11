import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import busboy from 'busboy';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    if(!req.query.id || !req.query.ext) {
        context.res = {
            body: "Filename or extension not provided",
            status:400
        }
    }

    context.log('HTTP trigger function processed a request.');
    const bb = busboy({headers:req.headers});
    const {id, ext} = req.query;
    bb.on('file', function(name, file, info) {
        file.on('data', function(data) {
            context.bindings.fileBlob = data;
        });
    });
    bb.on('finish', function() {
        console.log('Done parsing form!');
    
        context.res = {
            status: 201,
            body: `https://wkrevaturestorage.blob.core.windows.net/triple-threat-resort-problems/${id}.${ext}`
        };
    });
    bb.write(req.body);

};

export default httpTrigger;