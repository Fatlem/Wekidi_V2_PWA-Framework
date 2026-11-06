/**
 * Mematikan zoom (pinch & double-tap) di perangkat sentuh.
 *
 * Lapisan perlindungan:
 *  1. <meta viewport maximum-scale=1, user-scalable=no>  → Android/Chrome & sebagian besar browser.
 *  2. CSS `touch-action: pan-x pan-y` (global.css)       → Chrome/Android, Safari modern.
 *  3. Handler di bawah                                   → iOS Safari, yang mengabaikan meta viewport.
 *
 * Zoom di desktop (Ctrl + scroll / Ctrl +/-) sengaja TIDAK diblokir.
 */
export function disableZoom(): void {
  const prevent = (e: Event): void => e.preventDefault();

  // Pinch di iOS Safari
  document.addEventListener("gesturestart", prevent, { passive: false });
  document.addEventListener("gesturechange", prevent, { passive: false });
  document.addEventListener("gestureend", prevent, { passive: false });

  // Pinch dengan 2+ jari
  document.addEventListener(
    "touchmove",
    (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    },
    { passive: false },
  );

  // Double-tap zoom (kecuali pada elemen interaktif supaya klik cepat tetap jalan)
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    (e: TouchEvent) => {
      const now = Date.now();
      const target = e.target as Element | null;
      const interactive = target?.closest?.("a,button,input,select,textarea,label,summary");
      if (!interactive && now - lastTouchEnd <= 300) e.preventDefault();
      lastTouchEnd = now;
    },
    { passive: false },
  );
}
