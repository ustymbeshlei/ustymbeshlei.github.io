'use strict';

window.addEventListener('DOMContentLoaded', () => {
    

    //Hamburger


    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.control__menu'),
          menuLink = document.querySelectorAll('.control__link'),
          menuBtnClose = document.querySelector('.control__menu_close');
    
    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
        openOverlay();
    });

    menuLink.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
    

    function closeMenu() {
        menu.classList.remove('active');
        closeOverlay();
    }
    
    menuBtnClose.addEventListener('click', closeMenu);

    //Countries


    const countriesBtnOpen = document.querySelector('.control__btn_open'),
          countriesMenu = document.querySelector('.countries'),
          countriesBtnClose = document.querySelector('.countries__btn_close');

    countriesBtnOpen.addEventListener('click', () => {
        countriesMenu.classList.add('active');
        openOverlay();
    });

    function closeCountries() {
        countriesMenu.classList.remove('active');
        closeOverlay();
    }

    countriesBtnClose.addEventListener('click', closeCountries);


    //Overlay

    const overlay = document.querySelector('.overlay');

    function openOverlay() {
        overlay.classList.add('active');
    }

    function closeOverlay() {
        overlay.classList.remove('active');
    }

    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) {
            closeCountries();
            closeMenu();
        }
    });



    //Slider

    const sliderSlides = document.querySelectorAll('.solution__btn');


    $(document).ready(function(){
        $('.solution__carousel').slick({
            prevArrow: '<button type="button" class="chevron chevron-left"></button>',
            nextArrow: '<button type="button" class="chevron chevron-right"></button>',
            autoplay: false,
            dots: true,
            appendDots: $('.solution__menu'),
            customPaging: function(slider, i) {
                return sliderSlides[i];
            },
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        arrows: false,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
      });

      //Pageup

      const pageupBtn = document.querySelector('.pageup');

      $(window).scroll(function () {
          if ($(this).scrollTop() > 700) {
              pageupBtn.classList.add('active');
          } else {
              pageupBtn.classList.remove('active');
          }
      });

      //Modal 

      const modal = document.querySelector('.modal'),
            modalMini = document.querySelector('.modal_mini'),
            btnAccess = document.querySelector('[data-modal="access"]'),
            btnSubmit = document.querySelector('.btn_submit');

            function openModal() {
                openOverlay();
                modal.classList.add('active');
            }

      

});

