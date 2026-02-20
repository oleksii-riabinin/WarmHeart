

import Swiper from 'swiper'; 
import { Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "/src/sass/ui/style.scss"; 


const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  slidesPerView: 1, // СУВОРО ОДНА картинка на екрані!
     // Наступні картинки будуть заховані (прозорі)

  
  loop: true,
  speed: 600,
  grabCursor: true,
  
  pagination: {
    el: '.hero__dots',
    clickable: true,
  },
});
