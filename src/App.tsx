import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import { LandingPage } from "./components/landing";
import EventDetails from "./components/EventDetails";
import OrganizerDashboard from "./components/OrganizerDashboard";
import MainLayout from "./layouts/MainLayout";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        </Routes>
      </MainLayout>
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}
    </Suspense>
  );
}

export default App;
