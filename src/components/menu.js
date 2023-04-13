export const createCategories = async () => {
  const CATEGORIES_IN_COLUMN = 7;

  const fetchCategories = async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const categories = await response.json();
    return categories;
  };

  const createCategories = categories => {
    const beginningHTML = `<div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
              <ul class="space-y-4" aria-labelledby="mega-menu-dropdown-button">`;
    const startHTML = `<div class="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
              <ul class="space-y-4">`;

    const listItem = category => `
                <li>
                  <a
                  id="category"
                  data-id="${category}"
                    href="#${category}"
                    class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                  >
                    ${category.toUpperCase()}
                  </a>
                </li>`;

    const endHTML = `
            </ul>
        </div>`;
    let totalHTML = '';
    for (let i = 0; i < categories.length; i++) {
      if (i === 0) {
        totalHTML += beginningHTML;
      }
      if (i !== 0 && i % CATEGORIES_IN_COLUMN === 0) {
        totalHTML += startHTML;
      }
      totalHTML += listItem(categories[i]);
      if (
        i !== 0 &&
        (i % CATEGORIES_IN_COLUMN === CATEGORIES_IN_COLUMN - 1 || i === categories.length - 1)
      ) {
        totalHTML += endHTML;
      }
    }
    return totalHTML;
  };

  const result = await fetchCategories().then(createCategories);
  return result;
};

export const prepareDroppedMenu = () => {
  menuButtonEl = document.getElementById('mega-menu-dropdown-button');
  menuDropDownEl = document.getElementById('mega-menu-dropdown');
  menuButtonEl.addEventListener('blur', () =>
    setTimeout(() => menuDropDownEl.classList.add('hidden'), 200)
  );
};

export const menuContent = `
  <div class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
    <a href="#" class="flex items-center">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
       🛒 DummyShop
      </span>
    </a>
    <div class="flex items-center md:order-2">
      <a
        href="#"
        class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        Login
      </a>
      <a
        href="#"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Sign up
      </a>
      <button id="cart-button" type="button" class="text-xl text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">🛒  Cart<span style="font-size: 10px; margin-left: 4px;">🔽</span></button>
    <div id="drawer-right-example" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
    </div>  
      <button data-collapse-toggle="mega-menu" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
    <div
      id="mega-menu"
      class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
    >
      <ul class="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
        <li>
          <a
            href="#"
            class="block py-2 pl-3 pr-4 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li>
                    <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                        Categories <svg aria-hidden="true" class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
          <div
            id="mega-menu-dropdown"
            class="absolute z-10 grid hidden w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700"
          >
          </div>
        </li>
        <li>
          <a id="team"
            href="#"
            class="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Team
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  </div>`;
