import { createProduct, showProduct } from './components/product';
import { menuContent, createCategories, prepareDroppedMenu } from './components/menu';
import { Fancybox } from '@fancyapps/ui';
import { cartContent } from './components/cart';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
Fancybox.bind('[data-fancybox]');

const wrapperEl = document.getElementById('wrapper');
const navbarEl = document.getElementById('navbar');
navbarEl.innerHTML = menuContent;
const dropdownEl = document.getElementById('mega-menu-dropdown');
const cartEl = document.getElementById('popover-click');
cartEl.innerHTML = cartContent;
const API_URL = 'http://localhost:3000';
var categoryEl = '';
const products = [];

const filterArray = (array, category) => array.filter(product => product.category === category);

const saveProductsToArray = array => {
  array.forEach(product => products.push(product));
};
const discountedPrice = product => {
  let correctPrice = product.price;
  if (product.isDiscount)
    correctPrice = product.price - product.price * (product.discountPercentage / 100);
  correctPrice = correctPrice.toFixed(2);
  return correctPrice;
};

const getCategory = () => {
  categoryEl = document.getElementById('mega-menu-dropdown');
  categoryEl.addEventListener('click', event => {
    if (event.target.nodeName !== 'A') {
      return;
    }
    let chosenCategory = filterArray(products, event.target.dataset.id);
    showProduct(chosenCategory, wrapperEl);
  });
};

prepareDroppedMenu();
const createDropdown = async () => {
  const contentHTML = await createCategories();
  dropdownEl.innerHTML = contentHTML;
};

fetch(`${API_URL}/products`)
  .then(res => res.json())
  .then(saveProductsToArray)
  .then(() => createDropdown())
  .then(() => getCategory());
