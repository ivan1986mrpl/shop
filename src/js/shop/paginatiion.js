import { createProductCard } from "./createProductCart";

const paginate = (products) => {
  let productCount = 10; // количество продуктов на странице
  let currentPage = 1;

  const productContainer = document.querySelector('.js-products-list');
  const pagination = document.querySelector('.js-pagination');
  const btnPrevPagination = document.querySelector('.js-pagination-btn-prev');
  const btnNextPagination = document.querySelector('.js-pagination-btn-next');

  const renderProducts = (products, container, numberOfProducts, page) => {
    container.innerHTML = '';

    const firstProductIndex = numberOfProducts * page - numberOfProducts;
    const lastProductIndex = firstProductIndex + numberOfProducts;
    const productsOnPage = products.slice(firstProductIndex, lastProductIndex);

    productsOnPage.forEach((product) => {
      const article = createProductCard(product);
      container.append(article);
    });
  };

  const renderBtn = (page) => {
    const li = document.createElement('li');
    li.classList.add('pagination-item');
    li.textContent = page;

    if (currentPage === page) {
      li.classList.add('active');
    }

    return li;
  };

  const renderPagination = (products, numberOfProducts) => {
    const pagesCount = Math.ceil(products.length / numberOfProducts);
    const ul = document.querySelector('.js-pagination-list');

    ul.innerHTML = ''; // очищаем старые кнопки

    for (let i = 1; i <= pagesCount; i++) {
      const li = renderBtn(i);
      ul.append(li);
    }

    pagination.classList.remove('hidden');
  };

  const updatePagination = () => {
    pagination.addEventListener('click', (event) => {
      if (!event.target.closest('.pagination-item')) return;

      currentPage = +event.target.textContent;
      renderProducts(products, productContainer, productCount, currentPage);

      const currentLi = document.querySelector('.pagination-item.active');
      currentLi?.classList.remove('active');
      event.target.classList.add('active');
    });
  };

  const handlePagination = (event) => {
    const currentActiveLi = document.querySelector('.pagination-item.active');
    let newActiveLi;

    const liElements = document.querySelectorAll('.pagination-item');

    if (event.target.closest('.js-pagination-btn-next')) {
      newActiveLi = currentActiveLi.nextElementSibling;
      currentPage++;
    } else {
      newActiveLi = currentActiveLi.previousElementSibling;
      currentPage--;
    }

    if (!newActiveLi && event.target.closest('.js-pagination-btn-next')) {
      newActiveLi = liElements[0];
    } else if (!newActiveLi) {
      newActiveLi = liElements[liElements.length - 1];
    }

    currentActiveLi.classList.remove('active');
    newActiveLi.classList.add('active');

    if (currentPage > liElements.length) {
      currentPage = 1;
    } else if (currentPage < 1) {
      currentPage = liElements.length;
    }

    renderProducts(products, productContainer, productCount, currentPage);
  };

  // Инициализация
  renderProducts(products, productContainer, productCount, currentPage);
  renderPagination(products, productCount);
  updatePagination();

  btnNextPagination.addEventListener('click', handlePagination);
  btnPrevPagination.addEventListener('click', handlePagination);
};

export { paginate };



