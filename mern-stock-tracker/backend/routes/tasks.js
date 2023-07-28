const router = require('express').Router();
let Task = require('../models/task.model');


router.route('/').get((req,res) =>{
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const userassigned  = req.body.userassigned;
    const taskname  = req.body.taskname;
    const description  = req.body.description;
    const value  = Number(req.body.value);
    const dateCreated  = Date.parse(req.body.dateCreated);
    const dateDeadline  = Date.parse(req.body.dateDeadline);
    const tag = req.body.tag;


    const newTask = new Task({
        userassigned,
        taskname,
        description,
        value,
        dateCreated,
        dateDeadline,
        tag,
    });

    newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/:id').get((req,res) => {
    Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err)); 
})

router.route('/:id').delete((req,res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(task => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err)); 
})

router.route('/update/:id').post((req,res) => {
    Task.findById(req.params.id)
    .then(task => {
        task.userassigned  = req.body.userassigned;
        task.taskname  = req.body.taskname;
        task.description  = req.body.description;
        task.value  = Number(req.body.quantity);
        task.dateCreated  = Date.parse(req.body.dateCreated);
        task.dateDeadline  = Date.parse(req.body.dateDeadline);
        task.tag = req.body.tag;

        task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err)); 
});

module.exports = router;