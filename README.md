## imkoBot
ImkoBot is a framework to create a telegram robot application in a simple way without any change in codes. Before running the application do following steps:

# 1- Install packages
Install packages with:
$ npm install

# 2- Create a bot
After creating a bot in telegram using botfather set BOT_TOKEN in config.js

# 3- Create Mongo Database
Make a database in MongoDb and set DATABASE_URL in config.js. In this step you should define your keyboards by creating telemodels and generalinfos tables in your database. You can use the following commands to create sample tables in your database and see the relations between tables:
$ mongoimport -h <databaseAddress> -d <databaseName> -c telemodels -u <username> -p <password> --file telemodels.json
$ mongoimport -h <databaseAddress> -d <databaseName> -c generalinfos -u <username> -p <password> --file generalinfos.json


# 4- Files 
Put your files in files folder and set the names by considering their name in generalinfos table

# 5- Run application
You can easily run application with:
$ node app.js







