//to test: curl -XPOST http://localhost:50001

var kafka = require('kafka-node');
var express = require('express');
var app = express();

//
// kafka producer

var kproducer = kafka.Producer;
const topic2send = 'mytopic';
var client = new kafka.Client('127.0.0.1:2181');
var producer = new kproducer(client, {'requireAcks': 1});

producer.on('ready', function () {
    console.log('kafka producer ready!');
});

producer.on('error', function (err) {
    console.log('producer error: ', err);
    process.exit(1);
});

//
// express

var counter = 0;
app.post('/', function (req, res) {
    res.send('received a request: ' + ++counter + '\n');

    // send
    var message2send = {'msg': 'sending ' + counter};
    var payloads = [ { topic: topic2send, messages: JSON.stringify(message2send) } ];
    producer.send(payloads, function (err, data) {
        if (err) {
            console.log('producer error: ' + err);
        }
        else {
            console.log('producer sent: ' + JSON.stringify(data));
        }
    });
});

var port = 50001;
var server = app.listen(port, function () {
    console.log('use this to send messages: \"curl -XPOST http://localhost:' + port + '\"');
});
