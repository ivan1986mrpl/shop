// import { _slideDown, _slideUp, _slideToggle } from "./function";
 
 import addDate from "./modules/addDate";
 import scrollUp from "./modules/scrollUp";
 import initCountdown from "./modules/timer-countdown";
 import tabs from "./modules/tabs";
 import popup from "./modules/popup";
 import spollers from "./modules/spollers";

 import headerFon from "./modules/headerFon";
 import pageNavigation from "./modules/page-navigation";
 import menuBurger from "./modules/menu-burger";

 import products from "./shop/products.json";
 import { renderProductCards } from './shop/productCards.js';
// import { counterCart } from "./shop/counterCart.js";
 import { paginate } from "./shop/paginatiion.js";
 import { closeCart, openCart } from "./shop/cartPopup.js";
 import { cartData } from "./shop/cartData.js";



'use strict';
 
window.addEventListener('DOMContentLoaded', () => {
// getting today's date and displaying it on a page in Russian or English (HTML and JavaScript) <div class="date"></div> 
// addDate();

// go to top button with scroll indicator and smooth scrolling to the top
// scrollUp();

// для каждого нового вызова передавать класс таймера, конечную дату в формате '29 Jun 2025 17:28' и сообщение об окончании таймера 'The timer is over'
// Передача конечной даты
// initCountdown('.countdown', '27 Jun 2025 12:30', 'The timer is over');
// Передача количества секунд (сутки = 86400с) (1 час = 3600секунд)
// initCountdown('.countdown', 86440, 'The timer is over'); // Таймер на 1 день (86400 секунд)

// tabs();

// popup();

// spollers();

 //headerFon();

// pageNavigation();

// menuBurger();

 const productContainer = document.querySelector('.js-products-list');//массив с карточками товаров
 //renderProductCards(products, productContainer);
// counterCart();
  paginate(products);
  openCart();
  closeCart();
  cartData();



});
