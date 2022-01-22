# GoContact Technical Challenge

**Client boilerplate**: npx create-react-app (typescript)  

**Server boilerplate**: https://github.com/ljlm0402/typescript-express-starter (default)  

## How to setup
1. Create .env file in 'server' directory. 
2. Generate API Key for the Current Weather API from https://openweathermap.org/
3. Add the following keys to .env file:
   ```
   PORT=3001
   API_KEY=<generated_key>
   ```
   If you want to change the PORT variable, do it aswell in the nodemon.json file.
4. From the server directory, run the following command: 
   ```$ npm install && npm run start```
5. From the client directory, run the following command: 
   ```$ npm install && npm run start```
6. Open http://127.0.0.1:3000 in your browser.

Note: The logs of each request to the api are stored in the server/dist/logs/ directory.