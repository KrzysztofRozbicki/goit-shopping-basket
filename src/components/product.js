export const createProduct = ({ name, image, price, rating, pictures }) => {
  const insertGallery = pictures => {
    let returnHTMLcode = '';
    pictures.forEach(picture => {
      const addHTMLcode = `
      <a href="${picture}" data-fancybox="${name}" data-caption="${name}   $${price}" class="hidden">
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
  const oneStar = `<svg
    aria-hidden="true"
    class="w-5 h-5 text-yellow-300"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>First star</title>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>`;

  const createStars = rating => {
    let codeHTML = '';
    const amountOfStars = Math.round(rating);
    for (let i = 0; i < amountOfStars; i++) {
      codeHTML += oneStar;
    }
    return codeHTML;
  };

  return ` <div 
      class="gallery w-[20%] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="${image}" data-fancybox="${name}" data-caption="${name}   $${price}">
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
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
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
        <div class="flex flex-col items-center justify-between">
          <span class="text-3xl mb-2 font-bold text-gray-900 dark:text-white">$${price}</span>
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Add to cart</a
          >
        </div>
        </div>
      </div>
    </div>`;
};

export const showProduct = array, element => {
  
  element.innerHTML = '';
  array.forEach(
    product =>
      (element.innerHTML += createProduct({
        name: product.title,
        image: product.thumbnail,
        price: discountedPrice(product),
        rating: product.rating,
        pictures: product.images,
      }))
  );
};
