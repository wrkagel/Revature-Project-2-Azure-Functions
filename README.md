# AzureFunctionApp
## ***\*This project is for learning purposes only***
  Contains the Problem API and any other glue code functions for [Revature Project 2](https://github.com/wrkagel/Revature-Project-2).

## Problem API
- ### Problem Ingestion
  - HTTP triggered Azure function that puts the problem into an Azure Message Queue.
- ### Problem Consumer
  - Triggered when a message is added to the Message Queue.
  - Consumes the message form the queue and adds the problem to a CosmosDB.
- ### Problem Reviewer
  - HTTP triggered function that can do one of the following depending on the request method.
    - GET: Returns all problems currently in the DB.
    - GET with query param ID: Returns the problem whose ID matches the query param.
    - PATCH: Updates the status of the problem.
## Other Glue Code Functions
- Get Service Requests By Room
  - Returns service requests filtered by the provided room.
- Latest Work log Query: Returns an array of the latest work log for each employee joined with the employees name.
- Tech Relay Page
  - Acts as a relay for the tech page to other backend APIs.
  - This was necessary to get around an issue with Azure Static Web App hosting caused by using http for the backend API calls.
  - This was only an issue, because the backend had been pre-deployed and could not easily be redeployed.
- Upload Problem With Photo
  - Uploads a photo provided via form-data to an Azure Storage Container as a blob.
  - Uses a blob trigger in addition to the HTTP trigger to more easily accomplish this.