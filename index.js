const express = require('express');
const knex = require('knex');

const server = express();

server.listen(5000, () => {
    console.log("Server running on port 5000")
})

const knexConfig = require('./knexfile')

const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

server.use(express.json());

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({errorMessage: error})
    })
})

server.post('/api/cohorts', (req, res) => {
    const { name } = req.body
    if(!name) {
      res.status(400).json("Please provide a name for the cohort");
      return;
    }
    db('cohorts').insert(req.body, 'id')
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
  })


  server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
    .where({id: id})
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => {
      res.status(500).json(err)
    })
  })

  server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
    .where({ id }) //
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })

  server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;
    db('students')
    .where({cohort_id: id})
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json(err)
    })
  })

  server.put('/api/cohorts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('cohorts')
    .where('id', '=', id)
    .update(changes)
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })