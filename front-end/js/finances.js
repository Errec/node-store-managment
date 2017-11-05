var finances = (function () {
  var totalItems            = document.querySelector('.resumo__items');
  var totalVendidos         = document.querySelector('.resumo__vendidos');
  var valorPago             = document.querySelector('.resumo__valor-pago');
  var valorVendido          = document.querySelector('.resumo__valor-vendas');
  var valorTotalPrevisto    = document.querySelector('.resumo__valor-total-previsto');
  var lucroMedio            = document.querySelector('.resumo__lucro-medio');
  var projecaoValorTotal    = document.querySelector('.projecoes__valor-total');
  var projecaoLucoTotal     = document.querySelector('.projecoes__lucro-total');
  var projecaoInput         = document.querySelector('.projecoes__input');
  var projecaoValorRestante = document.querySelector('.projecoes__valor-restante');
  var projecaoLucoRestante  = document.querySelector('.projecoes__lucro-restante');

  requestData(URL, "GET").then(function(data) {
    itemsData = {
      brands                  :[],
      totalItems              : 0,
      totalSales              : 0,
      salesValue              : 0,
      purchaseValue           : 0,
      originalPriceSalesValue : 0,
      totalSalesValuePreview  : 0,
      remainValue             : 0
    };


    _processData(data);
    _renderResumo();
    _renderProjecoes(projecaoInput.value);

    projecaoInput.addEventListener('input', function (e) {
      return _renderProjecoes(this.value);
    });

    function _processData(data) {
      data.forEach(function(item) {
        itemsData.totalItems              += Number(item.quantity.bought);
        itemsData.totalSales              += Number(item.quantity.sold);
        itemsData.salesValue              += Number(item.quantity.sold * item.value.sold);
        itemsData.originalPriceSalesValue += Number(item.quantity.sold * item.value.bought * TAX * DOL);
        itemsData.purchaseValue           += Number(item.quantity.bought * item.value.bought * TAX * DOL);
        itemsData.totalSalesValuePreview  += Number(item.quantity.bought * item.value.sold);
      });
    }

    function _renderResumo() {
      totalItems.textContent         = itemsData.totalItems;
      totalVendidos.textContent      = itemsData.totalSales + '(' + (itemsData.totalSales / itemsData.totalItems * 100).toFixed(0) + '%)';
      valorVendido.textContent       = 'R$ ' + numberWithCommas(itemsData.salesValue.toFixed(2));
      valorPago.textContent          = 'R$ ' + numberWithCommas(itemsData.purchaseValue.toFixed(2));
      valorTotalPrevisto.textContent = 'R$ ' + numberWithCommas(itemsData.totalSalesValuePreview) + '(' + ((itemsData.totalSalesValuePreview / itemsData.purchaseValue - 1) * 100).toFixed(2) + '%)';
      lucroMedio.textContent         = ((itemsData.salesValue / itemsData.originalPriceSalesValue - 1) * 100).toFixed(2) + '%';
    }

    function _renderProjecoes(profit) {
      profit = Number(profit) / 100;
      projecaoValorTotal.textContent = 'R$ ' + numberWithCommas(((profit + 1 ) * itemsData.purchaseValue).toFixed(2));
      projecaoValorRestante.textContent = 'R$ ' + numberWithCommas(((profit + 1 ) * (itemsData.purchaseValue - itemsData.originalPriceSalesValue)).toFixed(2));
    }
  }, errorHandler);
})();
