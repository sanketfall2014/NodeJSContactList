/**
 * Created by sp on 7/11/16.
 */
var express     = require ('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongojs     = require('mongojs');
var db          = mongojs('contactlist', ['contactlist']);
// var db = mongojs('mongodb://gk:gk@ds021462.mlab.com:21462/contactlist', ['contactlist']);
// var db = mongojs('mongodb://gk:gk@ds027809.mlab.com:27809/heroku_d7vsksn9', ['contactlist']);
var port        = (process.env.PORT || 3000);
var id;

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
    db.contactlist.find(function (err,docs) {
        res.json(docs);
    });
});

app.post('/contactlist', function (req, res) {
    console.log("Received: " + req.body);
    db.contactlist.insert( {
        "name":req.body.name,
        "email":req.body.email,
        "phone":req.body.phone}
    );
    res.send();
});

app.delete('/contactlist/:id', function (req, res) {
    id = req.params.id;
    console.log("Delete: " + id);
    db.contactlist.remove({
        _id: mongojs.ObjectId(id)
    });
    res.send();
});

app.get('/contactlist/:id', function (req, res) {
    id = req.params.id;
    db.contactlist.findOne( {
        "_id" : mongojs.ObjectId(id)
    }, function (err, docs){
        console.log("Edit:" + docs);
        res.json(docs);
        }
    );
});

app.put('/contactlist/:id', function (req, res) {
    id = req.params.id;
    db.contactlist.update( {
        "_id" : mongojs.ObjectId(id)},
        {
            "name": req.body.name,
            "email": req.body.email,
            "phone" : req.body.phone
        }
    );
    res.send();
});

app.listen(port, function () {
        console.log("Listening on port :" + port);
});
