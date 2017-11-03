var intro = (function() {
   var background       = document.querySelector('.background');
   var intro            = document.querySelector('.intro');
   var introLogo        = document.querySelector('.intro__logo');
   var introItem        = document.querySelector('.intro__item');
   var introItemBtn     = document.querySelector('.header__item');
   var introFinances    = document.querySelector('.intro__finances');
   var introFinancesBtn = document.querySelector('.header__finances');
   var header           = document.querySelector('.header');
   var itemView         = document.querySelector('.item');
   var fnancesView     = document.querySelector('.finances');

   introItem.addEventListener('click', _openItem);
   introFinances.addEventListener('click', _openFinances);
   introItemBtn.addEventListener('click', _toggleView);
   introFinancesBtn.addEventListener('click', _toggleView);

   function _toggleView() {
    itemView.classList.toggle('item--show');
    introItemBtn.classList.toggle('header__btn--green-border');
    fnancesView.classList.toggle('finances--show');
    introFinancesBtn.classList.toggle('header__btn--green-border');
   }

   function _openItem() {
    introItemBtn.classList.add('header__btn--green-border');
    itemView.classList.add('item--show');
    _hideIntro();
   }

   function _openFinances() {
    introFinancesBtn.classList.add('header__btn--green-border');
    fnancesView.classList.add('finances--show');
    _hideIntro();
   }

   function _hideIntro() {
    intro.classList.add('intro--hide');
    introLogo.classList.add('intro__logo--hide');
    introItem.classList.add('intro__item--hide');
    introFinances.classList.add('intro__finances--hide');
    header.classList.add('header--show');
    background.classList.add('background--zoom');
   }
 })();
