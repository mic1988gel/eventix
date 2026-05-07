import type { EventItem } from "../../types";
import { EventMarker } from "./EventMarker";

export function EventMap({ events }: { events: EventItem[] }) {
  return (
    <section style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
      <h3>Карта (MVP заглушка)</h3>
      <p>Интеграция с map SDK и кластеризацией добавляется следующим шагом.</p>
      <div style={{ display: "grid", gap: 8 }}>
        {events.filter((e) => e.latitude && e.longitude).slice(0, 10).map((event) => (
          <EventMarker key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
