const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect to database using URI from the mongodb atlas dashboard
const URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => console.log("Successfully connected to database."));

// article route
const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

// admin login route
const userRouter = require('./routes/user');
app.use('/user', userRouter);

// local image route
app.use('/uploads', express.static('uploads'));

// serve static assets
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Listen on port 3000
app.listen(PORT, () => console.log('Server listening on port 3000'));