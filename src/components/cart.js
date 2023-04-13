export const cartOptions = {
  placement: 'right',
  backdrop: false,
  bodyScrolling: true,
  edge: true,
  edgeOffset: '',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
};

export const cartContent = `
    <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">Your Cart</h5>
   <button type="button" id="close-cart-button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Close menu</span>
   </button>
    <div id="cart" class="px-3 py-2">
    </div>`;

export const createCartElement = product => {
  const element = document.createElement('div');
  element.classList.add(
    'cart-item',
    'flex',
    'w-100',
    'justify-between',
    'border-b-2',
    'border-t-2',
    'py-2',
    'my-1'
  );
  element.dataset.id = product.id;
  element.innerHTML = `
    <div class="mr-2 flex"> 
    <img class="cart-img mr-2" src="${product.thumbnail}"/>
    <div> 
    <p>${product.title}</p>
    <p class="text-lg font-bold">$${product.totalPrice}</p>
    </div>
    </div>
    <div class="flex gap-2">
    <p class="mr-1 self-center font-bold">${product.inCart}</p>
    <button id="add" class="mr-1 hover:outline-2"> + </button>
    <button id="remove" class="hover:outline-2" > - </button>
    </div>`;
  return element;
};

export const createSumCartElement = productList => {
  const sumPrices = productList.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);
  const sumQuantities = productList.reduce((sum, item) => {
    return sum + item.inCart;
  }, 0);
  const element = document.createElement('div');
  const summary = document.createElement('div');
  summary.classList.add(
    'flex',
    'w-100',
    'justify-between',
    'border-b-2',
    'border-t-2',
    'py-2',
    'my-1',
    'text-2xl',
    'font-bold',
    'pr-4',
    'pl-2'
  );
  summary.innerHTML = `
  <p>TOTAL: </p>
  <p id="total-price">$${sumPrices}</p>
  <p id="total-quantity">${sumQuantities}</p>`;
  element.append(summary);
  const element2 = document.createElement('div');
  element2.classList.add('flex', 'justify-center', 'mt-4');
  const buyBtn = document.createElement('button');
  buyBtn.setAttribute('id', 'buyBtn');
  buyBtn.classList.add(
    'cart-item',
    'text-white',
    'm-auto',
    'bg-blue-700',
    'hover:bg-blue-800',
    'focus:ring-4',
    'focus:ring-blue-300',
    'font-medium',
    'rounded-lg',
    'text-xl',
    'px-5',
    'py-2.5',
    'dark:bg-blue-600',
    'dark:hover:bg-blue-700',
    'focus:outline-none',
    'dark:focus:ring-blue-800'
  );
  buyBtn.textContent = 'BUY NOW';
  element2.append(buyBtn);
  element.append(element2);
  return element;
};
