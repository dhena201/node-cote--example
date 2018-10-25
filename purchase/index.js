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
    res.send('Purchase Service');
});

app.get('/purchase', function(req, res) {
    purchaseRequester.send({type: 'list'}, function(err, purchases) {
        res.send(purchases);
    });
});

var purchaseRequester = new cote.Requester({
    name: 'purchase requester',
    namespace: 'purchase'
});

server.listen(5004);

new cote.Sockend(io, {
    name: 'purchase server'
});
