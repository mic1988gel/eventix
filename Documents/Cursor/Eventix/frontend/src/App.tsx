import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BottomNav } from "./components/common/BottomNav";
import CreateEventPage from "./pages/CreateEvent";
import EventDetailsPage from "./pages/EventDetails";
import EventsPage from "./pages/Events";
import HomePage from "./pages/Home";
import MapPage from "./pages/Map";
import ProfilePage from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: 12 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreateEventPage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
