
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;


mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'betadata'
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json())
app.use(express.urlencoded({extended: true}) )

const userRouter = require('./routes/user.js')
const climbRouter = require('./routes/climbs.js')

app.use('/user', userRouter);
app.use('/climbs', climbRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
  });



app.listen(PORT, ()=>{
    console.log('listening on port 3000')
})

module.exports = app;
