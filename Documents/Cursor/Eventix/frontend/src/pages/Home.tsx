import { Link } from "react-router-dom";
import { EventList } from "../components/Events/EventList";
import { Header } from "../components/common/Header";
import { useEvents } from "../hooks/useApi";
import { useTelegram } from "../hooks/useTelegram";

export default function HomePage() {
  const { user } = useTelegram();
  const { events } = useEvents();

  return (
    <main>
      <Header title={`Привет, ${user?.first_name ?? "друг"}!`} />
      <h3>Ближайшие события</h3>
      <EventList events={events.slice(0, 3)} />
      <div style={{ display: "flex", gap: 8 }}>
        <Link to="/events">Найти событие</Link>
        <Link to="/create">Создать встречу</Link>
      </div>
    </main>
  );
}
