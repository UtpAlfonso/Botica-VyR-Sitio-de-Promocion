export type ProductCategory =
  | 'Todos'
  | 'Dermocosmética'
  | 'Vitaminas'
  | 'Botiquín'
  | 'Cuidado Natural';

export interface BoticaProduct {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'Todos'>;
  presentation: string;
  price: number;
  tag?: string;
  shortDesc: string;
  fullDesc: string;
  usage: string;
  image: string;
}

export interface BoticaService {
  number: string;
  title: string;
  summary: string;
  detail: string;
  metric: string;
}

export interface Testimonial {
  id: string;
  name: string;
  context: string;
  quote: string;
  outcome: string;
}

export const BOTICA_ASSETS = {
  logo: '/src/assets/images/botica_vyr_logo_1795216724683.jpg',
  hero: '/src/assets/images/hero_botica_interior_1795216724462.jpg',
  dermo: '/src/assets/images/prod_dermocosmetica_1795216724318.jpg',
  vitaminas: '/src/assets/images/prod_vitaminas_1795216724613.jpg',
  natural: '/src/assets/images/prod_botiquin_natural_1795216725001.jpg',
} as const;

export const CATEGORIES: ProductCategory[] = [
  'Todos',
  'Dermocosmética',
  'Vitaminas',
  'Botiquín',
  'Cuidado Natural',
];

export const PRODUCTS: BoticaProduct[] = [
  {
    id: 'serum-vit-c',
    name: 'Sérum Facial Antioxidante N.º 1',
    category: 'Dermocosmética',
    presentation: 'Frasco gotero 30 ml',
    price: 89.0,
    tag: 'Más solicitado',
    shortDesc: 'Vitamina C estabilizada al 15% con ácido hialurónico de bajo peso molecular.',
    fullDesc:
      'Fórmula dermatológica diseñada para iluminar el tono, proteger contra el estrés oxidativo urbano y restaurar la barrera hidratante sin sensación grasa.',
    usage: 'Aplicar 3 a 4 gotas sobre el rostro limpio cada mañana antes del fotoprotector.',
    image: BOTICA_ASSETS.dermo,
  },
  {
    id: 'crema-reparadora',
    name: 'Crema Hidratante Reparadora N.º 2',
    category: 'Dermocosmética',
    presentation: 'Pote clínico 50 ml',
    price: 74.5,
    shortDesc: 'Ceramidas esenciales y pantenol al 5% para piel sensible o reactiva.',
    fullDesc:
      'Emulsión calmante libre de fragancias que refuerza la barrera cutánea y alivia la tirantez desde la primera aplicación.',
    usage: 'Usar mañana y noche en rostro y cuello con suaves movimientos ascendentes.',
    image: BOTICA_ASSETS.dermo,
  },
  {
    id: 'vitalidad-diaria',
    name: 'Complejo Vitalidad Diaria B12 + Zinc',
    category: 'Vitaminas',
    presentation: 'Frasco ámbar 60 cápsulas',
    price: 68.0,
    tag: 'Stock disponible',
    shortDesc: 'Respaldo energético y refuerzo inmunológico con adaptógenos estandarizados.',
    fullDesc:
      'Combinación equilibrada de vitaminas del complejo B, vitamina D3, zinc quelado y extracto de ashwagandha para jornadas de alta exigencia.',
    usage: 'Tomar 1 cápsula al día junto con el desayuno.',
    image: BOTICA_ASSETS.vitaminas,
  },
  {
    id: 'descanso-sereno',
    name: 'Fórmula Descanso & Sueño Reparador',
    category: 'Vitaminas',
    presentation: 'Frasco ámbar 60 cápsulas',
    price: 64.0,
    shortDesc: 'Magnesio bisglicinato con extracto de valeriana y melatonina de liberación suave.',
    fullDesc:
      'Favorece la relajación muscular y ayuda a conciliar un descanso continuo sin pesadez matutina.',
    usage: 'Ingerir 1 cápsula 30 minutos antes de dormir con un vaso de agua.',
    image: BOTICA_ASSETS.vitaminas,
  },
  {
    id: 'elixir-herbal',
    name: 'Elixir Calmante de Eucalipto y Miel',
    category: 'Cuidado Natural',
    presentation: 'Botella vidrio 200 ml',
    price: 38.0,
    tag: 'Fórmula de temporada',
    shortDesc: 'Jarabe herbal con manzanilla, propóleo purificado y miel silvestre.',
    fullDesc:
      'Alivia la irritación de garganta y suaviza las vías respiratorias con extractos botánicos certificados.',
    usage: 'Adultos: 10 ml cada 8 horas. Agitar suavemente antes de servir.',
    image: BOTICA_ASSETS.natural,
  },
  {
    id: 'kit-botiquin',
    name: 'Botiquín Familiar Esencial VyR',
    category: 'Botiquín',
    presentation: 'Estuche lino + bálsamo 50 g',
    price: 96.0,
    shortDesc: 'Curación estéril, bálsamo de caléndula y solución antiséptica de viaje.',
    fullDesc:
      'Todo lo indispensable para primeros auxilios en casa o trayectos diarios: gasas estériles, termómetro digital, solución salina y bálsamo calmante.',
    usage: 'Conservar en lugar fresco y seco. Revisar fecha de esterilidad semestralmente.',
    image: BOTICA_ASSETS.natural,
  },
];

