var intro = (function() {
   var introLogo     = document.querySelector('.intro__logo');
   var introItem     = document.querySelector('.intro__item');
   var introFinances = document.querySelector('.intro__finances');
   var header        = document.querySelector('.header');

   introItem.addEventListener('click', _hideIntro);
   introFinances.addEventListener('click', _hideIntro);

   function _hideIntro() {
    introLogo.classList.add('intro__logo--hide');
    introItem.classList.add('intro__item--hide');
    introFinances.classList.add('intro__finances--hide');
    header.classList.add('header--show');
   }
 })();
