const cartData = () => {
  const cart = document.querySelector('.js-cart');
  const productsList = document.querySelector('.js-products-list');
  const cartList = document.querySelector('.js-cart-list');
  const cartOrder = document.querySelector('.js-cart-order-container');
  const cartEmpty = document.querySelector('.js-cart-empty-container');
  const formatter = new Intl.NumberFormat('ru');

  const updateCartItemCount = () => {
    cart.addEventListener('click', (e) => {
      if (!e.target.matches('.js-minus') && !e.target.matches('.js-plus')) {
        return;
      }

      const counter = e.target.closest('.js-counter');
      const currentItems = counter.querySelector('.js-current-items');
      const minusBtn = counter.querySelector('.js-minus');

      if (e.target.matches('.js-plus')) {
        currentItems.textContent = ++currentItems.textContent;
        minusBtn.classList.remove('disabled');
        calcTotalCartValue();
      }

      if (e.target.matches('.js-minus')) {
        if (parseInt(currentItems.textContent) > 2) {
          currentItems.textContent = --currentItems.textContent;
        } else if (parseInt(currentItems.textContent) === 2) {
          currentItems.textContent = --currentItems.textContent;
          minusBtn.classList.add('disabled');
        }
        calcTotalCartValue();
      }
    });
  };
  updateCartItemCount();

  const addProductToCart = () => {
    productsList.addEventListener('click', (e) => {
      if (!e.target.classList.contains('js-buy-button')) {
        return;
      }

      const product = e.target.closest('.js-product');
      const imageCart = product.querySelector('.js-image-card');
      const modelCart = product.querySelector('.js-title-card');
      const priceCart = product.querySelector('.js-price-card');
      const linkCart = product.querySelector('.js-link-card');

      const productInfo = {
        id: linkCart.getAttribute('id'),
        model: modelCart.textContent,
        price: priceCart.textContent,
        photo: imageCart.src,
      };

      const productInCart = cartList.querySelector(`#${productInfo.id}`);
      if (productInCart) {
        const currentItemsProducts = productInCart.querySelector('.js-current-items');
        const minusBtn = productInCart.querySelector('.js-minus');

        currentItemsProducts.textContent = parseInt(currentItemsProducts.textContent) + 1;
        minusBtn.classList.remove('disabled');
      } else {
        renderProductCart(productInfo);
      }

      toggleCartStatus();
      calcTotalCartValue();
    });
  };
  addProductToCart();

  const renderProductCart = (productInfo) => {
    const li = document.createElement('li');
    li.classList.add('cart-item', 'column', 'js-cart-item');
    li.innerHTML = `
      <span class="close js-remove"></span>
      <div class="cartline row jcfs aic" id="${productInfo.id}">
        <div class="cart-image-container">
          <img src="${productInfo.photo}" alt="photo" class="cart-img">
        </div>
        <div class="column">
          <div class="cart-model row jcfs aic">${productInfo.model}</div>
          <div class="row jcsb aic">
            <div class="counter row jcc aic js-counter">
              <button type="button" class="minus control row jcc aic js-minus disabled">-</button>
              <div class="current-items row jcc aic js-current-items">1</div>
              <button type="button" class="plus control row jcc aic js-plus">+</button>
            </div>
            <div class="row jcc aic">
              <span class="cart-price row jcfe js-cart-price" data-price="${productInfo.price}">${productInfo.price}</span>
              <span class="rouble">$</span>
            </div>
          </div>
        </div>
      </div>
    `;

    cartList.append(li);
  };

  const removeProductFromCart = () => {
    cartList.addEventListener('click', (e) => {
      if (!e.target.classList.contains('js-remove')) {
        return;
      }

      const cartItem = e.target.closest('.js-cart-item');
      cartItem.remove();
      toggleCartStatus();
      calcTotalCartValue();
    });
  };
  removeProductFromCart();

  const toggleCartStatus = () => {
    if (cart.querySelector('.js-cart-item')) {
      cartOrder.classList.remove('hidden');
      cartEmpty.classList.add('hidden');
    } else {
      cartOrder.classList.add('hidden');
      cartEmpty.classList.remove('hidden');
    }
  };
  toggleCartStatus();

  const calcTotalCartValue = () => {
    const cartItems = document.querySelectorAll('.js-cart-item');
    const cartTotalPrice = document.querySelector('.js-cart-total-price');

    let totalCartValue = 0;

    cartItems.forEach((item) => {
      const itemCount = item.querySelector('.js-current-items');
      const itemPrice = item.querySelector('.js-cart-price');
      const itemTotalPrice = parseInt(itemCount.textContent) * parseInt(itemPrice.dataset.price.replace(/\s/g, ''));

      itemPrice.textContent = formatter.format(itemTotalPrice);
      totalCartValue += itemTotalPrice;
    });

    cartTotalPrice.textContent = formatter.format(totalCartValue);
  };
  calcTotalCartValue();
};

export {
  cartData
};