export const SERVICES: BoticaService[] = [
  {
    number: '01',
    title: 'Atención Farmacéutica Personalizada',
    summary:
      'Orientación directa de químicos farmacéuticos colegiados para validar dosis, interacciones y alternativas equivalentes.',
    detail: 'Consultas presenciales y asesoría inmediata por chat.',
    metric: '100% respaldo profesional',
  },
  {
    number: '02',
    title: 'Dermocosmética & Rutinas a Medida',
    summary:
      'Evaluación de tipo de piel y selección de activos dermatológicos seguros para hidratación, manchas o sensibilidad.',
    detail: 'Marcas dermatológicas con registro sanitario vigente.',
    metric: '+45 líneas especializadas',
  },
  {
    number: '03',
    title: 'Entrega Express a Domicilio',
    summary:
      'Despacho térmico protegido desde nuestra botica hasta tu puerta con seguimiento claro y pago contraentrega o digital.',
    detail: 'Envío sin costo adicional en pedidos desde S/ 80.00.',
    metric: '25 min promedio en zona',
  },
  {
    number: '04',
    title: 'Control Preventivo en Botica',
    summary:
      'Medición rápida de presión arterial, glucosa capilar y orientación para adherencia de tratamientos crónicos.',
    detail: 'Registro de control gratuito para pacientes frecuentes.',
    metric: 'Atención continua L–D',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Valeria Mendoza',
    context: 'Paciente frecuente · Miraflores',
    quote:
      'Antes debía recorrer tres locales buscando una crema dermatológica para mi hija y su jarabe. En Botica VyR confirmé stock por el chat en un minuto y llegó en menos de media hora.',
    outcome: 'Pedido recibido en 22 min con asesoría de uso incluida',
  },
  {
    id: 't2',
    name: 'Dr. Ricardo Salas',
    context: 'Médico Internista · Clínica Local',
    quote:
      'Recomiendo Botica VyR a mis pacientes adultos mayores porque respetan estrictamente la cadena de frío, explican cada posología con calma y llevan el control de sus recetas.',
    outcome: 'Cero errores de dispensación en tratamientos crónicos',
  },
];

export const STORE_INFO = {
  brand: 'Botica VyR',
  address: 'Av. Los Laureles 428, Urb. Jardines — Atención presencial y envíos',
  phone: '(01) 482-9140',
  hoursWeekday: 'Lunes a Sábado: 07:30 – 22:30',
  hoursSunday: 'Domingos y Feriados: 08:30 – 21:00',
  freeShippingMin: 80,
  payments: 'Yape, Plin, Visa, Mastercard y efectivo contraentrega',
};
