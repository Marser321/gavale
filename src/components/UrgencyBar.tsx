import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Sparkle, X } from 'lucide-react';
import './UrgencyBar.css';

export default function UrgencyBar() {
  const [dismissed, setDismissed] = useState(false);

  // Rolling 24h countdown — resets at midnight UTC
  const getTimeLeft = useCallback(() => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setUTCHours(23, 59, 59, 999);
    const diff = endOfDay.getTime() - now.getTime();
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    return { h, m, s };
  }, []);

  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [getTimeLeft]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          className="urgency-bar"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="urgency-bar__inner">
            <div className="urgency-bar__marquee">
              <span className="urgency-bar__icon flex items-center justify-center h-full"><Truck className="w-4 h-4" /></span>
              <span className="urgency-bar__text">
                <strong>ENVÍO GRATIS</strong> en pedidos sobre $100 — Termina en{' '}
                <span className="urgency-bar__timer">
                  {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
                </span>
              </span>
              <span className="urgency-bar__divider inline-flex items-center"><Sparkle className="w-3 h-3" /></span>
              <span className="urgency-bar__text">
                <strong>Nuevo Lanzamiento:</strong> El Cross Mini Jumpsuit ya está aquí →
              </span>
            </div>
            <button
              className="urgency-bar__close flex items-center justify-center p-1"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
