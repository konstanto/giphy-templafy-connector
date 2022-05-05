A Templafy Content Connector for Giphy

# Run locally

1. Clone the project
1. Run `npm install`
2. Run `npm run watch` 

#Deploy 
## Step 1: Get Giphy api token

1. Go to [Giphy Developers page](https://developers.giphy.com/dashboard/)
2. Create an account
3. Create a new API app
4. Grab the token for later use

## Step 2: Deploy 
### Example: Deploy to Azure

1. create an Azure Web App (Node 16)
1. Press `Get Publish Profile` and copy all text
1. In github go to `Settings` > `Secrets`
1. Create a new secret `secrets.AZUREAPPSERVICE_PUBLISHPROFILE` , and paste the text from `Get Publish Profile`	
1. Open `.github/workflows/deploy_main_to_azure_web_app.yml` to adjust the `app-name` to match the name of your Azure Web App 

# Step 3: Configure Templafy 

1. [Enable the Custom Content Connector](https://support.templafy.com/hc/en-us/articles/4688364239645) in the Templafy tenant
2. Set Client ID to "None"
3. Set Client Secret to the Giphy API token

Hint: For demo and test purposes the Templafy tenant's Custom Content conector can be configured to work with the local server. Simply use ngrok or similar tools to expose the local server's port 3000 to the internet.
