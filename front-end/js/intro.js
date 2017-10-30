var intro = (function() {
   var introLogo        = document.querySelector('.intro__logo');
   var introItem        = document.querySelector('.intro__item');
   var introItemBtn     = document.querySelector('.header__item');
   var introFinances    = document.querySelector('.intro__finances');
   var introFinancesBtn = document.querySelector('.header__finances');
   var header           = document.querySelector('.header');

   introItem.addEventListener('click', _openItem);
   introFinances.addEventListener('click', _openFinances);

   function _openItem() {
    introItemBtn.classList.add('header__btn--green-border');
    _hideIntro();
   }

   function _openFinances() {
    introFinancesBtn.classList.add('header__btn--green-border');
    _hideIntro();
   }

   function _hideIntro() {
    introLogo.classList.add('intro__logo--hide');
    introItem.classList.add('intro__item--hide');
    introFinances.classList.add('intro__finances--hide');
    header.classList.add('header--show');
   }
 })();
