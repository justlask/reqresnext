# this is my template


# base folders will need to be initialized with npm

#  .gitignore 
/client/build
node_modules


# package.json
{
  "name": "YOUR PROJECTS NAME",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "preinstall": "echo --- preinstall --- && cd server && npm install && cd ../client && npm install && npm run build && cd ..",
    "start": "echo --- start --- && cd server && npm start",
    "dev:server": "cd server && npm run dev",
    "dev:client": "cd client && npm run start"
  },
  "engines": {
    "node": "8.9.4"
  }
}



