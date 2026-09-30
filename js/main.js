import { PRODUCTS, CATEGORIES } from './products-data.js';
import { ArcCarousel } from './arc-carousel.js';

const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{const isOpen=nav.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(isOpen))});
document.querySelectorAll('.nav a').forEach((link)=>link.addEventListener('click',()=>{nav.classList.remove('is-open');menuButton?.setAttribute('aria-expanded','false')}));
const header=document.querySelector('.site-header');
window.addEventListener('scroll',()=>header?.classList.toggle('is-scrolled',window.scrollY>90),{passive:true});
const heroCopy=document.querySelector('.hero__copy');
if(heroCopy){heroCopy.classList.remove('reveal');const heroElements=[[heroCopy.querySelector('h1'),'0ms'],[heroCopy.querySelector('.hero__lead'),'180ms'],[heroCopy.querySelector('.hero__actions'),'380ms']];heroElements.forEach(([element,delay])=>{if(!element)return;element.classList.add('reveal');element.style.setProperty('--reveal-delay',delay)});document.querySelector('.hero__media')?.classList.add('reveal--fade');document.querySelector('.hero__media')?.style.setProperty('--reveal-delay','240ms')}
const intro=document.querySelector('.intro');
if(intro){intro.querySelectorAll('.reveal').forEach((element)=>element.classList.remove('reveal'));intro.classList.add('reveal');intro.style.setProperty('--reveal-delay','560ms')}
document.querySelectorAll('.metrics__grid .metric,.solutions__grid .solution-card').forEach((element)=>element.classList.remove('reveal'));
document.querySelectorAll('.metrics__grid,.solutions__grid').forEach((element)=>element.classList.add('reveal'));
document.querySelectorAll('main section').forEach((section)=>{const reveals=[...section.querySelectorAll('.reveal')].filter((element)=>element.closest('section')===section);reveals.forEach((element,index)=>{if(!element.style.getPropertyValue('--reveal-delay'))element.style.setProperty('--reveal-delay',`${Math.min(index,3)*90}ms`)})});
const observer=new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach((element)=>observer.observe(element));
document.querySelectorAll('.solution-card__video').forEach((video)=>{const src=video.dataset.src;const loadVideo=()=>{if(!src||video.dataset.loaded)return;video.dataset.loaded='true';video.src=src;video.load();video.play().catch(()=>{})};if('IntersectionObserver' in window){const videoObserver=new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting){loadVideo();videoObserver.unobserve(entry.target)}})},{rootMargin:'240px 0px'});videoObserver.observe(video)}else{loadVideo()}});
const switchableVideo=document.querySelector('[data-video-switchable]');
const videoSequence=[{src:'assets/videos/cajas-en-movimiento.mp4',label:'Cajas de cartón en movimiento'},{src:'assets/videos/design.mp4',label:'Vídeo del departamento de diseño'},{src:'assets/videos/admi.mp4',label:'Vídeo del departamento de administración'}];
let videoSequenceIndex=0;
switchableVideo?.addEventListener('click',()=>{if(switchableVideo.dataset.switching)return;const featureImage=switchableVideo.closest('.feature__image');const source=switchableVideo.querySelector('source');if(!featureImage||!source)return;switchableVideo.dataset.switching='true';featureImage.classList.add('is-video-switching');window.setTimeout(()=>{videoSequenceIndex=(videoSequenceIndex+1)%videoSequence.length;const nextVideo=videoSequence[videoSequenceIndex];source.src=nextVideo.src;switchableVideo.setAttribute('aria-label',nextVideo.label);switchableVideo.load();switchableVideo.play().catch(()=>{});window.requestAnimationFrame(()=>featureImage.classList.remove('is-video-switching'));window.setTimeout(()=>{delete switchableVideo.dataset.switching},450)},450)});
const countObserver=new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(!entry.isIntersecting)return;const element=entry.target;const target=Number(element.dataset.count);const suffix=element.dataset.suffix||'';const duration=2500;const start=performance.now();const animate=(now)=>{const progress=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-progress,3);element.textContent=`${Math.round(target*eased)}${suffix}`;if(progress<1)requestAnimationFrame(animate)};requestAnimationFrame(animate);countObserver.unobserve(element)})},{threshold:.55});
document.querySelectorAll('[data-count]').forEach((element)=>countObserver.observe(element));
const accordionDetails=[...document.querySelectorAll('.accordion details')];
const accordionDuration=450;
const closeAccordion=(detail)=>{if(!detail.open)return;detail.classList.remove('is-opening');detail.classList.add('is-closing');window.setTimeout(()=>{detail.open=false;detail.classList.remove('is-closing')},accordionDuration)};
const openAccordion=(detail)=>{detail.open=true;detail.classList.add('is-opening');requestAnimationFrame(()=>requestAnimationFrame(()=>detail.classList.remove('is-opening')))};
accordionDetails.forEach((detail,index)=>{detail.open=index===0;detail.querySelector('summary')?.addEventListener('click',(event)=>{event.preventDefault();if(detail.open){closeAccordion(detail);return}accordionDetails.filter((other)=>other!==detail&&other.open).forEach(closeAccordion);window.setTimeout(()=>openAccordion(detail),accordionDuration)})});
const slider=document.querySelector('[data-team-slider]');const track=slider?.querySelector('.impact__track');const originalCards=track?[...track.children]:[];let sliderIndex=originalCards.length;let startX=0;let isPointerDown=false;
slider?.addEventListener('click',(event)=>{const image=event.target.closest('.impact-card img');if(!image)return;image.closest('.impact-card')?.classList.toggle('is-phone-visible')});
slider?.addEventListener('keydown',(event)=>{if(!['Enter',' '].includes(event.key))return;const image=event.target.closest('.impact-card img');if(!image)return;event.preventDefault();image.closest('.impact-card')?.classList.toggle('is-phone-visible')});
if(track&&originalCards.length){const before=originalCards.map((card)=>{const clone=card.cloneNode(true);clone.setAttribute('aria-hidden','true');return clone});const after=originalCards.map((card)=>{const clone=card.cloneNode(true);clone.setAttribute('aria-hidden','true');return clone});track.prepend(...before);track.append(...after)}
const updateSlider=(animate=true)=>{if(!slider||!track||!originalCards.length)return;const cardWidth=track.children[0].getBoundingClientRect().width;const gap=36;track.style.transition=animate?'transform .65s cubic-bezier(.22,.61,.36,1)':'none';track.style.transform=`translateX(${-sliderIndex*(cardWidth+gap)}px)`};
const normalizeLoop=()=>{if(!track||!originalCards.length)return;if(sliderIndex===0||sliderIndex===originalCards.length*2){sliderIndex=originalCards.length;updateSlider(false)}};
track?.addEventListener('transitionend',(event)=>{if(event.propertyName==='transform')normalizeLoop()});
const moveSlider=(direction,button)=>{sliderIndex+=direction;button?.classList.add('is-pressed');setTimeout(()=>button?.classList.remove('is-pressed'),180);updateSlider()};
document.querySelector('[data-slider-next]')?.addEventListener('click',(event)=>moveSlider(1,event.currentTarget));
document.querySelector('[data-slider-previous]')?.addEventListener('click',(event)=>moveSlider(-1,event.currentTarget));
slider?.addEventListener('pointerdown',(event)=>{startX=event.clientX;isPointerDown=true;slider.setPointerCapture(event.pointerId)});
slider?.addEventListener('pointerup',(event)=>{if(!isPointerDown)return;const moved=event.clientX-startX;if(Math.abs(moved)>45)moveSlider(moved<0?1:-1);isPointerDown=false});
slider?.addEventListener('keydown',(event)=>{if(event.key==='ArrowRight')moveSlider(1);if(event.key==='ArrowLeft')moveSlider(-1)});
window.addEventListener('resize',()=>updateSlider(false));
updateSlider(false);
document.querySelector('.back-to-top')?.addEventListener('click',(event)=>{event.preventDefault();window.scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'','#inicio')});
const form=document.querySelector('.contact-form');const status=document.querySelector('.form-status');
form?.addEventListener('submit',async(event)=>{event.preventDefault();status.textContent='Enviando consulta…';const payload=Object.fromEntries(new FormData(form));try{const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok)throw new Error('request');form.reset();status.textContent='Gracias. Nos pondremos en contacto contigo pronto.'}catch{status.textContent='No se pudo enviar. Escríbenos a info@laauxiliar.es'}});
const legalToggle=document.querySelector('.footer-legal__toggle');const legalPanel=document.querySelector('.legal-panel');const legalCloseButtons=document.querySelectorAll('.legal-panel__close,.legal-panel__bottom-close');
const setLegalPanel=(isOpen)=>{if(!legalToggle||!legalPanel)return;legalToggle.setAttribute('aria-expanded',String(isOpen));legalPanel.setAttribute('aria-hidden',String(!isOpen));legalPanel.inert=!isOpen;if(isOpen)legalPanel.querySelector('.legal-panel__close')?.focus();else legalToggle.focus()};
legalToggle?.addEventListener('click',()=>setLegalPanel(true));legalCloseButtons.forEach((button)=>button.addEventListener('click',()=>setLegalPanel(false)));legalPanel?.addEventListener('pointerleave',()=>{if(!legalPanel.inert)setLegalPanel(false)});document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&!legalPanel?.inert)setLegalPanel(false)});

