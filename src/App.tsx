import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/landing";
import EventDetails from "./components/EventDetails";
import OrganizerDashboard from "./components/OrganizerDashboard";
import MainLayout from "./layouts/MainLayout";
import routes from "tempo-routes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserProvider } from "./context/UserContext";

// Create a simple 404 component
const NotFound = () => (
  <div className="container mx-auto p-4 text-center">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p className="text-muted-foreground">The page you are looking for does not exist.</p>
    <button 
      onClick={() => window.history.back()} 
      className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
    >
      Go Back
    </button>
  </div>
);

function App() {
  return (
    <UserProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/404" element={<NotFound />} />
            {/* Catch-all route to redirect to 404 */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </MainLayout>
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}
      </Suspense>
    </UserProvider>
  );
}

export default App;
