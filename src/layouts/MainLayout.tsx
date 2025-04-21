import React from "react";
import Header from "@/components/Header";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Home from "@/components/home";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

interface Event {
  id: string;
  title: string;
  date: string;
  status: string;
  imageUrl: string;
  category: string;
  organizer: {
    name: string;
    avatar: string;
  };
}

const allEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2024",
    date: "April 15, 2024",
    status: "upcoming",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    category: "Technology",
    organizer: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  },
  {
    id: "2",
    title: "Music Festival",
    date: "Today",
    status: "live",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop",
    category: "Music",
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
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
    category: "Sports",
    organizer: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
  },
  {
    id: "4",
    title: "Art Exhibition",
    date: "May 5, 2024",
    status: "upcoming",
    imageUrl: "https://images.unsplash.com/photo-1511108690759-0eed7a9a8b6a?w=800&auto=format&fit=crop",
    category: "Art",
    organizer: {
      name: "Emily Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
  },
  {
    id: "5",
    title: "Startup Pitch Competition",
    date: "June 20, 2024",
    status: "upcoming",
    imageUrl: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop",
    category: "Business",
    organizer: {
      name: "Alex Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
  },
  {
    id: "6",
    title: "International Film Festival",
    date: "July 15, 2024",
    status: "upcoming",
    imageUrl: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&auto=format&fit=crop",
    category: "Entertainment",
    organizer: {
      name: "Sarah Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  },
  {
    id: "7",
    title: "Coding Hackathon",
    date: "August 10, 2024",
    status: "upcoming",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    category: "Technology",
    organizer: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  },
  {
    id: "8",
    title: "Food and Wine Expo",
    date: "September 5, 2024",
    status: "upcoming",
    imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop",
    category: "Culinary",
    organizer: {
      name: "Maria Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
  },
];

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const { user, loading, signOut } = useUser();
  const navigate = useNavigate();
  const showHeader = !location.pathname.includes("/tempobook/");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleEvents, setVisibleEvents] = useState(4);
  const [filteredEvents, setFilteredEvents] = useState<typeof allEvents>(allEvents);

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
    setVisibleEvents(4); // Reset visible events when filtering
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterEvents(term, selectedCategory);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterEvents(searchTerm, category);
  };

  const handleLoadMore = () => {
    setVisibleEvents((prev) => prev + 4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <div className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 hover:text-primary transition-colors"
                >
                  Digi-Pro
                </Link>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/landing" className="gap-2">
                    <span>Home</span>
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                {!location.pathname.includes("/organizer/dashboard") && (
                  <Button variant="outline" asChild>
                    <Link to="/organizer/dashboard">Organizer Dashboard</Link>
                  </Button>
                )}
                {location.pathname === "/organizer/dashboard" && (
                  <Button
                    className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    asChild
                  >
                    <Link to="/">Browse Events</Link>
                  </Button>
                )}
                <div className="flex gap-2 ml-4 border-l pl-4">
                  {/* Auth UI: Login/Logout */}
                  {!loading && (
                    user ? (
                      <>
                        <span className="text-sm text-gray-600">{user.email}</span>
                        <Button size="sm" variant="outline" onClick={signOut}>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => navigate('/login')}>
                        Login
                      </Button>
                    )
                  )}
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
      {location.pathname === "/" && (
        <Home 
          events={filteredEvents.slice(0, visibleEvents)} 
          onLoadMore={handleLoadMore} 
          hasMoreEvents={visibleEvents < filteredEvents.length}
        />
      )}
      {location.pathname !== "/" && children}
    </div>
  );
};

export default MainLayout;
