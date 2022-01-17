Project plan:
1. See challenge
2. Discuss features
3. Database design
4. Assign task
5. Start dev on backend + frontend 

**What this example project will provide**
1. Frontend made with React.js
2. Backend API server for frontend to call
3. MYSQL Database to store data for API server to retrieve from

**What to install**

Mysql Workbench - https://dev.mysql.com/downloads/workbench/     , set password to "root" (common pw), choose developer default.

Node - https://nodejs.org/en/ , LTS version


If you have not done ```npm install```, please do so in project root folder before running the commands below

**Config**
1. Open MYSQL Workbench, go to schemas tab, right click and select "create schema". Use the name seeddb.
2. The file queries.js in /backend will need to configure to connect to that specific database. (should be configured to "seeddb")

**Backend Startup**
Run in CMD in project root:
```sh
cd \backend\

node server.js
```
You should see the message: "App is running on port 5050"

If have error:
Powershell - $env:NODE_OPTIONS="--openssl-legacy-provider"

**React Frontend Startup**
Run in CMD in project root:
```sh
npm start
```
The browser should open up after seeing the message: "Starting the development server..."

**Links for references**

Main: https://bezkoder.com/react-node-express-mysql/

Others: 
https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-react-app-with-nodejs-bc06fa1c18f3
