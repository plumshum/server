This is a MERN project from a Youtube Tutorial :D 
Link to project: https://www.youtube.com/watch?v=K8YELRmUb5o

### DAY 1: Understanding MERN Stack and Setting up the Backend Server and Configurations

MERN Stack: MongoDB, Express, React, Node.js

- MongoDB: NoSQL Database
- Express: Backend Framework
- React: Frontend Framework
- Node.js: JavaScript Runtime Environment

Some notes:

For MoongoDB, we need to create a cluster and a database in MongoDB Atlas. Then, to connect the database to the server, we need to install mongoose and configure the connection in the server file.

There's a bunch of configurations, Ill slowly go over them throughou the project. 
- ```helmet()``` is a middleware that helps secure the app by setting various HTTP headers.
- ```cors()``` is a middleware that enables the server to allow requests from different origins.
- ```dotenv``` is a module that loads environment variables from a .env file into `process.env`.