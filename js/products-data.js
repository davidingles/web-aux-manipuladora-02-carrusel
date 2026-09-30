/**
 * Datos centralizados del catálogo de productos
 * Utilizados tanto en la página principal (carrusel) como en la página de catálogo
 */

export const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'Estuches', label: 'Estuches' },
  { id: 'Cajas', label: 'Cajas' },
  { id: 'Expositores', label: 'Expositores' }
];

export const PRODUCTS = [
  {
    id: '1P0221',
    title: 'Bandeja con cotas',
    category: 'Estuches',
    image: '1P0221.png',
    model: '1P0221.glb',
    video: '1P0221.webm',
    description: 'Bandeja automontable acotada, versátil para transportar y presentar productos.'
  },
  {
    id: 'v4G02870001',
    title: 'Estuche para cazoletas',
    category: 'Estuches',
    image: 'RenderEstucheCazoletas.png',
    model: 'RenderEstucheCazoletas.glb',
    video: 'RenderEstucheCazoletas.webm',
    description: 'Estuche de acabado cuidado para retail y marcas que valoran cada detalle.'
  },
  {
    id: 'troquel1g0011',
    title: 'Estuche con perforado',
    category: 'Estuches',
    image: 'troquel1g0011.png',
    model: 'troquel1g0011.glb',
    video: 'troquel1g0011.webm',
    description: 'Estuche remontable con tapa y perforado para unir piezas y crear composiciones.'
  },
  {
    id: 'troquel1g0198',
    title: 'Estuche modular',
    category: 'Estuches',
    image: 'img1G0198.png',
    model: 'img1G0198.gltf',
    description: 'Formato troquelado diseñado para una fabricación precisa y un montaje ágil.'
  },
  {
    id: 'troquel1g0102',
    title: 'Estuche kraft',
    category: 'Estuches',
    image: 'troquel1g0102.png',
    model: 'Troquel1G0102.gltf',
    description: 'Solución de cartón con un acabado cálido y presencia natural.'
  },
  {
    id: '1L0024',
    title: 'Estuche BASTBM01',
    category: 'Estuches',
    image: 'troquel1L0024.png',
    model: 'troquel1L0024.glb',
    video: 'troquel1L0024.webm',
    description: 'Envase diseñado para aportar protección y facilidad de manipulación.'
  },
  {
    id: 'troquel1P0572',
    title: 'Estuche sostenible',
    category: 'Estuches',
    image: '1P0572.png',
    model: '1P0572.gltf',
    description: 'Una alternativa reciclable creada para resolver necesidades de packaging a medida.'
  },
  {
    id: 'troquelComedero',
    title: 'Estuche comedero',
    category: 'Estuches',
    image: 'troquelComedero.png',
    description: 'Diseño funcional para productos con geometrías específicas.'
  },
  {
    id: 'troquelMando',
    title: 'Estuche para mando',
    category: 'Estuches',
    image: 'troquelMando.png',
    model: 'TroquelMando.gltf',
    description: 'Formato compacto de protección y presentación para componentes delicados.'
  },
  {
    id: 'troquelMaleta',
    title: 'Estuche maleta',
    category: 'Estuches',
    image: 'troquelMaleta.png',
    description: 'Estuche resistente con formato de transporte cómodo y seguro.'
  },
  {
    id: 'troquelCajaB1',
    title: 'Estuche de alta resistencia',
    category: 'Estuches',
    image: 'troquelCajaB1.png',
    description: 'Solución reforzada para proteger el contenido en logística y distribución.'
  },
  {
    id: 'troquel4e0066',
    title: 'Estuche reciclable',
    category: 'Estuches',
    image: 'Render4e0066-BIS.png',
    model: 'Render4e0066-BIS.gltf',
    video: 'Render4e0066-BIS.webm',
    description: 'Envase funcional creado con cartón reciclable para proyectos sostenibles.'
  },
  {
    id: 'jamonero',
    title: 'Packaging gourmet',
    category: 'Estuches',
    image: 'JamoneroSinImpresion.png',
    model: 'JamoneroSinImpresion.glb',
    video: 'JamoneroSinImpresion.webm',
    description: 'Estuche premium preparado para productos de alimentación y regalo.'
  },
  {
    id: 'cajaB1',
    title: 'Caja de cartón ondulado',
    category: 'Cajas',
    image: 'cajaB1.png',
    model: 'cajaB1.glb',
    video: 'cajaB1.webm',
    description: 'Caja resistente, ligera y reciclable para envíos, almacenaje y distribución.'
  },
  {
    id: 'troquel1p0391',
    title: 'Caja para botes',
    category: 'Cajas',
    image: 'troquel1p0391.png',
    model: 'troquel1p0391.glb',
    video: 'troquel1p0391.webm',
    description: 'Caja a medida con estructura preparada para proteger productos envasados.'
  },
  {
    id: 'embargos',
    title: 'Bandeja expositora',
    category: 'Expositores',
    image: 'render_embargos.png',
    description: 'Bandeja de presentación que combina protección y visibilidad de producto.'
  },
  {
    id: 'ExpositorDM',
    title: 'PLV y expositores',
    category: 'Expositores',
    image: '3D EXPOSITOR DM.png',
    model: '3D EXPOSITOR DM.gltf',
    description: 'Expositor de cartón para punto de venta con una presencia profesional.'
  },
  {
    id: 'troquelMesaFeria',
    title: 'Mesa para feria',
    category: 'Expositores',
    image: 'troquelMesaFeria.png',
    description: 'Estructura expositiva diseñada para ferias, promociones y eventos.'
  },
  {
    id: 'troquelMuebleMadera',
    title: 'Mueble expositor',
    category: 'Expositores',
    image: 'troquelMuebleMadera.png',
    model: 'troquelMuebleMadera.gltf',
    description: 'Expositor modular para organizar y destacar productos en tienda.'
  },
  {
    id: 'troquelCaballete',
    title: 'Caballete expositor',
    category: 'Expositores',
    image: 'troquelCaballete.png',
    model: 'troquelCaballete.glb',
    video: 'troquelCaballete.webm',
    description: 'Soporte ligero para comunicación visual, información o promociones.'
  },
  {
    id: 'arbol',
    title: 'Expositor decorativo',
    category: 'Expositores',
    image: 'RenderArbol.png',
    model: 'RenderArbol.gltf',
    video: 'RenderArbol.webm',
    description: 'Pieza creativa que une decoración, exposición y sostenibilidad.'
  },
  {
    id: 'dianaTiro',
    title: 'Diana de tiro',
    category: 'Expositores',
    image: 'AMI UNO2.png',
    model: 'AMI UNO2.glb',
    description: 'Expositor lúdico y funcional ideado para activaciones de marca.'
  },
  {
    id: 'donaciones',
    title: 'Expositor solidario',
    category: 'Expositores',
    image: 'donaciones.png',
    model: 'donaciones.glb',
    description: 'Contenedor expositivo para campañas, recogidas y acciones especiales.'
  }
];
