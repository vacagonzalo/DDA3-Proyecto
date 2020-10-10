var models = require('../models');
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

// encodeURIComponent('{"from": "2020-10-01", "to": "2020-10-25"}') <- criteria
router.get('/all/:criteria', async (req, res) => {
  try {
    let criteria = JSON.parse(req.params.criteria);
    const from = criteria.from;
    const to = criteria.to;
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

// encodeURIComponent('{"from": "2020-10-01", "to": "2020-10-25"}') <- criteria
router.get('/all-of/:id/:criteria', async (req, res) => {
  try {
    const id = req.params.id;
    let criteria = JSON.parse(req.params.criteria);
    const from = criteria.from;
    const to = criteria.to;
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

router.get('/last-of/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const readings = await models.Reading.findOne({
      where: { deviceId: id },
      order: [['id', 'DESC']]
    });
    res.status(200).send(readings);
  }
  catch (error) {
    res.status(201).send(error);
  }
});

router.get('/some-of/:id/:amount', async (req, res) => {
  try {
    const id = req.params.id;
    const amount = req.params.amount;
    const readings = await models.Reading.findAll({
      where: { deviceId: id },
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