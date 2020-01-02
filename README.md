# README #

# Intro #
* CRUD for error details.
* Add.js adds new records,  Search.js searches for existing records, Delete.js deletes existing records, Update.js updates existing records.
* Add.js, Search.js, Delete.js, Update.js uses Server.js functions to query the Postgresql databasez
* Add.js uses addRow(event) to send a post request to server.js which then communicates with the database
* Search.js uses findRow(event) to send a post request to server.js which then communicates with the database
* Update.js uses updateRow(event) to send a patch request to server.js which then communicates with the database
* Delete.js uses deleteRow(event) to send a delete request to server.js which then communicates with the database
* Using postgresql, reactjs, and bootstrap.
* extra react libraries include : react-flash-message , reactstrap

### How do I get set up? ###
* Open 2 cmd, enter into the directory of the project in both cmd.
* Run npm start and node server.js in the 2 separate cmd
* npm start will start the website on localhost:3200
* node server.js will establish connection to postgresql database.
* run pgAdmin 4 for a direct interface with the database

## Database Postgresql Connection Details##
* user: 'cognicept',
* database: 'cruerrorclassification',
* password: 'cognicept18',
* host: '35.187.247.9',
* port: 5432,
* max: 10

## Database table structure ##
| Column Name     | Data Type    |
| --------|---------|
| Error Code  | String   |
| Error Type| String |
| Error Description| String |
| Robot Tags | Array separated|
| Resolution | Timestamp without time zone|

## Architecture Diagram##
![ArchitectureDiagram](img/architecture_diagram.png)


## Wireframe ##
![Wireframe](img/WireFrame.png)
