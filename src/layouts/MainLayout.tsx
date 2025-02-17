import React from "react";
import Header from "@/components/Header";
import { useLocation, Link } from "react-router-dom";
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

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
              <Link to="/" className="text-2xl font-bold">
                Event Platform
              </Link>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link to="/">Browse Events</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/organizer/dashboard">Organizer Dashboard</Link>
                </Button>
              </div>
            </div>
            <Header
              onSearch={handleSearch}
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
              categories={categories}
            />
          </div>
        </div>
      )}
      {React.cloneElement(children as React.ReactElement, {
        events: filteredEvents,
      })}
    </div>
  );
};

export default MainLayout;
