const { app } = require('@azure/functions');



const { sequelize } = require('./database/postgres_db');
const { client } = require('./database/redis_db'); // Import Redis client if needed
const todoRoutes = require('./routes/todos');
const swaggerDocs = require('./docs'); // Import Swagger documentation setup


require('dotenv').config(); // Load environment variables from .env file

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// const PORT =  3000; // Use PORT from .env or default to 3000

// sequelize.sync().then( _ => {
//         app.use('/todos', todoRoutes.router);
        
//         if (process.env.NODE_ENV === 'development') {
//             console.log('Running in development mode');
//         } else if (process.env.NODE_ENV === 'staging') {
//             console.log('Running in staging mode');
//         } else {
//             console.log('Running in production mode');
//         }

//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//             swaggerDocs(app, PORT); // Setup Swagger documentation
//         });
// })

app.http("helloWorld1", {
  methods: ["POST", "GET"],
  handler: async (request, context) => {
    context.log("Http function was triggered.");
    return { body: "Hello, world!" };
  },
});
