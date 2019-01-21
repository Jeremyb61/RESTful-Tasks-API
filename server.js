var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tasksdb');

var path = require('path');
app.use(express.static(__dirname + '/public/dist/public'));

const bodyParser = require("body-parser");
app.use(bodyParser.json());

var TaskSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

mongoose.model('Tasks', TaskSchema);
var Task = mongoose.model('Tasks');

app.get('/tasks', function (req, res) {
    Task.find({}, function (err, data) {
        if (err) {
            console.log(err);
            console.log("no can do");
        } else {
            console.log('Woooooo!!!');
            res.json(data)
        }
    });
});
app.post('/task', function (req, res) {
    taskInstance = new Task(req.body)
    console.log(req.body)
    taskInstance.save(function (err, task) {
        if (err) {
            console.log('Error Occured')
        } else {
            console.log(task)
            console.log('successfully added a task!');
            res.json(task);
        }
    });
});
app.get('/task/:id', function (req, res) {
    Task.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            console.log(err);
            console.log("no can do");
        } else {
            console.log('Woooooo!!!')
            res.json(data)
        }
    });
});
app.put('/task/:id', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    Task.update({ _id: req.params.id }, { $set: { title: title, description: description } }, function (err, data) {
        console.log(data);
        if (err) {
            console.log("Error at Update Route");
        } else {
            console.log('Update Route Works')
            res.json(data)
        }
    });
});
app.delete('/task/:id', function (req, res) {
    Task.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            console.log("Error at Delete route")
        } else {
            console.log("Delete routes works")
            res.json(data)
        }
    });
});
app.listen(8000, function () {
    console.log("listening on 8000");
});
