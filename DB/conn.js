const mongoose = require('mongoose');

const  {DevServer} = require('./config');

const DB = DevServer.url;
// console.log("..........DevServer.url.............",DB)

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log('MongoDB Atlas Connection Successfully!');
}).catch((error) => {
    console.log("No Connection: ", error);
})
