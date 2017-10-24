var items = (function () {
  var itemSelect = document.querySelector('.item__select');

  requestData(URL, "GET").then(function(data) {
    console.log(data)
    var itemsData = {
      brands: []
    };

    _processData(data);
    _populateSelect(itemsData.brands);

    function _processData(data) {
      data.forEach(function(item) {
        itemsData.brands.indexOf(item.brand) > -1 ?
        '' : itemsData.brands.push(item.brand);
      });
    }

    function _populateSelect(options) {
      options.forEach(function (option) {
        var newOptionNode = document.createElement("option");
        newOptionNode.textContent = option;
        itemSelect.append(newOptionNode);
      });
    }
  }, errorHandler);
})();