// ==========================================================================
// Carrusel en Arco Curvado - Sección 'Echa un vistazo'
// ==========================================================================
const trackElemento = document.getElementById('carouselTrack');
const filtrosContainer = document.getElementById('filterContainer');

if (trackElemento && filtrosContainer) {
  let carruselInstancia = null;
  let categoriaActiva = 'todos';

  const renderizarTarjetas = (lista) => {
    trackElemento.innerHTML = '';
    const fragmento = document.createDocumentFragment();

    lista.forEach((producto) => {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'carousel-card';
      tarjeta.setAttribute('data-id', producto.id);
      tarjeta.setAttribute('tabindex', '0');
      tarjeta.setAttribute('role', 'group');
      tarjeta.setAttribute('aria-roledescription', 'slide');
      tarjeta.setAttribute('aria-label', producto.title);

      const rutaImagen = `assets/catalogo/${encodeURIComponent(producto.image)}`;

      tarjeta.innerHTML = `
        <div class="card-media-wrapper">
          <img src="${rutaImagen}" alt="${producto.title}" loading="lazy" />
        </div>
        <div class="card-body">
          <span class="card-category">${producto.category}</span>
          <h3 class="card-title">${producto.title}</h3>
          <p class="card-desc">${producto.description}</p>
          <div class="card-footer">
            <a href="catalogo/#${encodeURIComponent(producto.id)}" class="card-link">
              <span>Ver en catálogo</span>
              <span class="arrow-icon" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      `;

      fragmento.appendChild(tarjeta);
    });

    trackElemento.appendChild(fragmento);

    const tarjetas = trackElemento.querySelectorAll('.carousel-card');
    const indiceInicial = tarjetas.length > 2 ? 2 : 0;

    if (!carruselInstancia) {
      carruselInstancia = new ArcCarousel({
        containerSelector: '#carouselContainer',
        trackSelector: '#carouselTrack',
        prevButtonSelector: '#btnPrev',
        nextButtonSelector: '#btnNext'
      });
    }

    carruselInstancia.setItems(tarjetas, indiceInicial);
  };

  const renderizarFiltros = () => {
    filtrosContainer.innerHTML = '';

    CATEGORIES.forEach((cat) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = `filter-pill ${cat.id === categoriaActiva ? 'is-active' : ''}`;
      boton.textContent = cat.label;
      boton.setAttribute('data-category', cat.id);

      boton.addEventListener('click', () => {
        if (categoriaActiva === cat.id) return;
        categoriaActiva = cat.id;

        filtrosContainer.querySelectorAll('.filter-pill').forEach((pill) => {
          pill.classList.toggle('is-active', pill.getAttribute('data-category') === cat.id);
        });

        const productosFiltrados =
          cat.id === 'todos'
            ? PRODUCTS
            : PRODUCTS.filter((prod) => prod.category === cat.id);

        renderizarTarjetas(productosFiltrados);
      });

      filtrosContainer.appendChild(boton);
    });
  };

  renderizarFiltros();
  renderizarTarjetas(PRODUCTS);
}

