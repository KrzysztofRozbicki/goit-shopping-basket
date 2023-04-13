const createProduct = product => {
  const STAR_SIZE = 1.5;
  const STAR_VIEWBOX = 16;
  const name = product.title;
  const image = product.thumbnail;
  const discountPrice = discountedPrice(product);
  const rating = product.rating;
  const pictures = product.images;

  const insertGallery = pictures => {
    let returnHTMLcode = '';
    pictures.forEach(picture => {
      const addHTMLcode = `
      <a href="${picture}" data-fancybox="${name}" data-caption="${name}   $${discountPrice}" class="hidden">
                    <img
        width="400"
        height="400"
          class="p-8 rounded-t-lg"
          data-images="https://i.dummyjson.com/data/products/2/1.jpg, https://i.dummyjson.com/data/products/2/2.jpg, https://i.dummyjson.com/data/products/2/3.jpg, https://i.dummyjson.com/data/products/2/thumbnail.jpg"
          src="${picture}"
          alt="${name}"
        />
    </a>`;
      returnHTMLcode += addHTMLcode;
    });
    return returnHTMLcode;
  };
  const oneStar = (width, pos) => `<svg
    aria-hidden="true"
    class="w-6 h-6 text-yellow-300 relative"
    style="left: -${pos}rem;"
    fill="currentColor"
    viewBox="${2 - width} 2 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>First star</title>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>`;

  const createStars = rating => {
    let codeHTML = '';
    const amountOfStars = Math.floor(rating);
    for (let i = 0; i < amountOfStars; i++) {
      codeHTML += oneStar(0, 0);
    }
    const rest = +(rating - Math.floor(rating)).toFixed(2);
    const width = STAR_VIEWBOX - Math.floor(STAR_VIEWBOX * rest);
    const pos = STAR_SIZE - STAR_SIZE * rest;
    codeHTML += oneStar(width, pos);
    return codeHTML;
  };

  return ` <div id="product-card"
      class="gallery w-[17%] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="${image}" data-fancybox="${name}" data-caption="${name}   $${discountPrice}">
        <img
        width="400"
        height="400"
          class="p-0 mb-2 rounded-t-lg thumbnail"
          data-images="https://i.dummyjson.com/data/products/2/1.jpg, https://i.dummyjson.com/data/products/2/2.jpg, https://i.dummyjson.com/data/products/2/3.jpg, https://i.dummyjson.com/data/products/2/thumbnail.jpg"
          src="${image}"
          alt="${name}"
        />
        </a>
        ${insertGallery(pictures)}
      
      <div class="px-5 pb-5 flex flex-col justify-between h-auto">
        <a href="#">
          <h5 class="text-xl text-center font-semibold tracking-tight text-gray-900 h-20 flex flex-col justify-center items-center dark:text-white">
            ${name}
          </h5>
        </a>
        <div>
        <div class="flex items-center mt-2.5 mb-5">
        ${createStars(rating)}
          <span
            class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
            >${rating}</span
          >
        </div>
        <div class="flex flex-col items-center items-center justify-between">
          ${showPrice(product)}
   <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
   Add to Cart
   </button>
        </div>
        </div>
      </div>
    </div>`;
};

export const discountedPrice = product => {
  let correctPrice = product.price;
  if (product.isDiscount)
    correctPrice = product.price - product.price * (product.discountPercentage / 100);
  correctPrice = correctPrice.toFixed(2);
  return correctPrice;
};

const showPrice = product => {
  const element = document.createElement('p');
  element.classList.add('mb-4', 'items-center', 'flex', 'flex-col');
  const regularPrice = `<p class="text-2xl mb-12 font-bold text-gray-900 dark:text-white">$${product.price.toFixed(
    2
  )}</p>`;
  const discountPrice = `<p class="text-xl mb-2 font-bold text-red-700 text-gray-900 dark:text-white line-through">$${product.price.toFixed(
    2
  )}</p>
  <p class="text-3xl mb-2 font-bold text-gray-900 text-green-700 dark:text-white">$${discountedPrice(
    product
  )}</p >`;

  if (product.isDiscount) element.innerHTML = discountPrice;
  else element.innerHTML = regularPrice;
  return element.outerHTML;
};

export const showProduct = (array, element) => {
  element.innerHTML = '';
  array.forEach(product => (element.innerHTML += createProduct(product)));
};
