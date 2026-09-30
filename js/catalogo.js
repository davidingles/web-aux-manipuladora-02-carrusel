import { PRODUCTS as products } from './products-data.js';
import { ProductDialog } from './product-dialog.js';

const grid = document.querySelector('.catalog-grid');
const results = document.querySelector('.catalog-results');
const filters = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('.catalog-search input');

const productDialog = new ProductDialog({
  dialogSelector: '.catalog-dialog',
  products,
  basePath: '../'
});

let activeFilter = 'todos';

const productImage = (product) => `../assets/catalogo/${encodeURIComponent(product.image)}`;

const visibleProducts = () => {
  const query = search ? search.value.trim().toLocaleLowerCase('es') : '';
  return products.filter((product) => {
    const categoryMatches = activeFilter === 'todos' || product.category === activeFilter;
    const text = `${product.title} ${product.id} ${product.category}`.toLocaleLowerCase('es');
    return categoryMatches && text.includes(query);
  });
};

productDialog.getVisibleProducts = visibleProducts;

const render = () => {
  const visible = visibleProducts();
  if (results) {
    results.textContent = `${visible.length} ${visible.length === 1 ? 'referencia encontrada' : 'referencias encontradas'}`;
  }
  if (grid) {
    grid.innerHTML = visible.length
      ? visible
          .map(
            (product) =>
              `<button class="catalog-card" type="button" data-product="${product.id}"><span class="catalog-card__image"><img src="${productImage(product)}" alt="${product.title}" loading="lazy" /></span><span class="catalog-card__body"><span><span class="catalog-card__category">${product.category}</span><h3>${product.title}</h3></span><span class="catalog-card__arrow" aria-hidden="true">↗</span></span></button>`
          )
          .join('')
      : '<p class="catalog-empty">No hay referencias que coincidan con la búsqueda.</p>';
  }
};

filters.forEach((button) =>
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle('is-active', item === button));
    render();
  })
);

search?.addEventListener('input', render);

grid?.addEventListener('click', (event) => {
  const card = event.target.closest('[data-product]');
  if (card) {
    productDialog.open(card.dataset.product, card);
  }
});

const menuButton = document.querySelector('.catalog-menu');
const nav = document.querySelector('.catalog-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  })
);

render();

const initialHash = window.location.hash.replace('#', '');
if (initialHash) {
  productDialog.open(initialHash);
}

document.querySelector('.back-to-top')?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#inicio');
});