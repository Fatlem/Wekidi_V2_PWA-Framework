import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Pindah halaman → mulai dari paling atas (perilaku seperti situs multi-halaman asli). */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
