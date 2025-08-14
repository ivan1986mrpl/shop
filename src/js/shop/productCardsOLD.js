
const renderProductCard = ({id, photo, model, prices}) => {
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

  return li;
};

const appendProductCard = (product, container) => {//добавляет продукт в конец родителя
  container.append(product);
};

const renderProductCards = (products, container) => {
  products.forEach((product) => {
    const card = renderProductCard(product);
    appendProductCard(card, container);
  });
};

export {
  renderProductCards
};

// нигде не используется