var finances = (function () {
  var totalItems            = document.querySelector('.resumo__items');
  var totalVendidos         = document.querySelector('.resumo__vendidos');
  var valorPago             = document.querySelector('.resumo__valor-pago');
  var valorVendido          = document.querySelector('.resumo__valor-vendas');
  var valorTotalPrevisto    = document.querySelector('.resumo__valor-total-previsto');
  var lucroMedio            = document.querySelector('.resumo__lucro-medio');
  var projecaoValorTotal    = document.querySelector('.projecoes__valor-total');
  var projecaoLucoTotal     = document.querySelector('.projecoes__lucro-total');
  var projecaoValorRestante = document.querySelector('.projecoes__valor-restante');
  var projecaoLucoRestante  = document.querySelector('.projecoes__lucro-restante');

  requestData(URL, "GET").then(function(data) {
    calcData = {
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
    _renderProjecoes(LUCRO_INICIAL);

    function _processData(data) {
      data.forEach(function(item) {
        calcData.totalItems              += Number(item.quantity.bought);
        calcData.totalSales              += Number(item.quantity.sold);
        calcData.salesValue              += Number(item.quantity.sold * item.value.sold);
        calcData.originalPriceSalesValue += Number(item.quantity.sold * item.value.bought * TAX * DOL);
        calcData.purchaseValue           += Number(item.quantity.bought * item.value.bought * TAX * DOL);
        calcData.totalSalesValuePreview  += Number(item.quantity.bought * item.value.sold);
      });
    }

    function _renderResumo() {
      totalItems.textContent         = calcData.totalItems;
      totalVendidos.textContent      = calcData.totalSales + '(' + (calcData.totalSales / calcData.totalItems * 100).toFixed(0) + '%)';
      valorVendido.textContent       = 'R$ ' + numberWithCommas(calcData.salesValue.toFixed(2));
      valorPago.textContent          = 'R$ ' + numberWithCommas(calcData.purchaseValue.toFixed(2));
      valorTotalPrevisto.textContent = 'R$ ' + numberWithCommas(calcData.totalSalesValuePreview) + '(' + ((calcData.totalSalesValuePreview / calcData.purchaseValue - 1) * 100).toFixed(2) + '%)';
      lucroMedio.textContent         = ((calcData.salesValue / calcData.originalPriceSalesValue - 1) * 100).toFixed(2) + '%';
    }

    function _renderProjecoes(profit) {
      projecaoValorTotal.textContent = 'R$ ' + numberWithCommas(((profit + 1 ) * calcData.purchaseValue).toFixed(2));
      projecaoValorRestante.textContent = 'R$ ' + numberWithCommas(((profit + 1 ) * (calcData.purchaseValue - calcData.originalPriceSalesValue)).toFixed(2));
    }
  }, errorHandler);
})();
