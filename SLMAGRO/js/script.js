'use strict'

window.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.header'),
        hamburgerCheckbox = document.querySelector('.checkbox'),
        menuLink = document.querySelectorAll('.menu__item'),
        sections = document.querySelectorAll("section[id]");

    menuLink.forEach((e) => {
        e.addEventListener('click', () => {
            if (header.classList.contains('header_active')) {
                header.classList.remove('header_active');
                hamburgerCheckbox.checked = false;
            }

        })
    })

    hamburgerCheckbox.addEventListener('click', (e) => {
        if (e.checked = true) {
            header.classList.toggle('header_active');
        }
    });

    const headerScroll = function () {
        let y = window.scrollY;
        if (y >= 300) {
            header.classList.add('header_show');
        } else {
            header.classList.remove('header_show');
        }
    };

    window.addEventListener('scroll', headerScroll);

    window.addEventListener("scroll", navHighlighter);

    function navHighlighter() {
  
        // Get current scroll position
        let scrollY = window.pageYOffset;
        
        // Now we loop through sections to get height, top and ID values for each
        sections.forEach(current => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 50;
          const sectionId = current.getAttribute("id");
          
          /*
          - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
          - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
          */
          if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
          ){
            document.querySelector(".menu a[href*=" + sectionId + "]").classList.add("active");
          } else {
            document.querySelector(".menu a[href*=" + sectionId + "]").classList.remove("active");
          }
        });
      }

      new WOW().init();
});

