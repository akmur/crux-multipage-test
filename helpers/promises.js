const request = require('superagent');
const mongo = require('../helpers/mongo.js');
const utilities = require('../helpers/utilities.js');
const secret = require('../settings/secret.js');
const urls = require('../settings/urls.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const APIKey = secret.apiGoogle;

const getByType = type => {
  const result = urls.values.map(item => {
    return ajaxRequest(item.url, type, item.name)
  })
  return Promise.all(result);
}

const ajaxRequest = (siteURL, strategy, label) => {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    const apiURL = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=' + siteURL + '&strategy=' + strategy + '&key=' + APIKey;
    xhr.open('GET', apiURL);
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        setTimeout(function(){
          resolve([label, JSON.parse(xhr.responseText)]);
        }, 500)
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

module.exports = { getByType }
