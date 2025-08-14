const createProductCard = ({ id, photo, model, prices }) => {
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

  return article;
};

export { createProductCard };//used in file pagination.js
