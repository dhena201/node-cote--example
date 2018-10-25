var app = require('express')(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cote = require('cote');
    cors = require('cors');
    
const corsOptions = {
    origin: true,
    credentials: true,
}
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.get('/', function(req, res) {
    res.send('User Service');
});

app.get('/user', function(req, res) {
    userRequester.send({type: 'list'}, function(err, users) {
        res.send(users);
    });
});

var userRequester = new cote.Requester({
    name: 'user requester',
    namespace: 'user'
});

server.listen(5005);

new cote.Sockend(io, {
    name: 'user sockend server'
});
