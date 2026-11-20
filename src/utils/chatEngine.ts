export interface ChatReply {
  text: string;
  quickReplies: string[];
}

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function procesarMensajeBotica(rawInput: string): ChatReply {
  const msg = normalizeText(rawInput);

  if (!msg) {
    return {
      text: '¡Hola! Soy el asistente de Botica VyR. ¿En qué podemos ayudarte hoy?',
      quickReplies: ['Ver promociones', 'Horario y ubicación', 'Delivery a domicilio', 'Recomendar vitaminas'],
    };
  }

  // Order confirmation forwarded from CartDrawer
  if (msg.includes('pedido #vyr') || msg.includes('quiero confirmar mi pedido')) {
    const orderCode = `VYR-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      text: `Hemos registrado tu solicitud con código ${orderCode}. Nuestro equipo farmacéutico está verificando el empaque térmico. Indica tu distrito o dirección y tu método de pago (Yape, Plin, tarjeta o efectivo) para enviarlo en aproximadamente 25 minutos.`,
      quickReplies: ['Pagar con Yape / Plin', 'Pagar contraentrega', 'Consultar tiempo de envío'],
    };
  }

  // Greetings
  if (/^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|que tal)\b/.test(msg)) {
    return {
      text: '¡Bienvenido a Botica VyR! Estoy aquí para resolver dudas sobre medicamentos, dermocosmética, vitaminas o envíos a domicilio. ¿Qué estás buscando?',
      quickReplies: ['Ver promociones', 'Horario y ubicación', 'Delivery a domicilio', 'Consultar receta'],
    };
  }

  // Promotions / Discounts
  if (msg.includes('promocion') || msg.includes('descuento') || msg.includes('oferta') || msg.includes('combo')) {
    return {
      text: 'Esta semana en Botica VyR tenemos:\n• 15% de descuento llevando el dúo Sérum N.º 1 + Crema Reparadora N.º 2.\n• Delivery gratuito en pedidos desde S/ 80.00.\n• Toma de presión arterial sin costo en tienda.',
      quickReplies: ['Ver catálogo de vitaminas', 'Delivery a domicilio', 'Horario y ubicación'],
    };
  }

  // Hours & Location
  if (
    msg.includes('horario') ||
    msg.includes('hora') ||
    msg.includes('abierto') ||
    msg.includes('cierran') ||
    msg.includes('ubicacion') ||
    msg.includes('direccion') ||
    msg.includes('donde quedan') ||
    msg.includes('llegar')
  ) {
    return {
      text: 'Nos encontramos en Av. Los Laureles 428, Urb. Jardines.\n• Lunes a Sábado: 07:30 a 22:30\n• Domingos y feriados: 08:30 a 21:00\nTambién realizamos entregas express durante todo el horario de atención.',
      quickReplies: ['Delivery a domicilio', 'Métodos de pago', 'Ver promociones'],
    };
  }

  // Delivery / Shipping
  if (
    msg.includes('delivery') ||
    msg.includes('envio') ||
    msg.includes('domicilio') ||
    msg.includes('demora') ||
    msg.includes('llega') ||
    msg.includes('gratis')
  ) {
    return {
      text: 'Nuestro Delivery Express entrega en un promedio de 25 minutos con empaque térmico seguro. El envío es gratuito en compras desde S/ 80.00 (tarifa plana de S/ 6.00 para montos menores).',
      quickReplies: ['Métodos de pago', 'Ver promociones', 'Recomendar vitaminas'],
    };
  }

  // Payment methods
  if (
    msg.includes('pago') ||
    msg.includes('yape') ||
    msg.includes('plin') ||
    msg.includes('tarjeta') ||
    msg.includes('efectivo') ||
    msg.includes('contraentrega')
  ) {
    return {
      text: 'Aceptamos Yape, Plin, tarjetas Visa/Mastercard (en tienda o con POS inalámbrico en delivery) y efectivo contraentrega. Emitimos boleta o factura electrónica al instante.',
      quickReplies: ['Delivery a domicilio', 'Horario y ubicación', 'Ver promociones'],
    };
  }

  // Dermocosmetics / Skincare
  if (
    msg.includes('piel') ||
    msg.includes('serum') ||
    msg.includes('crema') ||
    msg.includes('dermo') ||
    msg.includes('rostro') ||
    msg.includes('cara') ||
    msg.includes('solar') ||
    msg.includes('mancha')
  ) {
    return {
      text: 'En nuestra línea de Dermocosmética destacamos el Sérum Facial Antioxidante N.º 1 (S/ 89.00) y la Crema Hidratante Reparadora N.º 2 con ceramidas (S/ 74.50). Ambos son aptos para piel sensible y cuentan con asesoría dermatológica.',
      quickReplies: ['Ver promociones', 'Delivery a domicilio', 'Consultar receta'],
    };
  }

  // Vitamins & Sleep & Energy
  if (
    msg.includes('vitamina') ||
    msg.includes('energia') ||
    msg.includes('cansancio') ||
    msg.includes('defensa') ||
    msg.includes('inmune') ||
    msg.includes('sueno') ||
    msg.includes('dormir') ||
    msg.includes('estres') ||
    msg.includes('magnesio')
  ) {
    return {
      text: 'Para vitalidad diaria contamos con el Complejo Vitalidad B12 + Zinc (S/ 68.00). Si buscas mejorar el descanso nocturno, recomendamos la Fórmula Descanso & Sueño Reparador con magnesio bisglicinato (S/ 64.00).',
      quickReplies: ['Ver promociones', 'Métodos de pago', 'Delivery a domicilio'],
    };
  }

  // Natural / Throat / First aid
  if (
    msg.includes('jarabe') ||
    msg.includes('tos') ||
    msg.includes('garganta') ||
    msg.includes('natural') ||
    msg.includes('botiquin') ||
    msg.includes('herida') ||
    msg.includes('eucalipto') ||
    msg.includes('miel')
  ) {
    return {
      text: 'Para aliviar la garganta tenemos el Elixir Calmante de Eucalipto y Miel con propóleo (S/ 38.00). Para el hogar te ofrecemos el Botiquín Familiar Esencial VyR (S/ 96.00) con bálsamo de caléndula y material estéril.',
      quickReplies: ['Delivery a domicilio', 'Horario y ubicación', 'Ver promociones'],
    };
  }

  // Prescription / Pharmacist consultation
  if (
    msg.includes('receta') ||
    msg.includes('medico') ||
    msg.includes('farmaceutico') ||
    msg.includes('quimico') ||
    msg.includes('presion') ||
    msg.includes('glucosa') ||
    msg.includes('consulta') ||
    msg.includes('dosis')
  ) {
    return {
      text: 'Contamos con químicos farmacéuticos colegiados en turno continuo. Puedes traer tu receta física o enviarnos el nombre del principio activo por el formulario de consulta para confirmar disponibilidad y orientación posológica.',
      quickReplies: ['Horario y ubicación', 'Delivery a domicilio', 'Métodos de pago'],
    };
  }

  // Prices / Catalog general
  if (msg.includes('precio') || msg.includes('cuesta') || msg.includes('catalogo') || msg.includes('producto')) {
    return {
      text: 'Nuestros productos principales van desde S/ 38.00 (Elixir Herbal) hasta S/ 96.00 (Botiquín Familiar Esencial). Puedes explorar todo el catálogo arriba, filtrar por categoría y armar tu pedido con un clic.',
      quickReplies: ['Ver promociones', 'Recomendar vitaminas', 'Delivery a domicilio'],
    };
  }

  // Gratitude / Goodbye
  if (msg.includes('gracias') || msg.includes('perfecto') || msg.includes('listo') || msg.includes('chau') || msg.includes('adios')) {
    return {
      text: '¡Con gusto! En Botica VyR cuidamos tu bienestar todos los días. Si necesitas algo más, escríbenos en cualquier momento.',
      quickReplies: ['Horario y ubicación', 'Ver promociones'],
    };
  }

  // Default helpful fallback
  return {
    text: 'Entiendo. Para darte una respuesta precisa en Botica VyR, ¿te gustaría consultar sobre nuestros productos (dermocosmética, vitaminas, botiquín), horarios de tienda o servicio de delivery express?',
    quickReplies: ['Recomendar vitaminas', 'Horario y ubicación', 'Delivery a domicilio', 'Ver promociones'],
  };
}
