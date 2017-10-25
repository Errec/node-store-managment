var items = (function () {
  var itemSelect = document.querySelector('.item__select');
  var itemList   = document.querySelector('.item-list');

  requestData(URL, "GET").then(function (data) {
    console.log(data);
    var itemsData = {
      brands: []
    };

    _processData(data);
    _populateSelect(itemsData.brands);

    itemSelect.addEventListener('change', function() {
      while (itemList.children.length > 1) {
        itemList.removeChild(itemList.lastChild);
      }
      _populateItemList(data, this.value);
    }, false);

    function _processData (data) {
      data.forEach(function (item) {
        itemsData.brands.indexOf(item.brand) > -1 ?
        '' : itemsData.brands.push(item.brand);
      });
    }

    function _populateSelect (options) {
      options.forEach(function (option) {
        var newOptionNode = document.createElement("option");
        newOptionNode.textContent = option;
        itemSelect.append(newOptionNode);
      });
    }

    function _populateItemList (data, brand) {
      data.forEach(function (item) {
        if (item.brand === brand || brand == 'Todas') {
          var newTrNode = document.createElement("tr");

          var tdCode       = document.createElement("td");
          var tdQuantidade = document.createElement("td");
          var tdCor        = document.createElement("td");
          var tdValor      = document.createElement("td");
          var tdTamanho    = document.createElement("td");
          var tdSexo       = document.createElement("td");
          var tdLucro      = document.createElement("td");

          itemList.append(newTrNode);

          tdCode.textContent       = item.code;
          tdQuantidade.textContent = item.quantity.bought;
          tdCor.textContent        = item.description.color;
          tdTamanho.textContent    = item.description.size;
          tdSexo.textContent       = item.description.sex;
          tdValor.textContent      = 'R$' + item.value.sold;
          tdLucro.textContent      = (100 * Number(item.value.sold) / (Number(item.value.bought) * TAX * DOL) - 100).toFixed(0) + '%';

          newTrNode.append(tdCode, tdQuantidade, tdCor, tdTamanho, tdSexo, tdValor, tdLucro);
        }
      });
    }
  }, errorHandler);
})();
