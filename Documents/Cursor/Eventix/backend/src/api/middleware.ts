import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      telegramUserId?: number;
    }
  }
}

function parseInitData(initData: string) {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  return { hash, dataCheckString, params };
}

export function validateTelegramInitData(req: Request, res: Response, next: NextFunction) {
  const initData = req.header("x-telegram-init-data") || req.query.initData;
  const botToken = process.env.BOT_TOKEN;

  if (!initData || typeof initData !== "string") {
    return res.status(401).json({ error: "Missing Telegram initData" });
  }
  if (!botToken) {
    return res.status(500).json({ error: "BOT_TOKEN is required" });
  }

  const { hash, dataCheckString, params } = parseInitData(initData);
  if (!hash) return res.status(401).json({ error: "Invalid initData hash" });

  const secret = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
  const calculatedHash = crypto.createHmac("sha256", secret).update(dataCheckString).digest("hex");

  if (calculatedHash !== hash) {
    return res.status(401).json({ error: "Invalid Telegram signature" });
  }

  const userRaw = params.get("user");
  if (!userRaw) return res.status(401).json({ error: "Missing user object" });

  const user = JSON.parse(userRaw) as { id: number };
  req.telegramUserId = user.id;
  next();
}
