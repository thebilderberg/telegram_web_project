import { useEffect } from "react";

export function useTelegram() {
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (!tg) return;

    tg.ready();   // сообщаем Телеге, что WebApp загружен
    tg.expand();  // разворачиваем на всю высоту

    const handleResize = () => tg.expand();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [tg]);

  return tg;
}
