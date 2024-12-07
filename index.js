const express = require("express");
const app = express();
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

const Port = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }))
app.use(express.json());
app.use(cors())


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).json({
        message: "Internal Server Error",
        status: false,
    });
});

require('./DB/conn');

require('./MainRoutes')(app);

app.get("/", async (req, res) => {
    res.status(400).json({
        message: "test",
        status: false,
    });
});

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