/* const paginate = (products) => {
  let productCount = 10;//количество продуктов на странице
  let currentPage = 1;

  const productContainer = document.querySelector('.js-products-list');
  const pagination = document.querySelector('.js-pagination');
  const btnPrevPagination = document.querySelector('.js-pagination-btn-prev');
  const btnNextPagination = document.querySelector('.js-pagination-btn-next');

  const renderProducts = (products, container, numberOfProducts, page) => {
    productContainer.innerHTML = '';//очищаем все содержимое массива
    
    const firstProductIndex = numberOfProducts * page - numberOfProducts;
    const lastProductIndex = firstProductIndex + numberOfProducts;
    const productsOnPage = products.slice(firstProductIndex, lastProductIndex);//вырезает из массива элементы от первого до последнего индекса 

    productsOnPage.forEach(({id, photo, model, prices}) => {
      const article = document.createElement('article');
      article.classList.add('products__item', 'product', 'js-product');

      article.innerHTML = `
        <div class="product__inner  js-link-card" id="${id}">
          <div class="product__labels">
            <div class="product__label product__label_sale js-label-sale">-30%</div>
            <div class="product__label product__label_new js-label-new">New</div>
          </div>
          <a href="#" class="product__image ibg">
            <img src="${photo[0]}" class="product__img js-image-card" alt="photo product">
          </a>
          <div class="product__body">
            <div class="product__content">
              <h3 class="product__title  js-title-card">${model}</h3>
              <div class="product__text">Description product in the shop</div>
            </div>
            <div class="product__prices">
              <div class="product__price">
                <span class="product__price-span js-price-card">${prices[0]}</span><span> $</span>
              </div>
              <div class="product__price product__price_old">
                <span class="product__price-span js-price-card-old">${prices[1]}</span><span> $</span>
              </div>
            </div>
            <div class="product__actions actions-product">
              <div class="actions-product__body">
                <button type="button" class="actions-product__button btn btn_white js-buy-button">add to cart</button>
                <button type="button" class="actions-product__link actions-product__link_share js-share-product">Share</button>
                <button type="button" class="actions-product__link actions-product__link_favorite js-favorite-product">Like</button>
              </div>
            </div>
          </div>
        </div>
      `;

      container.append(article);
    });
  };

  const renderPagination = (products, numberOfProducts) => {
    const pagesCount = Math.ceil(products.length / numberOfProducts);//количество продуктов в массиве делим на число продуктов на одной странице и округляем в большую сторону
    const ul = document.querySelector('.js-pagination-list');

    for (let i = 1; i < pagesCount; i++) {
      const li = renderBtn(i);
      ul.append(li);
    }

    pagination.classList.remove('hidden');
  };

  const renderBtn = (page) => {
    const li = document.createElement('li');
    li.classList.add('pagination-item');
    li.textContent = page;

    if (currentPage === page) {
      li.classList.add('active');
    }

    return li;
  };

  const updatePagination = () => {
    pagination.addEventListener('click', (event) => {
      if (!event.target.closest('.pagination-item')) {//если у элемента нет класса, выходим
        return;
      } else {
        currentPage = event.target.textContent;
        renderProducts(products, productContainer, productCount, currentPage);
        let currentLi = document.querySelector('.pagination-item.active');
        currentLi.classList.remove('active');
        event.target.classList.add('active');
      }
    });
  };

  renderProducts(products, productContainer, productCount, currentPage);
  renderPagination(products, productCount);
  updatePagination();

  const liElements = document.querySelectorAll('.pagination-item');

  const handlePagination = (event) => {
    const currentActiveLi = document.querySelector('.pagination-item.active');
    let newActiveLi;

    if (event.target.closest('.js-pagination-btn-next')) {
      newActiveLi = currentActiveLi.nextElementSibling;
      currentPage++;//показываем продукты, которые есть на именно этой странице
    } else {
      newActiveLi = currentActiveLi.previousElementSibling;
      currentPage--;//показываем продукты, которые есть на именно этой странице
    } 

    if (!newActiveLi && event.target.closest('.js-pagination-btn-next')) {//чтобы не было ошибки, когда после последней страницы нажимаем опять кнопку. 
      newActiveLi = liElements[0];
    } else if (!newActiveLi) {//чтобы был зацикленная пагинация
      newActiveLi = liElements[liElements.length - 1];
    }

    currentActiveLi.classList.remove('active');
    newActiveLi.classList.add('active');

    if (currentPage > liElements.length) {
      currentPage = 1;
    } else if (currentPage < 1){
      currentPage = liElements.length;
    }

    renderProducts(products, productContainer, productCount, currentPage);
  };

  btnNextPagination.addEventListener('click', handlePagination);
  btnPrevPagination.addEventListener('click', handlePagination);
};

export {
  paginate
}; */
