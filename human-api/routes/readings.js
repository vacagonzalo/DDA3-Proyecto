var models = require('../models');
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

// {from: "2020-10-01", to: "2020-10-25"} || {from: "", to: ""}
router.get('/date', async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    if (to == "" && from == "") {
      const readings = await models.Reading.findAll();
      res.status(200).send(readings);
    } else if (to == "") {
      const fromDate = new Date(from);
      const readings = await models.Reading.findAll({
        where:
        {
          createdAt: { [Op.gte]: fromDate }
        }
      });
      res.status(200).send(readings);
    } else if (from == "") {
      const toDate = new Date(to);
      const readings = await models.Reading.findAll({
        where:
        {
          createdAt: { [Op.lte]: toDate }
        }
      });
      res.status(200).send(readings);
    } else {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const readings = await models.Reading.findAll({
        where:
        {
          createdAt: { [Op.between]: [fromDate, toDate] }
        }
      });
      res.status(200).send(readings);
    }
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// {from: "2020-10-01", to: "2020-10-25"} || {from: "", to: ""}
router.get('/date/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const from = req.body.from;
    const to = req.body.to;
    if (to == "" && from == "") {
      const readings = await models.Reading.findAll({ where: { deviceId: id } });
      res.status(200).send(readings);
    } else if (to == "") {
      const fromDate = new Date(from);
      const readings = await models.Reading.findAll({
        where:
        {
          deviceId: id,
          createdAt: { [Op.gte]: fromDate }
        }
      });
      res.status(200).send(readings);
    } else if (from == "") {
      const toDate = new Date(to);
      const readings = await models.Reading.findAll({
        where:
        {
          deviceId: id,
          createdAt: { [Op.lte]: toDate }
        }
      });
      res.status(200).send(readings);
    } else {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const readings = await models.Reading.findAll({
        where:
        {
          deviceId: id,
          createdAt: { [Op.between]: [fromDate, toDate] }
        }
      });
      res.status(200).send(readings);
    }
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// null
router.get('/last/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const readings = await models.Reading.findOne({
       where: {deviceId: id},
       order: [['id', 'DESC']]
      });
    res.status(200).send(readings);
  }
  catch (error) {
    res.status(201).send(error);
  }
});

// {limit: 10}
router.get('/limit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const amount = req.body.limit;
    const readings = await models.Reading.findAll({
       where: {deviceId: id},
       order: [['id', 'DESC']],
       limit: amount
      });
    res.status(200).send(readings);
  }
  catch (error) {
    res.status(201).send(error);
  }
});

module.exports = router;