import { X, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BoticaProduct } from '../data/boticaData';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: BoticaProduct | null;
  onClose: () => void;
  onAddToCart: (product: BoticaProduct) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0C231B]/50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-2xl border border-emerald-950/10 overflow-hidden grid grid-cols-1 md:grid-cols-2"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar detalle"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 text-[#0C231B] border border-emerald-950/10 flex items-center justify-center hover:bg-[#EDF2EE] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/3] md:aspect-auto bg-[#EDF2EE] overflow-hidden">
              <ResilientImage
                src={product.image}
                alt={product.name}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#4A5D55]">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.presentation}</span>
                </div>

                <h3
                  id="modal-product-title"
                  className="mt-2 font-display text-2xl font-semibold text-[#0C231B] leading-snug"
                >
                  {product.name}
                </h3>

                <p className="mt-3 text-xl font-semibold text-[#0E6245] tabular-nums">
                  S/ {product.price.toFixed(2)}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#3E524A]">
                  {product.fullDesc}
                </p>

                <div className="mt-5 pt-4 border-t border-emerald-950/10">
                  <p className="text-xs font-semibold text-[#0C231B]">Modo de uso recomendado</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#4A5D55]">{product.usage}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-[#0E6245] hover:bg-[#0A4E37] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  Agregar al pedido
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
