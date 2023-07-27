const Router = require('express');
const jwtinspector = require("./Jwt Implementation/jwthelper.js");
const auth = require('./routes/auth.js');
const insert = require('./routes/insert.js');
const display = require('./routes/display.js');
const files = require('./routes/file.js');

module.exports = Router()
    .use('/api/auth',auth)
    .use('/api/insert',jwtinspector,insert)
    .use('/api/display',jwtinspector,display)
    .use('/api/filehandling',jwtinspector,files)
    