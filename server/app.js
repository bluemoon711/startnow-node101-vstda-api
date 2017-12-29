const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// add your code here
var mock = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
  ];

app.get('/', (req, res) => {
    res.status(200).json({status: 'ok'});
    });

app.get('/api/TodoItems', (req, res) => {
    
    res.status(200).json(mock);
    });

app.get('/api/TodoItems/:number', (req, res) => {
    var temp = req.params.number;
    var new_number = temp.replace(":", '');
    res.status(200).json(mock[new_number]);
    }); 

 app.post('/api/TodoItems/', (req, res) => {
    var replace = false;
    var newItem = req.body;
    mock.forEach(function(item, i ) {
        if (newItem.todoItemId == mock[i].todoItemId) {
            mock.splice(i, 1, newItem);
            replace = true;
        }
     });


     if (replace == false) {
         mock.push(newItem);
     }

     res.status(201).send(newItem);
    })

app.delete('/api/TodoItems/:number', (req, res) => {
    var temp = req.params.number;
    var new_number = temp.replace(":", '');
    res.status(200).send(mock[new_number]);
})

module.exports = app;
