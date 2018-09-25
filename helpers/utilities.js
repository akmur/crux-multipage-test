const fs = require('fs');

module.exports.readSetting = (path, callback) => {
  var fileContent = fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    return data;
  });
  return fileContent
}

module.exports.getFullDate = () => {
  // get current day
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  return `${year}-${month}-${day}`;
}
