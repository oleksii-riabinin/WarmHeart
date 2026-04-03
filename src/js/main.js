"use strict";

import Swiper from 'swiper'; 
import { Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import feather from 'feather-icons';
import "/src/sass/ui/style.scss"; 


document.addEventListener('DOMContentLoaded', () => {
    // 1. Ініціалізація іконок
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // 2. Swiper: Головний слайдер (Hero)
    const swiperHero = new Swiper('.hero__slider', {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 600,
        grabCursor: true,
        pagination: {
            el: '.hero__dots',
            clickable: true,
        },
    });

    // 3. Swiper: Слайдер продуктів
    const swiperProducts = new Swiper('.products__swiper', {
        modules: [Navigation, Pagination],
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        speed: 600,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.arrow-right',
            prevEl: '.arrow-left',
        },
        breakpoints: {
            360: { slidesPerView: 1 },
            480: { spaceBetween: 20, slidesPerView: 2 },
            1000: { slidesPerView: 3, spaceBetween: 30 }
        }
    });

    // 4. Акордеони у Футері (Авто-відкриття на ПК)
    const footerAccordions = document.querySelectorAll('.accordion');

    function handleFooterAccordions() {
        if (window.innerWidth >= 768) {
            footerAccordions.forEach(acc => acc.setAttribute('open', ''));
        } else {
            footerAccordions.forEach(acc => acc.removeAttribute('open'));
        }
    }

    handleFooterAccordions();
    window.addEventListener('resize', handleFooterAccordions);

    // 5. Логіка "Акордеона" для фільтрів каталогу (Закриття сусідніх)
    const allFilters = document.querySelectorAll('.catalog__filter');

    allFilters.forEach((filter) => {
        filter.addEventListener('toggle', () => {
            if (filter.open) {
                allFilters.forEach((otherFilter) => {
                    if (otherFilter !== filter) {
                        otherFilter.removeAttribute('open');
                    }
                });
            }
        });
    });

    // 6. Логіка створення тегів (Таблеток) при виборі фільтра
    const filterItems = document.querySelectorAll('.catalog__filter-list li');
    const activeTagsContainer = document.getElementById('activeTags');

    if (activeTagsContainer) {
        filterItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                // Ховаємо обраний пункт
                item.style.display = 'none';

                // Дістаємо текст (враховуємо, що там може бути іконка плюсика)
                const textContent = item.childNodes[0].textContent.trim();

                // Створюємо кнопку-тег
                const tagBtn = document.createElement('button');
                tagBtn.classList.add('filter-tag');
                tagBtn.innerHTML = `
                    <span><i data-feather="x"></i></span>
                    ${textContent}
                `;

                // Видалення тега
                tagBtn.addEventListener('click', () => {
                    tagBtn.remove();
                    item.style.display = 'flex';
                });

                activeTagsContainer.appendChild(tagBtn);

                // Оновлюємо іконки Feather тільки для нових елементів
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            });
        });
    }


    const filterMobileBtn = document.getElementById("filter-mobile");
    const desktopFilters = document.querySelector(".catalog__desktop");
    const metaViews = document.querySelector(".catalog__meta-views");

    if (filterMobileBtn) {
      filterMobileBtn.addEventListener("click", () => {
        // Перемикаємо клас 'is-open' (додає, якщо немає, і забирає, якщо є)
        desktopFilters.classList.toggle("is-open");

        // Якщо на телефонах іконки приховані, також показуємо їх
        if (metaViews) {
          metaViews.classList.toggle("is-open");
        }
      });
    }
}); 