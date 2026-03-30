

import Swiper from 'swiper'; 
import { Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import feather from 'feather-icons';
import "/src/sass/ui/style.scss"; 


document.addEventListener('DOMContentLoaded', () => {
  feather.replace();
});

const swiperHero = new Swiper('.hero__slider', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  slidesPerView: 1, // СУВОРО ОДНА картинка на екрані!
     // Наступні картинки будуть заховані (прозорі)

  spaceBetween: 30,
  loop: true,
  speed: 600,
  grabCursor: true,
  
  pagination: {
    el: '.hero__dots',
    clickable: true,
  },
});

const swiperProducts = new Swiper('.products__swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  slidesPerView: 3, // СУВОРО ОДНА картинка на екрані!
     // Наступні картинки будуть заховані (прозорі)

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


  breakpoints:{
    360:{
slidesPerView: 1
    },
    480:{
      spaceBetween:20,
       slidesPerView: 2
      
    },
    1000:{
        slidesPerView: 3, // СУВОРО ОДНА картинка на екрані!
     // Наступні картинки будуть заховані (прозорі)

  spaceBetween: 30,
    }
  }
});


// Знаходимо всі наші випадаючі списки у футері
const footerAccordions = document.querySelectorAll('.accordion');

// Функція, яка перевіряє ширину екрана
function handleFooterAccordions() {
  if (window.innerWidth >= 768) {
    // Якщо екран ПК (>= 768px) — примусово ВІДКРИВАЄМО всі списки
    footerAccordions.forEach(acc => acc.setAttribute('open', ''));
  } else {
    // Якщо це телефон (< 768px) — ЗАКРИВАЄМО всі списки (крім тих, що ти сам хочеш залишити відкритими)
    footerAccordions.forEach(acc => acc.removeAttribute('open'));
  }
}

// Запускаємо перевірку одразу при завантаженні сторінки
handleFooterAccordions();

// Також запускаємо її, якщо користувач розтягує/звужує вікно браузера
window.addEventListener('resize', handleFooterAccordions);

//робимо так щоб наші випадаючи списки відкривалися по черзі
const allFilters = document.querySelectorAll('.catalog__filter');
// 2. Вішаємо "слухача" на кожен з них
allFilters.forEach((filter) => { 
  // Подія 'toggle' спрацьовує щоразу, коли <details> відкривається або закривається
  filter.addEventListener('toggle', () => {
    // Якщо саме цей список зараз ВІДКРИВСЯ...
    if (filter.open) {
      // Пробігаємося по всіх списках ще раз
      allFilters.forEach((otherFilter) => {
        // Якщо це НЕ той самий список, на який ми щойно клікнули...
        if (otherFilter !== filter) {
          // ...ми примусово забираємо в нього атрибут 'open' (закриваємо його)
          otherFilter.removeAttribute('open');
        }
      });
      
    }
  });
});




document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. ЛОГІКА "АКОРДЕОНА" ДЛЯ ФІЛЬТРІВ (Закриття сусідніх)
     ========================================================= */
  const allFilters = document.querySelectorAll('.catalog__filter');

  allFilters.forEach((filter) => {
    filter.addEventListener('toggle', () => {
      // Якщо цей конкретний список зараз відкрився...
      if (filter.open) {
        // Проходимось по всіх інших списках і закриваємо їх
        allFilters.forEach((otherFilter) => {
          if (otherFilter !== filter) {
            otherFilter.removeAttribute('open');
          }
        });
      }
    });
  });

  /* =========================================================
     2. ЛОГІКА СТВОРЕННЯ ЧОРНИХ ТЕГІВ (Таблеток)
     ========================================================= */
  // Знаходимо всі пункти (<li>) всередині списків фільтрів
  const filterItems = document.querySelectorAll('.catalog__filter-list li');
  
  // Знаходимо контейнер, куди будемо вставляти чорні кнопки.
  // Переконайся, що в HTML ти додав <div class="catalog__active-filters container" id="activeTags"></div> !
  const activeTagsContainer = document.getElementById('activeTags');

  if (activeTagsContainer) {
    filterItems.forEach(item => {
      // Вішаємо слухача на клік по пункту списку (наприклад, "Grey +")
      item.addEventListener('click', (event) => {
        // Зупиняємо стандартну поведінку, якщо потрібно
        event.preventDefault(); 

        // 1. Ховаємо цей пункт зі списку, щоб його не можна було вибрати двічі
        item.style.display = 'none';

        // 2. Дістаємо текст (наприклад, "130x170 cm" або "Grey")
        // Беремо найперший текстовий вузол, щоб не захопити іконку плюсика
        const textContent = item.childNodes[0].nodeValue.trim();

        // 3. Створюємо нову чорну кнопку-тег
        const tagBtn = document.createElement('button');
        tagBtn.classList.add('filter-tag'); // Клас стилів з твого SCSS

        // 4. Вставляємо всередину іконку Feather 'x' та наш текст
        tagBtn.innerHTML = `
          <span><i data-feather="x" style="width: 14px; height: 14px;"></i></span>
          ${textContent}
        `;

        // 5. Логіка ВИДАЛЕННЯ: Що відбувається, коли клікаємо на чорну таблетку
        tagBtn.addEventListener('click', () => {
          tagBtn.remove(); // Видаляємо чорну кнопку зі сторінки
          item.style.display = 'flex'; // Повертаємо пункт назад у випадаючий список
        });

        // 6. Додаємо готову чорну кнопку в контейнер
        activeTagsContainer.appendChild(tagBtn);

        // 7. Обов'язково просимо Feather намалювати нову іконку 'x', яку ми додали
        if (typeof feather !== 'undefined') {
          feather.replace();
        }
      });
    });
  }

});