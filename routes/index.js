const express = require('express');
const router = express.Router();
const urls = require('../settings/urls.js');
const urlSlice = (urls.values.length / 3);
const promises = require('../helpers/promises.js');
const mongo = require('../helpers/mongo.js');

// ROUTER
router.get('/desktop', (req, res, next) => {
  promises.getByType('desktop').then(function(values) {
    const valuesHome = values.slice(0, urlSlice)
    const valuesCategory = values.slice(urlSlice, (urlSlice * 2))
    const valuesProduct = values.slice((urlSlice * 2), (urlSlice * 3))
    mongo.saveToDB(valuesHome, valuesCategory, valuesProduct, 'desktop')
  
    res.render('index', {
      title: `Google PageSpeed - Desktop`,
      valuesHome,
      valuesCategory,
      valuesProduct
    });
  });;
});

/* GET home page. */
router.get('/', (req, res, next) => {
  promises.getByType('mobile').then((values) => {
    const valuesHome = values.slice(0, urlSlice)
    const valuesCategory = values.slice(urlSlice, (urlSlice * 2))
    const valuesProduct = values.slice((urlSlice * 2), (urlSlice * 3))
    mongo.saveToDB(valuesHome, valuesCategory, valuesProduct, 'mobile')

    res.render('index', {
      title: `Google PageSpeed - Mobile`,
      valuesHome: values.slice(0, urlSlice),
      valuesCategory: values.slice(urlSlice, (urlSlice * 2)),
      valuesProduct: values.slice((urlSlice * 2), (urlSlice * 3))
    });
  });;
});

router.get('/history', (req, res, next) => {
  const datasets = mongo.getAll().then(datasets => {
    console.log(datasets)
    res.render('history', {
      title: `History`,
      datasets
    });
  });
});

router.get('/dataset/:id', (req, res, next) => {
  const dataset = mongo.getOne(req.params.id).then(dataset => {
    console.log(dataset)
    res.render('dataset', {
      title: `Dataset`,
      dataset
    });
  });
});


module.exports = router;
