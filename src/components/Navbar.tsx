import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavbarProps {
  onOpenChat: () => void;
}

export function BoticaMark({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14.5" stroke="#0E6245" strokeWidth="1.5" />
      <path
        d="M16 7.5V24.5M9.5 16H22.5"
        stroke="#0E6245"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 15.5C16 11.5 19.2 8.8 22.8 9.2C22.4 12.8 19.6 15.5 16 15.5Z"
        fill="#0E6245"
        fillOpacity="0.18"
        stroke="#0E6245"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar({ onOpenChat }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#catalogo', label: 'Catálogo' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#ubicacion', label: 'Ubicación' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7F9F7]/90 backdrop-blur-md border-b border-emerald-950/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 text-[#0C231B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E6245] rounded-sm"
        >
          <BoticaMark className="w-6 h-6 shrink-0" />
          <span className="font-display text-xl font-semibold tracking-tight">
            Botica VyR
          </span>
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3E524A]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-[#0C231B] transition-colors duration-200 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1.5px] after:bg-[#0E6245] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenChat}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#0E6245] hover:bg-[#0A4E37] rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6245]"
          >
            Consultar en línea
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#0C231B] hover:bg-[#EDF2EE] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#F7F9F7] border-b border-emerald-950/10 px-5 py-4 space-y-3"
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-base font-medium text-[#0C231B] hover:text-[#0E6245] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenChat();
              }}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#0E6245] hover:bg-[#0A4E37] rounded-lg transition-colors cursor-pointer"
            >
              Consultar en línea
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
