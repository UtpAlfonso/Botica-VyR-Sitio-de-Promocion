import { X, Minus, Plus, Trash2, ShoppingBag, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BoticaProduct, STORE_INFO } from '../data/boticaData';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: BoticaProduct;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onSendOrderToChat: (summaryText: string) => void;
}

export function OrderDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onSendOrderToChat,
}: OrderDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingRemaining = Math.max(0, STORE_INFO.freeShippingMin - subtotal);
  const progressPct = Math.min(100, (subtotal / STORE_INFO.freeShippingMin) * 100);

  const handleCheckoutViaChat = () => {
    const lines = items
      .map(
        (item) =>
          `${item.quantity}x ${item.product.name} (S/ ${(item.product.price * item.quantity).toFixed(2)})`
      )
      .join(', ');
    const summary = `Quiero confirmar mi pedido #VYR: ${lines}. Subtotal: S/ ${subtotal.toFixed(2)}.`;
    onSendOrderToChat(summary);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Resumen de pedido"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0C231B]/45 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#F7F9F7] h-full flex flex-col border-l border-emerald-950/10"
          >
            <div className="px-6 py-5 bg-white border-b border-emerald-950/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#0E6245]" />
                <h2 className="font-display text-xl font-semibold text-[#0C231B]">
                  Tu pedido
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar pedido"
                className="w-9 h-9 rounded-lg text-[#3E524A] hover:bg-[#EDF2EE] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping indicator */}
            <div className="px-6 py-3.5 bg-[#EDF2EE] border-b border-emerald-950/10">
              <p className="text-xs font-medium text-[#0C231B] tabular-nums">
                {freeShippingRemaining > 0
                  ? `Te faltan S/ ${freeShippingRemaining.toFixed(2)} para obtener delivery express gratis.`
                  : 'Tu pedido califica para delivery express sin costo.'}
              </p>
              <div className="mt-2 h-1.5 w-full bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0E6245] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBag className="w-10 h-10 text-[#4A5D55]/50 mb-3" strokeWidth={1.5} />
                  <p className="font-display text-lg font-medium text-[#0C231B]">
                    Aún no agregas productos
                  </p>
                  <p className="mt-1 text-sm text-[#4A5D55] max-w-xs">
                    Explora nuestra selección de dermocosmética, vitaminas o botiquín para armar tu pedido.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3.5 bg-white rounded-xl border border-emerald-950/10"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#EDF2EE] shrink-0">
                      <ResilientImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-[#0C231B] truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-[#4A5D55]">{item.product.presentation}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(item.product.id)}
                          aria-label={`Eliminar ${item.product.name}`}
                          className="text-[#4A5D55] hover:text-red-700 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-emerald-950/15 rounded-lg bg-[#F7F9F7]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, -1)}
                            aria-label="Disminuir cantidad"
                            className="w-7 h-7 flex items-center justify-center text-[#0C231B] hover:bg-[#EDF2EE] rounded-l-lg transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.product.id, 1)}
                            aria-label="Aumentar cantidad"
                            className="w-7 h-7 flex items-center justify-center text-[#0C231B] hover:bg-[#EDF2EE] rounded-r-lg transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#0C231B] tabular-nums">
                          S/ {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer totals */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-emerald-950/10 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#4A5D55]">
                    <span>Envío estimado</span>
                    <span className="tabular-nums font-medium text-[#0C231B]">
                      {freeShippingRemaining > 0 ? 'S/ 6.00' : 'Gratis'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#0C231B]">
                    <span>Total estimado</span>
                    <span className="tabular-nums">
                      S/ {(subtotal + (freeShippingRemaining > 0 ? 6 : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckoutViaChat}
                  className="w-full py-3 px-5 bg-[#0E6245] hover:bg-[#0A4E37] text-white text-sm font-medium rounded-lg inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Enviar pedido al chat de Botica
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
