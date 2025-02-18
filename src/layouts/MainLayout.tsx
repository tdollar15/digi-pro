import React from "react";
import Header from "@/components/Header";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Home from "@/components/home";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

const allEvents = [
  {
    id: "1",
    title: "Tech Conference 2024",
    date: "April 15, 2024",
    status: "upcoming",
    category: "Tech",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    organizer: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  },
  {
    id: "2",
    title: "Music Festival",
    date: "May 1, 2024",
    status: "live",
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop",
    organizer: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
  },
  {
    id: "3",
    title: "Sports Tournament",
    date: "March 10, 2024",
    status: "completed",
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
    organizer: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
  },
];

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const showHeader = !location.pathname.includes("/tempobook/");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredEvents, setFilteredEvents] =
    useState<typeof allEvents>(allEvents);

  // Only show search and filters on the home page
  const showSearchAndFilters = location.pathname === "/";

  const categories = [
    "All",
    ...Array.from(new Set(allEvents.map((event) => event.category))),
  ];

  const filterEvents = (search: string, category: string) => {
    let filtered = [...allEvents];

    if (search) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category && category !== "All") {
      filtered = filtered.filter((event) => event.category === category);
    }

    setFilteredEvents(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterEvents(term, selectedCategory);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterEvents(searchTerm, category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <div className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-6">
                <Link
                  to="/landing"
                  className="text-2xl font-bold hover:text-primary transition-colors"
                >
                  Event Platform
                </Link>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/landing" className="gap-2">
                    <span>Home</span>
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" asChild>
                  <Link to="/">Browse Events</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/organizer/dashboard">Organizer Dashboard</Link>
                </Button>
                <div className="flex gap-2 ml-4 border-l pl-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-primary/5"
                  >
                    Log in
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
            {showSearchAndFilters && (
              <Header
                onSearch={handleSearch}
                onCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory}
                categories={categories}
              />
            )}
          </div>
        </div>
      )}
      {location.pathname === "/" ? <Home events={filteredEvents} /> : children}
    </div>
  );
};

export default MainLayout;
