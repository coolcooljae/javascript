var kafka = require('kafka-node');

//
// kafka consumer

console.log("starting a kakfa consumer for topic");
const topic2receive = 'mytopic';
var kconsumer = require('kafka-node').Consumer;
var kclient = new kafka.Client('127.0.0.1:2181');

var consumer = new kconsumer(kclient, [{'topic': topic2receive}], {encoding: 'utf8'});

consumer.on('message', function (message) {
    console.log('received: %s, %s', message.topic, JSON.stringify(message.value));
});

consumer.on('error', function (err) {
    console.log('error: ', err);
});
