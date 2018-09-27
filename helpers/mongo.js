const mongoose = require('mongoose');
const utilities = require('./utilities.js');
const secret = require('../settings/secret.js');
const mongodb = secret.mongodb;

mongoose.connect(mongodb);
const dataSchema = new mongoose.Schema({
  date: String,
  type: String,
  valuesHome: Object,
  valuesCategory: Object,
  valuesProduct: Object
});
const Value = mongoose.model('DataSet', dataSchema);

module.exports.saveToDB = (valuesHomeToBeSaved, valuesCategoryToBeSaved, valuesProductToBeSaved, type) => {
  mongoose.connect(mongodb);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function() {
    // console.log('connected');
    // console.log(type)

    // check if there is anything saved for this day and type already
    const isPresent = Value.find({date: utilities.getFullDate(), type: type}, function(err, datasets) {
      if (!err){ 
          return datasets;
          process.exit();
      } else {
        throw err;
      }
    });

    isPresent.then(values => {
      console.log(values)
      if (values.length > 0) {
        console.log('data was already saved')
      } else {
        const thisData = new Value({ 
          date: utilities.getFullDate(), 
          type: type,
          valuesHome: valuesHomeToBeSaved,
          valuesCategory: valuesCategoryToBeSaved,
          valuesProduct: valuesProductToBeSaved
        });

        thisData.save(function (err, response) {
          if (err) return console.error(err);
          // console.log('mongo response:', response);
        })
        console.log('data was not saved, now saved')
      }
    })

  });
};

module.exports.createMongoData = (value, type) => {
  const data = {
    'page': type,
    'name': value[0],
    'overalls': {
      'score': value[1].body.ruleGroups.SPEED.score
    },
    'fcp': {
      'fast': parseFloat((value[1].body.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[0].proportion * 100)).toFixed(1),
      'avg': parseFloat((value[1].body.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[1].proportion * 100)).toFixed(1),
      'slow': parseFloat((value[1].body.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[2].proportion * 100)).toFixed(1) 
    },
    'dcl': {
      'fast': parseFloat((value[1].body.loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions[0].proportion * 100)).toFixed(1),
      'avg': parseFloat((value[1].body.loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions[1].proportion * 100)).toFixed(1),
      'slow': parseFloat((value[1].body.loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions[2].proportion * 100)).toFixed(1) 
    }
  }
  return data;
}

module.exports.getAll = () => {
  mongoose.connect(mongodb);
  const db = mongoose.connection;
  const promise = Value.find({}, function(err, datasets) {
      if (!err){
          return datasets;
          process.exit();
      } else {throw err;}
  });
  return promise;
}

module.exports.getOne = id => {
  mongoose.connect(mongodb);
  const db = mongoose.connection;
  const promise = Value.findById(id, function(err, dataset) {
      if (!err){
          return dataset;
          process.exit();
      } else {throw err;}
  });
  return promise;
}
