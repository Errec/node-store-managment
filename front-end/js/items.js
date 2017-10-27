var items = (function () {
  var itemSelect     = document.querySelector('.item__select');
  var itemList       = document.querySelector('.item-list');
  var modal          = document.querySelector('.modal');
  var modalCloseBtn  = document.querySelector('.modal__close-btn');

  var itemCode       = document.querySelector('.modal__code');
  var itemPreco      = document.querySelector('.modal__preco');
  var itemCategoria  = document.querySelector('.modal__categoria');
  var itemDescricao  = document.querySelector('.modal__descricao');
  var itemCor        = document.querySelector('.modal__cor');
  var itemSexo       = document.querySelector('.modal__sexo');
  var itemTamanho    = document.querySelector('.modal__tamanho');
  var itemQuantidade = document.querySelector('.modal__quantidade');
  var itemLucro      = document.querySelector('.modal__lucro');
  var itemValorMin   = document.querySelector('.modal__valor_min');

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

    itemList.addEventListener("click", _getItemCode, false);
    modalCloseBtn.addEventListener("click", _toggleModal, false);

    function _getItemCode(e) {
      if (e.target !== e.currentTarget) {
        var itemCode = e.target.parentElement.dataset.code;
        if (itemCode) {
          _populateModal(data, itemCode);
          _toggleModal();
        }
      }
    }

    function _toggleModal () {
      modal.classList.toggle('modal--show');
    }

    function _populateModal (data, code) {
      data.forEach( function(item) {
        if (item.code === code) {
          itemCode.textContent       = item.code || 'N/A';
          itemPreco.textContent      = 'R$' + item.value.sold;
          itemCategoria.textContent  = item.description.category || 'N/A';
          itemDescricao.textContent  = item.description.about || 'N/A';
          itemCor.textContent        = item.description.color || 'N/A';
          itemSexo.textContent       = item.description.sex || 'N/A';
          itemTamanho.textContent    = item.description.size || 'N/A';
          itemQuantidade.textContent = item.quantity.bought || 'N/A';
          itemLucro.textContent      = (100 * Number(item.value.sold) / (Number(item.value.bought) * TAX * DOL) - 100).toFixed(0) + '%';
          itemValorMin.textContent   = 'R$' + ( Number(item.value.bought) * TAX * DOL * 2.3).toFixed(2)  + '(130%)'; // TODO: dynamic
          return;
        }
      });
    }

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
          newTrNode.setAttribute("class", "item-list__tr");
          newTrNode.setAttribute("data-code", item.code);

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
