/**
 * Motor del carrusel en arco (Arc Carousel)
 * Realiza cálculos trigonométricos de curvatura espacial, rotación tangencial y física de arrastre con inercia
 */

export class ArcCarousel {
  constructor({
    containerSelector,
    trackSelector,
    prevButtonSelector,
    nextButtonSelector,
    onIndexChange
  }) {
    this.container = document.querySelector(containerSelector);
    this.track = document.querySelector(trackSelector);
    this.prevButton = document.querySelector(prevButtonSelector);
    this.nextButton = document.querySelector(nextButtonSelector);
    this.onIndexChange = onIndexChange;

    this.items = [];
    this.currentIndex = 0;
    this.targetIndex = 0;

    // Configuración geométrica del arco
    this.cardPitch = 330; // Distancia estimada entre centros de tarjeta en px
    this.radius = 2100;   // Radio del arco curvado
    this.angleStep = 8.4; // Grados de rotación angular por tarjeta

    // Estados de interacción y física de arrastre
    this.isDragging = false;
    this.hasDragged = false;
    this.pointerStartX = 0;
    this.pointerStartY = 0;
    this.pointerLastX = 0;
    this.pointerLastTime = 0;
    this.dragVelocity = 0;
    this.startDragIndex = 0;
    this.animationFrameId = null;

    this.initEvents();
  }

  /**
   * Actualiza la lista de elementos en el carrusel y sitúa el índice inicial
   */
  setItems(elements, initialIndex = 0) {
    this.items = Array.from(elements);
    this.currentIndex = initialIndex;
    this.targetIndex = initialIndex;
    this.adjustGeometry();
    this.updatePositions();
    this.updateControls();
  }

  /**
   * Adapta el radio y la separación según la resolución de pantalla
   */
  adjustGeometry() {
    const anchoVentana = window.innerWidth;
    if (anchoVentana < 640) {
      this.cardPitch = 270;
      this.radius = 1350;
      this.angleStep = 10.5;
    } else if (anchoVentana < 1024) {
      this.cardPitch = 300;
      this.radius = 1750;
      this.angleStep = 9.2;
    } else {
      this.cardPitch = 330;
      this.radius = 2150;
      this.angleStep = 8.4;
    }
  }

