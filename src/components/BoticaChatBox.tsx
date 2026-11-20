import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { procesarMensajeBotica } from '../utils/chatEngine';
import { BoticaMark } from './Navbar';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  quickReplies?: string[];
}

interface BoticaChatBoxProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  externalPrompt: string | null;
  onConsumeExternalPrompt: () => void;
}

function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'bot',
  text: '¡Hola! Bienvenido a Botica VyR. Estoy conectado para ayudarte con stock de productos, recomendaciones, horarios o envíos a domicilio.',
  time: getCurrentTime(),
  quickReplies: [
    'Ver promociones',
    'Horario y ubicación',
    'Delivery a domicilio',
    'Recomendar vitaminas',
  ],
};

export function BoticaChatBox({
  isOpen,
  onToggle,
  externalPrompt,
  onConsumeExternalPrompt,
}: BoticaChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simple JS timer simulating natural response cadence
    window.setTimeout(() => {
      const reply = procesarMensajeBotica(trimmed);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply.text,
        time: getCurrentTime(),
        quickReplies: reply.quickReplies,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 380);
  };

  useEffect(() => {
    if (externalPrompt && isOpen) {
      sendMessage(externalPrompt);
      onConsumeExternalPrompt();
    }
  }, [externalPrompt, isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleReset = () => {
    setMessages([{ ...INITIAL_MESSAGE, time: getCurrentTime() }]);
    setIsTyping(false);
  };

  const latestQuickReplies =
    messages.length > 0 ? messages[messages.length - 1].quickReplies : undefined;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Chat de atención Botica VyR"
            className="mb-3 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] max-h-[75vh] bg-white rounded-2xl border border-emerald-950/15 shadow-xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="px-4 py-3.5 bg-[#0C231B] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <BoticaMark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold leading-tight">
                    Botica VyR
                  </h3>
                  <p className="text-xs text-emerald-100/80">
                    Asesoría farmacéutica en línea
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reiniciar conversación"
                  aria-label="Reiniciar conversación"
                  className="w-8 h-8 rounded-lg text-emerald-100/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onToggle(false)}
                  aria-label="Cerrar chat"
                  className="w-8 h-8 rounded-lg text-emerald-100/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7F9F7]"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[#0E6245] text-white rounded-br-sm'
                        : 'bg-white text-[#0C231B] border border-emerald-950/10 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-1 px-1 text-[11px] text-[#4A5D55] tabular-nums">
                    {msg.time}
                  </span>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-white border border-emerald-950/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E6245]/60 animate-bounce [animation-delay:-0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E6245]/60 animate-bounce [animation-delay:-0.1s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E6245]/60 animate-bounce" />
                  </div>
                </div>
              )}

              {/* Quick replies */}
              {!isTyping && latestQuickReplies && latestQuickReplies.length > 0 && (
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {latestQuickReplies.map((qr) => (
                    <button
                      key={qr}
                      type="button"
                      onClick={() => sendMessage(qr)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-emerald-950/15 text-[#0E6245] hover:bg-[#EDF2EE] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="p-3 bg-white border-t border-emerald-950/10 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta aquí..."
                aria-label="Escribe tu consulta para Botica VyR"
                className="flex-1 bg-[#F7F9F7] border border-emerald-950/15 rounded-lg px-3.5 py-2 text-sm text-[#0C231B] placeholder:text-[#4A5D55]/70 focus:outline-none focus:border-[#0E6245]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Enviar mensaje"
                className="w-10 h-10 rounded-lg bg-[#0E6245] hover:bg-[#0A4E37] disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onToggle(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Ocultar chat de Botica VyR' : 'Abrir chat de Botica VyR'}
        className="h-12 px-4 sm:px-5 rounded-full bg-[#0E6245] hover:bg-[#0A4E37] text-white shadow-lg flex items-center gap-2.5 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6245]"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4" />
            <span className="whitespace-nowrap">Cerrar chat</span>
          </>
        ) : (
          <>
            <MessageCircle className="w-4 h-4" />
            <span className="whitespace-nowrap">Chat Botica VyR</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
