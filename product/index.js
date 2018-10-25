const app = require('express')(),
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
    res.send('Product Service');
});

app.get('/product', function(req, res) {
    console.log(`on route ${req.url}`);
    productRequester.send({type: 'list'}, function(err, products) {
        console.log(`request list product`);
        if(products) return res.send(products);
        res.status(500).send('Something Wrong :' +err);
    });
});

app.post('/product', function(req, res) {
    productRequester.send({type: 'create', product: req.body.product}, function(err, product) {
        if(err) console.error('Something Wrong',err);
        res.send(product);
    });
});

app.delete('/product/:id', function(req, res) {
    productRequester.send({type: 'delete', id: req.params.id}, function(err, product) {
        res.send(product);
    });
});

let productRequester = new cote.Requester({
    name: 'product requester',
    namespace: 'product'
});

server.listen(5003, () => {
    console.info(`server started on port 5003`);
});

new cote.Sockend(io, {
    name: 'product sockend server'
});