  /**
   * Inicializa escuchadores de eventos para puntero, teclado y redimensión
   */
  initEvents() {
    if (!this.container) return;

    // Eventos unificados de puntero (ratón y pantallas táctiles)
    this.container.addEventListener('pointerdown', (evento) => this.onPointerDown(evento));
    window.addEventListener('pointermove', (evento) => this.onPointerMove(evento));
    window.addEventListener('pointerup', (evento) => this.onPointerUp(evento));
    window.addEventListener('pointercancel', (evento) => this.onPointerUp(evento));

    // Botones de navegación
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.goToPrev());
    }
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.goToNext());
    }

    // Navegación con teclado cuando el contenedor o sus tarjetas tienen foco
    this.container.addEventListener('keydown', (evento) => {
      if (evento.key === 'ArrowLeft') {
        evento.preventDefault();
        this.goToPrev();
      } else if (evento.key === 'ArrowRight') {
        evento.preventDefault();
        this.goToNext();
      }
    });

    // Ajuste geométrico dinámico al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
      this.adjustGeometry();
      this.updatePositions();
    });

    // Prevenir arrastre por defecto de imágenes nativas del navegador
    this.container.addEventListener('dragstart', (evento) => evento.preventDefault());
  }

  onPointerDown(evento) {
    if (evento.button !== 0) return; // Solo clic principal

    this.isDragging = true;
    this.hasDragged = false;
    this.pointerStartX = evento.clientX;
    this.pointerStartY = evento.clientY;
    this.pointerLastX = evento.clientX;
    this.pointerLastTime = performance.now();
    this.dragVelocity = 0;
    this.startDragIndex = this.currentIndex;

    this.container.classList.add('is-dragging');

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  onPointerMove(evento) {
    if (!this.isDragging) return;

    const deltaX = evento.clientX - this.pointerStartX;
    const deltaY = evento.clientY - this.pointerStartY;

    // Detectar si el usuario está realizando un arrastre horizontal perceptible
    if (!this.hasDragged && Math.hypot(deltaX, deltaY) > 6) {
      this.hasDragged = true;
    }

    const ahora = performance.now();
    const tiempoDelta = ahora - this.pointerLastTime;
    if (tiempoDelta > 0) {
      this.dragVelocity = (evento.clientX - this.pointerLastX) / tiempoDelta;
    }
    this.pointerLastX = evento.clientX;
    this.pointerLastTime = ahora;

    // Convertir desplazamiento de píxeles a unidades de índice
    const indexDelta = -deltaX / this.cardPitch;
    let nuevoIndice = this.startDragIndex + indexDelta;

    // Amortiguación elástica en los extremos
    const maxIndice = Math.max(0, this.items.length - 1);
    if (nuevoIndice < 0) {
      nuevoIndice = nuevoIndice * 0.3;
    } else if (nuevoIndice > maxIndice) {
      nuevoIndice = maxIndice + (nuevoIndice - maxIndice) * 0.3;
    }

    this.currentIndex = nuevoIndice;
    this.updatePositions();
  }

  onPointerUp(evento) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.container.classList.remove('is-dragging');

    const maxIndice = Math.max(0, this.items.length - 1);

    if (this.hasDragged) {
      // Inercia suave basada en la velocidad al soltar
      const impulso = (-this.dragVelocity * 140) / this.cardPitch;
      let objetivo = Math.round(this.currentIndex + impulso);
      objetivo = Math.max(0, Math.min(maxIndice, objetivo));
      this.animateToIndex(objetivo);
    } else {
      // Si fue solo un clic y no un arrastre, enfocar la tarjeta seleccionada
      const tarjeta = evento.target.closest('.carousel-card');
      if (tarjeta) {
        const indiceTarjeta = this.items.indexOf(tarjeta);
        if (indiceTarjeta !== -1 && indiceTarjeta !== Math.round(this.currentIndex)) {
          this.animateToIndex(indiceTarjeta);
        }
      }
    }
  }

  goToPrev() {
    const objetivo = Math.max(0, Math.round(this.targetIndex) - 1);
    this.animateToIndex(objetivo);
  }

  goToNext() {
    const maxIndice = Math.max(0, this.items.length - 1);
    const objetivo = Math.min(maxIndice, Math.round(this.targetIndex) + 1);
    this.animateToIndex(objetivo);
  }

  animateToIndex(indiceObjetivo) {
    this.targetIndex = indiceObjetivo;

    const animar = () => {
      const diferencia = this.targetIndex - this.currentIndex;
      // Interpolación suave (lerp)
      this.currentIndex += diferencia * 0.14;

      if (Math.abs(diferencia) < 0.001) {
        this.currentIndex = this.targetIndex;
        this.updatePositions();
        this.updateControls();
        this.animationFrameId = null;
        if (typeof this.onIndexChange === 'function') {
          this.onIndexChange(this.targetIndex);
        }
        return;
      }

      this.updatePositions();
      this.updateControls();
      this.animationFrameId = requestAnimationFrame(animar);
    };

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(animar);
  }

  /**
   * Aplica las transformaciones trigonométricas de arco y perspectiva a cada tarjeta
   */
  updatePositions() {
    const cantidad = this.items.length;
    if (cantidad === 0) return;

    for (let i = 0; i < cantidad; i++) {
      const tarjeta = this.items[i];
      const distanciaRelativa = i - this.currentIndex;

      // Ángulo en grados y radianes para el arco
      const anguloDeg = distanciaRelativa * this.angleStep;
      const anguloRad = (anguloDeg * Math.PI) / 180;

      // Coordenadas del arco convexo (centro situado por debajo del carrusel)
      const posX = this.radius * Math.sin(anguloRad);
      const posY = this.radius * (1 - Math.cos(anguloRad));

      // Profundidad de capas z-index y opacidad para tarjetas lejanas
      const distAbs = Math.abs(distanciaRelativa);
      const zIndex = Math.round(100 - distAbs * 10);
      const opacidad = distAbs > 4 ? Math.max(0, 1 - (distAbs - 4) * 0.7) : 1;

      // Aplicar transformación acelerada por hardware
      tarjeta.style.transform = `translate3d(calc(-50% + ${posX.toFixed(2)}px), ${posY.toFixed(2)}px, 0) rotateZ(${anguloDeg.toFixed(2)}deg)`;
      tarjeta.style.zIndex = zIndex;
      tarjeta.style.opacity = opacidad;

      // Estado activo para la tarjeta central
      if (distAbs < 0.5) {
        tarjeta.classList.add('is-active');
      } else {
        tarjeta.classList.remove('is-active');
      }
    }
  }

  /**
   * Actualiza el estado visual habilitado/deshabilitado de los botones de control
   */
  updateControls() {
    const maxIndice = Math.max(0, this.items.length - 1);
    const indiceActual = Math.round(this.targetIndex);

    if (this.prevButton) {
      this.prevButton.disabled = indiceActual <= 0;
      this.prevButton.setAttribute('aria-disabled', String(indiceActual <= 0));
    }
    if (this.nextButton) {
      this.nextButton.disabled = indiceActual >= maxIndice;
      this.nextButton.setAttribute('aria-disabled', String(indiceActual >= maxIndice));
    }
  }
}
