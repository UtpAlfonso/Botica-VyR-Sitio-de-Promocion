import { useMemo, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  MessageSquare,
} from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import {
  BOTICA_ASSETS,
  CATEGORIES,
  PRODUCTS,
  SERVICES,
  STORE_INFO,
  TESTIMONIALS,
  type BoticaProduct,
  type ProductCategory,
} from './data/boticaData';
import { Navbar, BoticaMark } from './components/Navbar';
import { ResilientImage } from './components/ResilientImage';
import { OrderDrawer, type CartItem } from './components/OrderDrawer';
import { ProductModal } from './components/ProductModal';
import { BoticaChatBox } from './components/BoticaChatBox';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<BoticaProduct | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [externalChatPrompt, setExternalChatPrompt] = useState<string | null>(null);

  // Consultation form state
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCat =
        selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.shortDesc.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: BoticaProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === product.id ? null : curr));
    }, 1100);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleSendOrderToChat = (summaryText: string) => {
    setExternalChatPrompt(summaryText);
    setIsChatOpen(true);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim() || formName.trim().length < 2) {
      setFormError('Por favor ingresa tu nombre completo.');
      return;
    }

    const contactClean = formContact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactClean);
    const isPhone = /^[0-9+\-\s()]{7,15}$/.test(contactClean);

    if (!isEmail && !isPhone) {
      setFormError('Ingresa un teléfono o correo electrónico válido para responderte.');
      return;
    }

    if (!formMessage.trim() || formMessage.trim().length < 6) {
      setFormError('Cuéntanos brevemente qué medicamento o asesoría necesitas.');
      return;
    }

    setFormSubmitted(true);
    setFormName('');
    setFormContact('');
    setFormMessage('');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div id="inicio" className="min-h-screen flex flex-col bg-[#F7F9F7] text-[#0C231B]">
        <Navbar onOpenChat={() => setIsChatOpen(true)} />

        <main className="flex-1">
          {/* SECTION 1: HERO SPLIT */}
          <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-8 pb-14 sm:pt-12 sm:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-8"
              >
                <p className="text-xs sm:text-sm font-medium text-[#0E6245] tracking-normal">
                  Botica VyR · Atención Farmacéutica y Bienestar
                </p>

                <h1
                  className="mt-4 font-display font-semibold text-[#0C231B] tracking-tight leading-[1.08]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                    textWrap: 'balance',
                  }}
                >
                  Cuidado clínico cercano y fórmulas de confianza para tu hogar.
                </h1>

                <p className="mt-5 text-base sm:text-lg text-[#3E524A] leading-relaxed max-w-xl">
                  Combinamos dispensación farmacéutica certificada, dermocosmética especializada y
                  entrega térmica express en menos de media hora.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#catalogo"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E6245] hover:bg-[#0A4E37] text-white text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6245]"
                  >
                    Explorar catálogo
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsChatOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-[#EDF2EE] text-[#0C231B] border border-emerald-950/15 text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#0E6245]" />
                    Hablar con el asistente
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-emerald-950/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#4A5D55]">
                  <span>Químicos farmacéuticos colegiados</span>
                  <span aria-hidden="true">·</span>
                  <span>Envío gratis desde S/ 80.00</span>
                  <span aria-hidden="true">·</span>
                  <span>Pagos con Yape, Plin y tarjetas</span>
                </div>
              </motion.div>

              {/* Right Column: Hero Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT }}
                className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#EDF2EE] border border-emerald-950/10 min-h-[300px] sm:min-h-[420px]"
              >
                <ResilientImage
                  src={BOTICA_ASSETS.hero}
                  alt="Interior luminoso de Botica VyR con estantería de roble y atención farmacéutica"
                  fallbackTitle="Botica VyR — Espacio Apotecario"
                  className="w-full h-full lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C231B]/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs text-emerald-100/90">Sede Principal · Urb. Jardines</p>
                    <p className="font-display text-lg font-medium leading-snug">
                      Atención continua todos los días
                    </p>
                  </div>
                  <div className="hidden sm:block w-14 h-14 rounded-xl overflow-hidden border border-white/30 bg-white shrink-0 animate-float-slow">
                    <ResilientImage
                      src={BOTICA_ASSETS.logo}
                      alt="Emblema oficial Botica VyR"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Proof KPI Strip (4 columns full width below split) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-emerald-950/10"
            >
              <div>
                <p className="font-display text-2xl sm:text-3xl font-semibold text-[#0C231B] tabular-nums">
                  15+ años
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#4A5D55]">
                  Trayectoria farmacéutica familiar
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-semibold text-[#0C231B] tabular-nums">
                  25 min
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#4A5D55]">
                  Tiempo promedio de entrega express
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-semibold text-[#0C231B] tabular-nums">
                  100%
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#4A5D55]">
                  Lotes verificados y trazabilidad sanitaria
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-semibold text-[#0C231B] tabular-nums">
                  07:30 – 22:30
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#4A5D55]">
                  Horario extendido lunes a sábado
                </p>
              </div>
            </motion.div>
          </section>

          {/* SECTION 2: FEATURED COLLECTION & INTERACTIVE CATALOG */}
          <section
            id="catalogo"
            className="bg-white border-y border-emerald-950/10 py-16 sm:py-20"
          >
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-xs font-medium text-[#0E6245]">
                    Selección de Botica
                  </p>
                  <h2
                    className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#0C231B] tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Fórmulas esenciales y cuidado diario
                  </h2>
                </div>

                {/* Search & Order Bag */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 sm:flex-initial sm:w-64">
                    <Search className="w-4 h-4 text-[#4A5D55] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar producto..."
                      aria-label="Buscar en catálogo de Botica VyR"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-[#F7F9F7] border border-emerald-950/15 rounded-lg text-[#0C231B] placeholder:text-[#4A5D55]/75 focus:outline-none focus:border-[#0E6245]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0C231B] hover:bg-[#14352A] text-white text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Mi Pedido</span>
                    <span className="tabular-nums font-semibold">({totalCartItems})</span>
                  </button>
                </div>
              </div>

              {/* Interactive Filter Tabs */}
              <div
                role="tablist"
                aria-label="Categorías de productos"
                className="mt-8 inline-flex flex-wrap items-center gap-1 p-1 bg-[#EDF2EE] rounded-lg"
              >
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#0C231B] shadow-xs'
                          : 'text-[#3E524A] hover:text-[#0C231B]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="mt-10 py-14 text-center rounded-2xl bg-[#F7F9F7] border border-emerald-950/10">
                  <p className="font-display text-lg font-medium text-[#0C231B]">
                    No encontramos productos para esa búsqueda
                  </p>
                  <p className="mt-1 text-sm text-[#4A5D55]">
                    Prueba limpiar el filtro o pregúntanos directamente en el chat por stock disponible.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('Todos');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 text-sm font-medium text-[#0E6245] bg-white border border-emerald-950/15 rounded-lg hover:bg-[#EDF2EE] transition-colors cursor-pointer"
                  >
                    Mostrar todo el catálogo
                  </button>
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product, index) => {
                    const isJustAdded = recentlyAddedId === product.id;
                    return (
                      <motion.article
                        key={product.id}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.35,
                          delay: Math.min(index * 0.05, 0.25),
                          ease: EASE_OUT,
                        }}
                        className="group flex flex-col bg-[#F7F9F7] rounded-2xl border border-emerald-950/10 overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveProduct(product)}
                          className="aspect-[4/3] w-full bg-[#EDF2EE] overflow-hidden cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#0E6245]"
                        >
                          <ResilientImage
                            src={product.image}
                            alt={product.name}
                            fallbackTitle={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </button>

                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 text-xs text-[#4A5D55]">
                              <span>
                                {product.category} <span aria-hidden="true">·</span>{' '}
                                {product.presentation}
                              </span>
                              {product.tag && (
                                <span className="text-[#0E6245] font-medium whitespace-nowrap">
                                  {product.tag}
                                </span>
                              )}
                            </div>

                            <h3 className="mt-2 font-display text-lg font-semibold text-[#0C231B] leading-snug">
                              <button
                                type="button"
                                onClick={() => setActiveProduct(product)}
                                className="text-left hover:text-[#0E6245] transition-colors cursor-pointer"
                              >
                                {product.name}
                              </button>
                            </h3>

                            <p className="mt-2 text-sm text-[#3E524A] leading-relaxed line-clamp-2">
                              {product.shortDesc}
                            </p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-emerald-950/10 flex items-center justify-between gap-3">
                            <span className="text-base font-semibold text-[#0C231B] tabular-nums">
                              S/ {product.price.toFixed(2)}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setActiveProduct(product)}
                                className="px-3 py-2 text-xs font-medium text-[#3E524A] hover:text-[#0C231B] transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Detalles
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAddToCart(product)}
                                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                                  isJustAdded
                                    ? 'bg-[#0C231B] text-white'
                                    : 'bg-[#0E6245] hover:bg-[#0A4E37] text-white'
                                }`}
                              >
                                {isJustAdded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    Agregado
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    Agregar
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* SECTION 3: SERVICES, BRAND CREST & PROOF */}
          <section id="servicios" className="py-16 sm:py-24 max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Brand Emblem & Story Column */}
              <motion.div
                id="nosotros"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="lg:col-span-5 space-y-6"
              >
                <p className="text-xs font-medium text-[#0E6245]">
                  Identidad y Respaldo Clínico
                </p>
                <h2
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#0C231B] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Más que una farmacia: tu aliado diario en salud preventiva
                </h2>
                <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
                  En Botica VyR unimos la cercanía del boticario tradicional con protocolos clínicos
                  actuales. Cada recomendación se basa en evidencia, seguridad posológica y trato
                  humano.
                </p>

                <div className="p-6 bg-white rounded-2xl border border-emerald-950/10 flex items-center gap-5">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#F7F9F7] border border-emerald-950/10 shrink-0">
                    <ResilientImage
                      src={BOTICA_ASSETS.logo}
                      alt="Logotipo oficial de Botica VyR"
                      fallbackTitle="Logo VyR"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#0C231B]">
                      Sello Botica VyR
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#4A5D55] leading-relaxed">
                      Cadena de frío monitoreada, asesoría dermocosmética y despacho directo sin
                      intermediarios.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Services Asymmetric Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {SERVICES.map((service, idx) => (
                  <motion.div
                    key={service.number}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: idx * 0.06, ease: EASE_OUT }}
                    className="p-6 bg-white rounded-2xl border border-emerald-950/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#4A5D55]">
                        <span className="font-semibold text-[#0E6245] tabular-nums">
                          {service.number}.
                        </span>
                        <span className="tabular-nums">{service.metric}</span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-semibold text-[#0C231B] leading-snug">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-[#3E524A] leading-relaxed">
                        {service.summary}
                      </p>
                    </div>
                    <p className="mt-5 pt-4 border-t border-emerald-950/10 text-xs text-[#4A5D55]">
                      {service.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Adjacent Attributable Testimonials */}
            <div className="mt-14 pt-12 border-t border-emerald-950/10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((t) => (
                <motion.blockquote
                  key={t.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="p-6 sm:p-7 bg-[#EDF2EE] rounded-2xl flex flex-col justify-between"
                >
                  <p className="text-sm sm:text-base text-[#0C231B] leading-relaxed">
                    “{t.quote}”
                  </p>
                  <footer className="mt-5 pt-4 border-t border-emerald-950/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-semibold text-[#0C231B]">{t.name}</span>
                      <span className="mx-1.5 text-[#4A5D55]" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-[#4A5D55]">{t.context}</span>
                    </div>
                    <span className="text-[#0E6245] font-medium">{t.outcome}</span>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </section>

          {/* SECTION 4: LOCATION, HOURS & QUICK CONSULTATION FORM */}
          <section
            id="ubicacion"
            className="bg-[#0C231B] text-white py-16 sm:py-20"
          >
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Location & Hours */}
              <div className="lg:col-span-5 space-y-6">
                <p className="text-xs font-medium text-emerald-300">
                  Visítanos o solicita tu envío
                </p>
                <h2
                  className="font-display text-3xl sm:text-4xl font-semibold tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Siempre cerca cuando tu familia lo necesita
                </h2>
                <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
                  Acércate a nuestra botica para atención presencial y toma preventiva de presión, o
                  escríbenos para verificar recetas y coordinar envío inmediato.
                </p>

                <div className="space-y-4 pt-2 text-sm text-emerald-50/90">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-emerald-300 mt-1 shrink-0" />
                    <span>{STORE_INFO.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-emerald-300 mt-1 shrink-0" />
                    <div className="tabular-nums space-y-0.5">
                      <p>{STORE_INFO.hoursWeekday}</p>
                      <p className="text-emerald-100/75">{STORE_INFO.hoursSunday}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-emerald-300 mt-1 shrink-0" />
                    <span className="tabular-nums">
                      Central de pedidos: {STORE_INFO.phone} · {STORE_INFO.payments}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lead / Prescription Inquiry Form */}
              <div className="lg:col-span-7 bg-white text-[#0C231B] rounded-2xl p-6 sm:p-8">
                <h3 className="font-display text-2xl font-semibold">
                  Consulta de receta o reserva de productos
                </h3>
                <p className="mt-1.5 text-sm text-[#4A5D55]">
                  Déjanos tu consulta y un químico farmacéutico de Botica VyR te confirmará stock y
                  precio al instante.
                </p>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 rounded-xl bg-[#EDF2EE] border border-emerald-950/10"
                  >
                    <div className="flex items-center gap-2.5 text-[#0E6245] font-semibold">
                      <Check className="w-5 h-5" />
                      <span>Solicitud recibida en Botica VyR</span>
                    </div>
                    <p className="mt-2 text-sm text-[#3E524A]">
                      Gracias por escribirnos. Nuestro equipo farmacéutico revisará tu consulta y se
                      pondrá en contacto contigo en los próximos minutos.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-4 py-2 text-xs font-medium text-white bg-[#0E6245] hover:bg-[#0A4E37] rounded-lg transition-colors cursor-pointer"
                    >
                      Enviar otra consulta
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="consult-name"
                          className="block text-xs font-semibold text-[#0C231B] mb-1.5"
                        >
                          Nombre completo
                        </label>
                        <input
                          id="consult-name"
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Ej. Camila Paredes"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#F7F9F7] border border-emerald-950/15 rounded-lg focus:outline-none focus:border-[#0E6245]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="consult-contact"
                          className="block text-xs font-semibold text-[#0C231B] mb-1.5"
                        >
                          Teléfono o correo
                        </label>
                        <input
                          id="consult-contact"
                          type="text"
                          value={formContact}
                          onChange={(e) => setFormContact(e.target.value)}
                          placeholder="999 420 112 o correo@ejemplo.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#F7F9F7] border border-emerald-950/15 rounded-lg focus:outline-none focus:border-[#0E6245]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="consult-msg"
                        className="block text-xs font-semibold text-[#0C231B] mb-1.5"
                      >
                        Medicamento, fórmula o consulta
                      </label>
                      <textarea
                        id="consult-msg"
                        rows={3}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Indica el nombre del producto, concentración o consulta farmacéutica..."
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F7F9F7] border border-emerald-950/15 rounded-lg focus:outline-none focus:border-[#0E6245]"
                      />
                    </div>

                    {formError && (
                      <p role="alert" className="text-xs font-medium text-red-700">
                        {formError}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <span className="text-xs text-[#4A5D55]">
                        Respuesta rápida durante todo el horario de atención.
                      </span>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#0E6245] hover:bg-[#0A4E37] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Enviar consulta
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* QUIET FOOTER */}
        <footer className="bg-[#F7F9F7] border-t border-emerald-950/10 py-10">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <BoticaMark className="w-5 h-5 shrink-0" />
              <span className="font-display text-base font-semibold text-[#0C231B]">
                Botica VyR
              </span>
              <span className="text-xs text-[#4A5D55]">
                · © {new Date().getFullYear()} Todos los derechos reservados
              </span>
            </div>

            <nav className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#4A5D55]">
              <a href="#catalogo" className="hover:text-[#0C231B] transition-colors">
                Catálogo
              </a>
              <a href="#servicios" className="hover:text-[#0C231B] transition-colors">
                Servicios
              </a>
              <a href="#nosotros" className="hover:text-[#0C231B] transition-colors">
                Nosotros
              </a>
              <a href="#ubicacion" className="hover:text-[#0C231B] transition-colors">
                Ubicación
              </a>
            </nav>
          </div>
        </footer>

        {/* Interactive Drawers, Modals & JS Chatbox */}
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={handleAddToCart}
        />

        <OrderDrawer
          isOpen={isDrawerOpen}
          items={cart}
          onClose={() => setIsDrawerOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveItem}
          onSendOrderToChat={handleSendOrderToChat}
        />

        <BoticaChatBox
          isOpen={isChatOpen}
          onToggle={setIsChatOpen}
          externalPrompt={externalChatPrompt}
          onConsumeExternalPrompt={() => setExternalChatPrompt(null)}
        />
      </div>
    </MotionConfig>
  );
}
