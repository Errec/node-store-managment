var myTable = './tables/tabela-raw-2.csv';

var tableToJson = function(inputTable) {
  var fs   = require('fs');
  var data = fs.readFileSync(inputTable);

  var dataTable = _splitData(data);
  var tableObj  = _makeTableObj(dataTable);
  _writeJsonFile(tableObj);

  function _splitData(data) {
    return data
          .toString()
          .split(/\r?\n/)
          .map(function(line) { return line.split("\t"); })
          .filter(function(line){ return line[0] !== ''; });
  }

  function _makeTableObj(matrix) {
    var jsonArr = [];
    matrix.forEach(function(el) {

      jsonArr.push({
        code  : el[1],
        brand : el[0],
        description: {
          category : el[2],
          about    : el[3],
          color    : el[4],
          sex      : el[5],
          size     : el[6]
        },
        quantity: {
          bought : el[7],
          sold   : el[11]
        },
        value: {
          bought : el[9],
          sold   : el[10],
          tag    : el[8]
        }
      });
    });
    return jsonArr;
  }

  function _writeJsonFile(obj) {
    var json = JSON.stringify(obj);
    fs.writeFile('./tables/data-2.json', json, 'utf8');
  }
};

tableToJson(myTable);
