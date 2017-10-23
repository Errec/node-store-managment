TAX = 1.065;
DOL = 3.30;
LUCRO_INICIAL = 1.30;
// Hosted JSON URL
var URL = 'https://gist.githubusercontent.com/Errec/43c26f23f359659b78d140fe8edf4eb7/raw/d59f1630d790b4e46b7cb5e6889423e952d809ff/items.json';

// Request JSON returning a pmainromise obj
function requestData(url, methodType){
  var promise = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.send();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
         if(xhr.status === 200){
          var resp = xhr.responseText;
          var respJson = JSON.parse(resp);
          resolve(respJson);
         } else{
            reject(xhr.status);
            console.log("xhr failed");
           }
      } else{
         console.log("xhr processing going on");
         }
    };
  });
  return promise;
}

function errorHandler(statusCode){
  alert("Falha ao acessar o servidor: status " + statusCode +  "\nTente novamente mais tarde.");
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
