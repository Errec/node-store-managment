var items = (function () {
  var itemSelect     = document.querySelector('.item__select');
  var tableBody      = document.querySelector('.item-table__body');
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
      while (tableBody.children.length > 0) {
        tableBody.removeChild(tableBody.lastChild);
      }
      _populateItemList(data, this.value);
    }, false);

    tableBody.addEventListener("click", _getItemCode, false);
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
          var newItemElement = document.createElement("div");
          newItemElement.setAttribute("class", "item-table__item");
          newItemElement.setAttribute("data-code", item.code);

          var tdCode       = document.createElement("div");
          var tdQuantidade = document.createElement("div");
          var tdCategoria  = document.createElement("div");
          var tdCor        = document.createElement("div");
          var tdValor      = document.createElement("div");
          var tdTamanho    = document.createElement("div");
          var tdSexo       = document.createElement("div");
          var tdLucro      = document.createElement("div");

          tableBody.append(newItemElement);

          tdCode.textContent = item.code;
          tdCode.setAttribute("class", "item-table__item-cod item-table__item-cell");
          tdQuantidade.textContent = item.quantity.bought;
          tdQuantidade.setAttribute("class", "item-table__item-qtde item-table__item-cell");
          tdCategoria.textContent = item.description.category || '-';
          tdCategoria.setAttribute("class", "item-table__item-categoria item-table__item-cell");
          tdCor.textContent = item.description.color || '-';
          tdCor.setAttribute("class", "item-table__item-cor item-table__item-cell");
          tdTamanho.textContent = item.description.size || '-';
          tdTamanho.setAttribute("class", "item-table__item-tamanho item-table__item-cell");
          tdSexo.textContent = item.description.sex || '-';
          tdSexo.setAttribute("class", "item-table__item-sexo item-table__item-cell");
          tdValor.textContent = 'R$' + item.value.sold;
          tdValor.setAttribute("class", "item-table__item-valor item-table__item-cell");
          tdLucro.textContent = (100 * Number(item.value.sold) / (Number(item.value.bought) * TAX * DOL) - 100).toFixed(0) + '%';
          tdLucro.setAttribute("class", "item-table__item-lucro item-table__item-cell");

          newItemElement.append(tdCode, tdQuantidade, tdCategoria, tdCor, tdTamanho, tdSexo, tdValor, tdLucro);
        }
      });
    }
  }, errorHandler);
})();
