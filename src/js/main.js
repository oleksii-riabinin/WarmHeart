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


    const paginationContainer = document.getElementById("pagination-container");
    const prevArrow = document.querySelector(".arrow-left");
    const nextArrow = document.querySelector(".arrow-right");

    // === НОВЕ: Логіка для карток ===
    const allCards = document.querySelectorAll(".cards__slide"); // Знаходимо всі картки
    const cardsPerPage = 9; // СКІЛЬКИ КАРТОК ПОКАЗУВАТИ НА СТОРІНЦІ (можеш змінити на 8 чи 9)

    let currentPage = 1;
    // Скрипт САМ рахує, скільки потрібно сторінок (заокруглює вгору)
    // Якщо карток немає, робимо хоча б 1 сторінку
    let totalPages = Math.ceil(allCards.length / cardsPerPage) || 1;

    // Функція, яка ховає зайві картки і показує потрібні
    function updateVisibleCards() {
      // Вираховуємо "індекси": від якої і до якої картки показувати
      const startIndex = (currentPage - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;

      allCards.forEach((card, index) => {
        // Якщо номер картки потрапляє в наше "вікно" для поточної сторінки
        if (index >= startIndex && index < endIndex) {
          card.style.display = "block"; // Показуємо
        } else {
          card.style.display = "none"; // Ховаємо
        }
      });
    }

    // Головна функція, яка малює цифри
    function renderPagination() {
      let html = "";
      let startPage, endPage;

      if (currentPage < 5) {
        startPage = 1;
        endPage = Math.min(5, totalPages); // Щоб не малювало 5 цифр, якщо сторінок всього 3
      } else if (currentPage >= 5 && currentPage < totalPages - 1) {
        startPage = currentPage - 3;
        endPage = currentPage + 1;
      } else {
        startPage = Math.max(1, totalPages - 4);
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
          html += `<span class="page-num active">${i}</span>`;
        } else {
          html += `<span class="page-num">${i}</span>`;
        }
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          html += `<span class="dots">...</span>`;
        }
        html += `<span class="page-num">${totalPages}</span>`;
      }

      paginationContainer.innerHTML = html;

      // === НОВЕ: Щоразу, коли перемальовуємо цифри, оновлюємо і картки! ===
      updateVisibleCards();
    }

    // Запускаємо при першому завантаженні сторінки
    if (paginationContainer) {
      renderPagination();
    }

    // --- ОБРОБКА КЛІКІВ ПО ЦИФРАХ ТА СТРІЛКАХ ---

    if (paginationContainer) {
      paginationContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("page-num")) {
          currentPage = parseInt(e.target.textContent);
          renderPagination();
        }
      });
    }

    if (nextArrow) {
      nextArrow.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderPagination();
        }
      });
    }

    if (prevArrow) {
      prevArrow.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderPagination();
        }
      });
    }

}); 


