const express = require('express');
const OBDController = require('./controllers/OBDController');

const routes = express.Router();

routes.get('/healthcheck', (req, res) => {
    res.send({message: 'Ok'})
});

routes.post('/create', OBDController.create);
routes.get('/devices', OBDController.fetchDevice)
routes.get('/devices/:id', OBDController.index)

module.exports = routes;