/**
 * Controlador de la ventana modal de ficha técnica de producto
 * Integra visor 3D interactivo con @google/model-viewer, reproductor de vídeo y navegación Anterior / Siguiente
 */

export class ProductDialog {
  constructor({ dialogSelector = '.catalog-dialog', products = [], basePath = '' } = {}) {
    this.dialog = document.querySelector(dialogSelector);
    if (!this.dialog) return;

    this.products = products;
    this.basePath = basePath;
    this.activeProductId = null;
    this.lastTriggeredElement = null;

    this.dialogContent = this.dialog.querySelector('.catalog-dialog__content');
    this.modelHint = this.dialog.querySelector('.catalog-dialog__model-hint');
    this.videoPanel = this.dialog.querySelector('.catalog-dialog__video');
    this.productVideo = this.videoPanel?.querySelector('video');
    this.prevButton = this.dialog.querySelector('.catalog-dialog__prev');
    this.nextButton = this.dialog.querySelector('.catalog-dialog__next');
    this.closeButton = this.dialog.querySelector('.catalog-dialog__close');

    this.initEvents();
  }

  productImage(product) {
    return `${this.basePath}assets/catalogo/${encodeURIComponent(product.image)}`;
  }

  productModel(product) {
    return `${this.basePath}assets/catalogo/${encodeURIComponent(product.model)}`;
  }

  productVideoUrl(product) {
    return `${this.basePath}assets/catalogo/${encodeURIComponent(product.video)}`;
  }

  contactUrl() {
    return `${this.basePath}#contacto`;
  }

  getVisibleProducts() {
    return this.products;
  }

  open(productId, triggerElement = null) {
    const product = this.products.find((item) => item.id === productId);
    if (!product || !this.dialog || !this.dialogContent) return;

    this.activeProductId = product.id;
    this.lastTriggeredElement = triggerElement;

    const visible = this.getVisibleProducts();
    const currentIndex = visible.findIndex((item) => item.id === product.id);

    // Actualizar disponibilidad de botones de navegación Anterior y Siguiente
    if (this.prevButton) {
      const isFirst = currentIndex <= 0;
      this.prevButton.disabled = isFirst;
      this.prevButton.setAttribute('aria-disabled', String(isFirst));
    }
    if (this.nextButton) {
      const isLast = currentIndex === -1 || currentIndex >= visible.length - 1;
      this.nextButton.disabled = isLast;
      this.nextButton.setAttribute('aria-disabled', String(isLast));
    }

    const hasModel = Boolean(product.model);
    const hasVideo = Boolean(product.video);

    const copy = `
      <div class="catalog-dialog__copy">
        <p class="catalog-eyebrow">${product.category}</p>
        <div class="catalog-dialog__title-row">
          <h2 id="dialog-title">${product.title}</h2>
        </div>
        <p>${product.description}</p>
        <a href="${this.contactUrl()}">Solicitar información →</a>
      </div>
    `;

    // Cuando no hay modelo 3D, mostramos la fotografía
    const photo = (!hasModel && !hasVideo)
      ? `<div class="catalog-dialog__photo"><img src="${this.productImage(product)}" alt="${product.title}" /></div>`
      : '';

    const model = hasModel
      ? `<div class="catalog-dialog__model"><model-viewer src="${this.productModel(product)}" alt="Modelo 3D de ${product.title}" camera-controls auto-rotate shadow-intensity="1"></model-viewer></div>`
      : '';

    this.dialog.classList.toggle('has-video', hasVideo);
    this.dialog.classList.toggle('has-model', hasModel);
    this.dialogContent.classList.toggle('is-quad', hasVideo);
    this.dialogContent.innerHTML = `${copy}${model}${photo}`;

    if (this.modelHint) {
      this.modelHint.hidden = !hasModel;
      if (hasModel) {
        const modelBox = this.dialogContent.querySelector('.catalog-dialog__model');
        modelBox?.append(this.modelHint);
      }
    }

    // Gestión del panel de vídeo: solo se inserta en el DOM si el producto tiene vídeo
    if (this.videoPanel && this.productVideo) {
      if (hasVideo) {
        this.videoPanel.hidden = false;
        this.dialogContent.append(this.videoPanel);
        this.productVideo.src = this.productVideoUrl(product);
        this.productVideo.play().catch(() => {});
      } else {
        this.productVideo.pause();
        this.productVideo.removeAttribute('src');
        this.productVideo.load();
        this.videoPanel.hidden = true;
        // Retirar del DOM para evitar crear celdas de grid vacías
        if (this.videoPanel.parentElement === this.dialogContent) {
          this.videoPanel.remove();
        }
      }
    }

    if (!this.dialog.open) {
      this.dialog.showModal();
    }
  }

  openPrev() {
    const visible = this.getVisibleProducts();
    const currentIndex = visible.findIndex((item) => item.id === this.activeProductId);
    if (currentIndex > 0) {
      const prevProduct = visible[currentIndex - 1];
      if (prevProduct) {
        this.open(prevProduct.id, this.lastTriggeredElement);
      }
    }
  }

  openNext() {
    const visible = this.getVisibleProducts();
    const currentIndex = visible.findIndex((item) => item.id === this.activeProductId);
    if (currentIndex >= 0 && currentIndex < visible.length - 1) {
      const nextProduct = visible[currentIndex + 1];
      if (nextProduct) {
        this.open(nextProduct.id, this.lastTriggeredElement);
      }
    }
  }

  close() {
    if (this.dialog && this.dialog.open) {
      this.dialog.close();
    }
  }

  initEvents() {
    this.prevButton?.addEventListener('click', () => this.openPrev());
    this.nextButton?.addEventListener('click', () => this.openNext());
    this.closeButton?.addEventListener('click', () => this.close());

    // Cierre al pulsar fuera de la modal (en el backdrop difuminado)
    this.dialog.addEventListener('click', (event) => {
      if (event.target === this.dialog) {
        this.close();
      }
    });

    // Navegación con teclado (Flecha izquierda para anterior, flecha derecha para siguiente)
    this.dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.openPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.openNext();
      }
    });

    // Limpieza al cerrar
    this.dialog.addEventListener('close', () => {
      if (this.productVideo) {
        this.productVideo.pause();
        this.productVideo.removeAttribute('src');
        this.productVideo.load();
      }
      if (this.videoPanel && this.videoPanel.parentElement === this.dialogContent) {
        this.videoPanel.remove();
      }
      const trigger = this.lastTriggeredElement;
      this.lastTriggeredElement = null;
      if (trigger && trigger.isConnected) {
        requestAnimationFrame(() => trigger.focus());
      }
    });
  }
}
