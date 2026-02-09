

import Swiper from 'swiper'; 
import { Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import "/src/scss/ui/style.scss"; 
const swiper = new Swiper('.swiper', { 
  modules: [Navigation, Pagination], 
slidesPerView: 4,  
spaceBetween: 17, 
  loop: true,  
  speed: 2000, 
  pagination: { 
    el: '.swiper-pagination', 
    clickable: true, 
  }, 
   
  navigation: { 
    nextEl: '.swiper-button-next', 
    prevEl: '.swiper-button-prev', 
  }, 
 
}); 