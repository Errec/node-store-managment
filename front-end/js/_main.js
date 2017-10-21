TAX = 1.065;
DOL = 3.30;
// Hosted JSON URL
var URL = 'https://gist.githubusercontent.com/Errec/7460cf1400f0059b00dc246b2da18a6a/raw/3f4c2be419140e199a26708b9a38e6e235ef2294/items.json';

// Request JSON returning a promise obj
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
