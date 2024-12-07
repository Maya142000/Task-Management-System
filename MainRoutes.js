const express = require('express');
const app = express();


const UserLogin = require('./controllers/Admin/UserRoutes') 


module.exports = (app) => {
    app.use('/UserLogin', UserLogin);
}