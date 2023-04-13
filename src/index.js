import { showProduct, discountedPrice } from './components/product';
import { menuContent, createCategories, prepareDroppedMenu } from './components/menu';
import { Fancybox } from '@fancyapps/ui';
import {
  cartContent,
  createCartElement,
  cartOptions,
  createSumCartElement,
} from './components/cart';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Drawer } from 'flowbite';
Fancybox.bind('[data-fancybox]');

const API_URL = 'http://localhost:3000';
const wrapperEl = document.getElementById('wrapper');
const navbarEl = document.getElementById('navbar');
var categoryEl = '';
const storagedProducts = JSON.parse(localStorage.getItem('products-in-cart'));
const productsInCart = storagedProducts || [];
const fetchedProducts = [];

navbarEl.innerHTML = menuContent;
const dropdownEl = document.getElementById('mega-menu-dropdown');
const shoppingCartEl = document.getElementById('drawer-right-example');
const drawer = new Drawer(shoppingCartEl, cartOptions);
shoppingCartEl.innerHTML = cartContent;
const cartEl = document.getElementById('cart');
const closeCartButtonEl = document.getElementById('close-cart-button');
closeCartButtonEl.addEventListener('click', () => drawer.hide());
const cartButtonEl = document.getElementById('cart-button');
cartButtonEl.addEventListener('click', () => drawer.show());

const addToCart = element => cartEl.append(element);

const removeFromCart = element => cartEl.remove(element);

const getCategory = (array, category) => array.filter(product => product.category === category);

const fetchProductsToArray = array =>
  array.forEach(product => {
    fetchedProducts.push(product);
  });

const isProductInCart = product => {
  let check = {
    bool: false,
    index: 0,
  };
  productsInCart.forEach((item, index) => {
    if (item.id === product.id) {
      check.bool = true;
      check.index = index;
    }
  });
  return check;
};

const addProductToStorage = product => {
  product.stock--;
  product.inCart++;
  product.totalPrice += +discountedPrice(product);
};

const removeProductFromStorage = product => {
  product.stock++;
  product.inCart--;
  product.totalPrice -= +discountedPrice(product);
};

const updateStorageProducts = (product, event) => {
  let currentProduct;
  if (isProductInCart(product).bool) {
    currentProduct = productsInCart[isProductInCart(product).index];
    if (event === 'add') addProductToStorage(currentProduct);
    if (event === 'remove') removeProductFromStorage(currentProduct);
  } else {
    currentProduct = product;
    if (event === 'add') addProductToStorage(currentProduct);
    productsInCart.push(currentProduct);
  }
  const savedProducts = JSON.stringify(productsInCart);
  localStorage.setItem('products-in-cart', savedProducts);
  loadCart();
};

const addProductToCart = product => {
  const element = createCartElement(product);
  addToCart(element);
};

const getProductIndex = id => {
  let returnIndex = 0;
  productsInCart.forEach((item, index) => {
    if (item.id === id) returnIndex = index;
  });
  return returnIndex;
};

const cartButtonEvents = () => {
  const cartItemEL = document.querySelectorAll('.cart-item');
  cartItemEL.forEach(element => {
    const productId = +element.dataset.id;
    const productIndex = getProductIndex(productId);
    const product = productsInCart[productIndex];
    element.addEventListener('click', event => {
      if (event.target.id === 'add') updateStorageProducts(product, 'add');
      if (event.target.id === 'remove') {
        updateStorageProducts(product, 'remove');
        if (product.inCart === 0) {
          productsInCart.splice(productIndex, 1);
          if (productsInCart.length === 0) localStorage.clear();
          loadCart();
        }
      }
      if (event.target.id === 'buyBtn') {
        const totalPrice = document.getElementById('total-price').textContent;
        const totalQuantity = document.getElementById('total-quantity').textContent;
        alert(`YOU BOUGHT ${totalQuantity} ITEMS FOR ${totalPrice}`);
        productsInCart.length = 0;
        localStorage.clear();
        loadCart();
      }
    });
  });
};

const loadCart = () => {
  cartEl.innerHTML = '';
  if (productsInCart) {
    productsInCart.forEach(addProductToCart);
    addToCart(createSumCartElement(productsInCart));
    cartButtonEvents();
  }
  return;
};

const addToCartEvent = chosenCategory => {
  const productsCardEl = document.querySelectorAll('#product-card');
  productsCardEl.forEach((card, index) =>
    card.addEventListener('click', event => {
      if (event.target.nodeName !== 'BUTTON') return;
      const product = chosenCategory[index];
      updateStorageProducts(product, 'add');
      drawer.show();
    })
  );
};

const getProductsFromCategory = () => {
  categoryEl = document.getElementById('mega-menu-dropdown');
  categoryEl.addEventListener('click', event => {
    if (event.target.nodeName !== 'A') {
      return;
    }
    let chosenCategory = getCategory(fetchedProducts, event.target.dataset.id);
    showProduct(chosenCategory, wrapperEl);
    addToCartEvent(chosenCategory);
  });
};

const buildWebsite = async array => {
  fetchProductsToArray(array);
  const contentHTML = await createCategories();
  dropdownEl.innerHTML = contentHTML;
  getProductsFromCategory();
};

// prepareDroppedMenu();
loadCart();

fetch(`https://raw.githubusercontent.com/KrzysztofRozbicki/goit-shopping-basket/main/db.json`)
  .then(res => res.json())
  .then(buildWebsite);
