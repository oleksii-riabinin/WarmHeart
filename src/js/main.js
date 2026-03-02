

import Swiper from 'swiper'; 
import { Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "/src/sass/ui/style.scss"; 


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
});
