var items = (function () {
  var itemSelect         = document.querySelector('.item__select');
  var tableBody          = document.querySelector('.item-table__body');
  var modal              = document.querySelector('.modal');
  var modalCloseBtn      = document.querySelector('.modal__close-btn');

  var modalSubtitle      = document.querySelector('.modal__title-categoria');
  var modalTitle         = document.querySelector('.modal__subtitle-marca');
  var itemCode           = document.querySelector('.modal__code');
  var itemPreco          = document.querySelector('.modal__preco');
  var itemDescricao      = document.querySelector('.modal__descricao');
  var itemCor            = document.querySelector('.modal__cor');
  var itemSexo           = document.querySelector('.modal__sexo');
  var itemTamanho        = document.querySelector('.modal__tamanho');
  var itemQuantidade     = document.querySelector('.modal__quantidade');
  var itemLucro          = document.querySelector('.modal__lucro');
  var itemValorMin       = document.querySelector('.modal__valor-min');
  var itemInputNovoValor = document.querySelector('.modal__novo-valor-input');
  var itemNovoValorLucro = document.querySelector('.modal__novo-valor-lucro');

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
    itemInputNovoValor.addEventListener('input', _getNewProfit);

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
      itemNovoValorLucro.textContent = '0%';
      modal.classList.toggle('modal--show');
    }

    function _populateModal (data, code) {
      data.forEach( function(item) {
        if (item.code === code) {
          modalTitle.textContent     = item.brand;
          modalSubtitle.textContent  = item.description.category;
          itemCode.textContent       = item.code || 'N/A';
          itemPreco.textContent      = 'R$' + item.value.sold;
          itemDescricao.textContent  = item.description.about || 'N/A';
          itemCor.textContent        = item.description.color || 'N/A';
          itemSexo.textContent       = item.description.size || 'N/A';
          itemTamanho.textContent    = item.description.sex || 'N/A';
          itemQuantidade.textContent = item.quantity.bought || 'N/A';
          itemLucro.textContent      = (100 * Number(item.value.sold) / (Number(item.value.bought) * TAX * DOL) - 100).toFixed(0) + '%';
          itemValorMin.textContent   = 'R$' + ( Number(item.value.bought) * TAX * DOL * 2.3).toFixed(2)  + '(130%)'; // TODO: dynamic
          itemInputNovoValor.value   = 'R$';
          return;
        }
      });
    }

    function _getNewProfit(input) {
      var value = input.target.value;
      if(value.substring(0,2) !== 'R$') {
        input.target.value = 'R$';
        return;
      }
      if(!Number(value.substring(2,value.length))) {
        if(value.substring(0,value.length - 1).length === 1) {
          input.target.value = 'R$';
          itemNovoValorLucro.textContent = '0%';
        } else {
          input.target.value = value.substring(0,value.length - 1);
        }
        return;
      } else {
        var newValueInput = Number(value.substring(2,value.length));
        var newProfit = Number(itemLucro.textContent.substring(0, itemLucro.textContent.length - 2)) * newValueInput / itemPreco.textContent.substring(2, itemPreco.textContent.length - 1);
        itemNovoValorLucro.textContent = newProfit.toFixed(0) + '%';
      }
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

          var tdCode       = document.createElement("span");
          var tdQuantidade = document.createElement("span");
          var tdCategoria  = document.createElement("span");
          var tdCor        = document.createElement("span");
          var tdValor      = document.createElement("span");
          var tdTamanho    = document.createElement("span");
          var tdSexo       = document.createElement("span");
          var tdLucro      = document.createElement("span");

          tableBody.append(newItemElement);

          tdCode.textContent       = item.code;
          tdQuantidade.textContent = item.quantity.bought;
          tdCategoria.textContent  = item.description.category || '-';
          tdCor.textContent        = item.description.color || '-';
          tdTamanho.textContent    = item.description.sex || '-';
          tdSexo.textContent       = item.description.size || '-';
          tdValor.textContent      = 'R$' + item.value.sold;
          tdLucro.textContent      = (100 * Number(item.value.sold) / (Number(item.value.bought) * TAX * DOL) - 100).toFixed(0) + '%';

          tdCode.setAttribute("class", "item-table__item-cod item-table__item-cell");
          tdQuantidade.setAttribute("class", "item-table__item-qtde item-table__item-cell");
          tdCategoria.setAttribute("class", "item-table__item-categoria item-table__item-cell");
          tdCor.setAttribute("class", "item-table__item-cor item-table__item-cell");
          tdTamanho.setAttribute("class", "item-table__item-tamanho item-table__item-cell");
          tdSexo.setAttribute("class", "item-table__item-sexo item-table__item-cell");
          tdValor.setAttribute("class", "item-table__item-valor item-table__item-cell");
          tdLucro.setAttribute("class", "item-table__item-lucro item-table__item-cell");

          newItemElement.append(tdCode, tdQuantidade, tdCategoria, tdCor, tdTamanho, tdSexo, tdValor, tdLucro);
        }
      });
    }
  }, errorHandler);
})();
