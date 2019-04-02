const express = require('express');
const middleware = require('./middlewares/middleware');
const app = express();
const PORT = process.env.PORT | 3000;
const ENV = process.env.NODE_ENV;

middleware(app);
const server = app.listen(PORT, err => {
    if (err) {
        throw err
    } else {
        console.log(`Server running on port: ${PORT} --- running on ${ENV}`)
    }
});


module.exports = server;

