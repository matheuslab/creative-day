const express = require('express');
const OBDController = require('./controllers/OBDController');
const driverController = require('./controllers/DriverController');
const vehicleController = require('./controllers/VehicleController');

const routes = express.Router();

routes.get('/healthcheck', (req, res) => {
    res.send({message: 'Ok'})
});

routes.post('/devices', OBDController.create);
routes.get('/devices', OBDController.fetchDevice)
routes.get('/devices/:id', OBDController.index)

routes.post('/drivers', driverController.create)
routes.get('/drivers', driverController.fetchDriver)
routes.get('/drivers/:id', driverController.index)

routes.post('/vehicles', vehicleController.create)
routes.get('/vehicles', vehicleController.fetchVehicle)
routes.get('/vehicles/:id', vehicleController.index)

module.exports = routes;