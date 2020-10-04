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
    device.save()
      .then(() => {
        res.sendStatus(201);
        return;
      })
      .catch(async (err) => {
        if (err.errors[0].type == "unique violation") {
          const oldDevice = await models.Device.findOne({ where: { name: req.body.name }, paranoid: false });
          if (oldDevice.deletedAt == null) {
            res.status(403).send('duplicate');
          } else {
            await oldDevice.restore()
              .then(() => {
                res.sendStatus(201);
                return;
              })
              .catch((err) => {
                res.status(409).send(err);
                return;
              })
          }
        } else {
          res.status(409).send(err);
        }
        return;
      })
  }
  catch (error) {
    console.log(error)
    res.sendStatus(500);
    return;
  }
});

// {id: 5, name: "dispositivo"}
router.put('/', async (req, res) => {
  try {
    const oldDevice = await models.Device.findOne({ where: { id: req.body.id } });
    if (oldDevice instanceof models.Device) {
      oldDevice.name = req.body.name;
      oldDevice.updatedAt = new Date();
      await oldDevice.save()
        .then(() => {
          res.sendStatus(200);
          return;
        })
        .catch((err) => {
          if (err.errors[0].type == "unique violation") {
            res.status(403).send('duplicate');
          } else {
            res.status(409).send(err);
          }
          return;
        })
    } else {
      res.sendStatus(404);
    }
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
    if (device instanceof models.Device) {
      await device.destroy()
        .then(() => {
          res.sendStatus(200);
          return;
        })
        .catch((err) => {
          res.sendStatus(409);
          return;
        })
    } else {
      res.sendStatus(404);
    }
  }
  catch (error) {
    res.sendStatus(500);
  }
})

module.exports = router;