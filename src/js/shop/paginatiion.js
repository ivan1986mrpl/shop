const paginate = (products) => {
  let productCount = 7;//количество продуктов на странице
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
      const li = document.createElement('li');
      li.classList.add('products__item', 'product', 'js-product');

      li.innerHTML = `
          <a href="#" id="${id}" class="product__link js-link-card">
            <div class="product__image">
              <img src="${photo[0]}" alt="product" class="product__img js-image-card">
            </div>
            <div class="product__description">
              <h3 class="product__title js-title-card">${model}</h3>
              <div class="product__text">
                <p>description product in shop</p>
              </div>
            </div>
            <div class="product__price">
              <span class="product__price-span js-price-card">${prices[0]}</span><span> $</span>
            </div>
          </a>
          <button type="button" class="btn product__buy-btn js-buy-button">add to cart</button>
      `;

      container.append(li);
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
        console.log(currentPage);
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
};