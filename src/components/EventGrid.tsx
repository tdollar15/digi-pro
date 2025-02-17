import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { Skeleton } from "./ui/skeleton";

interface Event {
  id: string;
  title: string;
  date: string;
  status: "live" | "upcoming" | "completed";
  imageUrl: string;
  organizer: {
    name: string;
    avatar: string;
  };
}

interface EventGridProps {
  events?: Event[];
  isLoading?: boolean;
}

const EventGrid = ({
  events = [
    {
      id: "1",
      title: "Tech Conference 2024",
      date: "April 15, 2024",
      status: "upcoming",
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
      imageUrl:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
      organizer: {
        name: "Mike Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
    },
  ],
  isLoading = false,
}: EventGridProps) => {
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setIsLoadingMore(true);
        // Simulate loading more data
        setTimeout(() => {
          setPage((prev) => prev + 1);
          setIsLoadingMore(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-full h-[400px]">
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          date={event.date}
          status={event.status}
          imageUrl={event.imageUrl}
          organizer={event.organizer}
        />
      ))}
      {isLoadingMore && (
        <div className="col-span-full flex justify-center p-4">
          <div className="w-full max-w-sm">
            <Skeleton className="w-full h-[400px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGrid;
