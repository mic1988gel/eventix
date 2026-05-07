import { useMemo } from "react";

type TgWebApp = {
  initData?: string;
  initDataUnsafe?: { user?: { id: number; first_name?: string } };
  MainButton?: { setText: (text: string) => void; show: () => void; hide: () => void };
  HapticFeedback?: { impactOccurred: (style: "light" | "medium" | "heavy") => void };
  ready?: () => void;
};

export function useTelegram() {
  const tg = useMemo(() => (window as Window & { Telegram?: { WebApp?: TgWebApp } }).Telegram?.WebApp, []);
  tg?.ready?.();
  return {
    tg,
    user: tg?.initDataUnsafe?.user
  };
}
