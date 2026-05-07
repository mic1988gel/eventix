import { useEffect, useState } from "react";
import { api } from "../utils/api";
import type { EventItem } from "../types";

export function useEvents(params?: Record<string, string>) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get<EventItem[]>("/events", { params }).then((res) => setEvents(res.data)).finally(() => setLoading(false));
  }, [JSON.stringify(params)]);

  return { events, loading };
}
