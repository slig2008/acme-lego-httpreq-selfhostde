const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const basicAuth = require('express-basic-auth')

const indexRouter = require('./routes/index.js');
const acmeLegoHttpReqRouter = require('./routes/acme-lego-httpreq.js');

var app = express();

logger.token('body', (req, res) => JSON.stringify(req.body));
app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :body'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

const user = process.env.ADMIN_USER || 'admin';
const password = process.env.ADMIN_PASSWORD || 'admin';
app.use('/', basicAuth({ users: { [user]: password } }), acmeLegoHttpReqRouter);

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message || "Internal server error");
});
 
module.exports = app;
