var models = require('../models');
const express = require('express');
const router = express.Router();

// null
router.get('/', async (req, res) => {
  try {
    const devices = await models.Device.findAll();
    res.send(devices).status(200);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// {name: "dispositivo"}
router.post('/', async (req, res) => {
  try {
    const device = await models.Device.build({ name: req.body.name });
    device.save();
    res.sendStatus(201);
  }
  catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
});

// {id: 5, name: "dispositivo"}
router.put('/', async (req, res) => {
  try {
    const oldDevice = await models.Device.findOne({ where: { id: req.body.id } });
    oldDevice.name = req.body.name;
    oldDevice.updatedAt = new Date();
    await oldDevice.save();
    res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// {id: 5}
router.delete('/', async (req, res) => {
  try {
    const device = await models.Device.findOne({ where: { id: req.body.id } });
    await device.destroy();
    res.sendStatus(200);
  }
  catch(error) {
    res.sendStatus(500);
  }
})

module.exports = router;