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
                scrollY > sectionTop && scrollY <= sectionTop + sectionHeight
            ) {
                document.querySelector(".menu a[href*=" + sectionId + "]").classList.add("active");
            } else {
                document.querySelector(".menu a[href*=" + sectionId + "]").classList.remove("active");
            }
        });
    }

    new WOW().init();


    // Products db


    class ProductCard {
        constructor(src, alt, title, descr, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('li');
            element.classList.add('products__item', 'item-products')
            element.innerHTML =
                `
                <img src=${this.src} alt=${this.alt} class="item-products__img">
                <h3 class="item-products__title">${this.title}</h3>
                <div class="item-products__more">
                    <div class="arrow_bottom"></div>
                </div>
                <div class="item-products__descr">${this.descr}</div>
            `
            this.parent.append(element);
        }
    }

    const getProducts = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    const filterButtons = document.querySelectorAll('.filter-products__item');

    getProducts('db.json')
        .then(data => {
            data.products.forEach(({ img, altimg, title, descr, category }) => {
                if (filterButtons[0].classList.contains(category)) {
                    new ProductCard(img, altimg, title, descr, ".products__wrapper .products__list").render();
                }
            });
        })


    




    const productList = document.querySelector('.products__list');

    $('ul.filter-products__list').on('click', 'li:not(.filter-products__item_active)', function () {
        $(this)
            .addClass('filter-products__item_active').siblings().removeClass('filter-products__item_active');
        productList.innerHTML = "";
        getProducts('db.json')
            .then(data => {
                data.products.forEach(({ img, altimg, title, descr, category }) => {
                    if (this.classList.contains(category)) {
                        new ProductCard(img, altimg, title, descr, ".products__wrapper .products__list").render();
                    }

                });
            })
    });








    // form

    $('.feed-form').submit(function (e) {
        e.preventDefault();


        function formatErrorMessage(jqXHR, exception) {

            if (jqXHR.status === 0) {
                return ('Not connected.\nPlease verify your network connection.');
            } else if (jqXHR.status == 404) {
                return ('The requested page not found. [404]');
            } else if (jqXHR.status == 405) {
                return ('HTTP Error 405 – Method Not Allowed');
            } else if (jqXHR.status == 500) {
                return ('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                return ('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                return ('Time out error.');
            } else if (exception === 'abort') {
                return ('Ajax request aborted.');
            } else {
                return ('Uncaught Error.\n' + jqXHR.status);
            }
        }


        const feedFormLoader = document.querySelector('.loader');

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize(),
            beforeSend: function () {
                feedFormLoader.classList.add('loader_active');
            }
        }).done(function () {
            feedFormLoader.classList.remove('loader_active');
            $(this).find("input").val("");
            $('.feed-form').trigger('reset');
            alert('Thank you for your application!');
        }).fail(function (jqXHR, err) {
            feedFormLoader.classList.remove('loader_active');
            // alert('Something went wrong. Please try again later.');
            var responseTitle = $(jqXHR.responseText).filter('title').get(0);
            alert($(responseTitle).text() + "\n" + formatErrorMessage(jqXHR, err));
            // alert($(responseTitle).text());
        })
        return false;
    })
});

