var finances = (function () {
  requestData(URL, "GET").then(function(data) {

    calcData = {
      totalItems    : 0,
      totalSales    : 0,
      salesValue    : 0,
      purchaseValue : 0
    };

    _processData(data);
    _renderResumo();
    _renderProjecoes();

    function _processData(data) {
      data.forEach(function(item) {
          calcData.totalItems    += Number(item.quantity.bought);
          calcData.totalSales    += Number(item.quantity.sold);
          calcData.salesValue    += Number(item.quantity.sold * item.value.sold);
          calcData.purchaseValue += Number(item.quantity.bought * item.value.bought * TAX * DOL);
      });
    }

    function _renderResumo() {
      var totalItems    = document.querySelector('.resumo__items');
      var totalVendidos = document.querySelector('.resumo__vendidos');
      var valorPago     = document.querySelector('.resumo__valor-pago');
      var valorVendido  = document.querySelector('.resumo__valor-vendas');

      totalItems.textContent    = calcData.totalItems;
      totalVendidos.textContent = calcData.totalSales;
      valorVendido.textContent     = 'R$ ' + calcData.salesValue.toFixed(2);
      valorPago.textContent  = 'R$ ' + calcData.purchaseValue.toFixed(2);
    }
  }, errorHandler);
})();
