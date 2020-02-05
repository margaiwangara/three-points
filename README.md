## Three Points - Indoor Navigation System API

A REST API for an indoor navigation system utilizing Node.js (Express) and MongoDB as the DB.

#### Language

- JavaScript (TypeScript)

#### Packages

- Express.js - Framework
- Mongoose - MongoDB handling
- DotEnv - env variables
- Node-Dijkstra - calculating nearest location

#### Linting

- ESLint
- Prettier
- Airbnb

#### Licence

- MIT

Entire project is strongly typed written in TypeScript. Contains a data.json file for database population with a seeder file in the utils folder.

#### Advanced Results

Advanced Results middleware contains sorting, selecting and pagination.

##### Sorting

To sort the data in a particular order based on a certain document field:
`-field` represents sorting in a descending order (highest to lowest) while `field` represents sorting in an ascending order (lowest to highest).

Example: `http://localhost:5002/api/stores?sort=-dateCreated`

##### Selecting

To select specific fields select is utilized with comma-separated values.

Example: `http://localhost:5002/api/store?select=title,description,id,dateCreated` will only return data with the specified fields. ie. title, description, id and dateCreated

##### Pagination

Pagination contains limit and page number

Example: `http://localhost:5002/api/store?limit=10&page=2` displays results on page 2 with a limit of 10 results per page therefore page 2 starts at result no 11.

#### Error Handling Middleware

Error handling middleware handles all errors thrown by the application and displays a user-friendly message and returns a status code based on error.

#### Shortest Distance Query

To get the shortest distance from a certain location, from and to queries should be passed from the url.

Example: `http://localhost:5002/api/stores?from=1&to=5` will return the shortest distance from location 1 to location 5.

When `from` and `to` queries are not passed, the API returns all data from the collection.
