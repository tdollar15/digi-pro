import React from "react";
import EventCard from "./EventCard";
import { Skeleton } from "./ui/skeleton";

interface Event {
  id: string;
  title: string;
  date: string;
  status: "live" | "upcoming" | "completed";
  category: string;
  imageUrl: string;
  organizer: {
    name: string;
    avatar: string;
  };
}

interface EventGridProps {
  events: Event[];
  isLoading?: boolean;
}

const EventGrid = ({ events, isLoading = false }: EventGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-full h-[400px]">
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center h-[400px] text-gray-500">
        No events found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          status={event.status}
          imageUrl={event.imageUrl}
          organizer={event.organizer}
        />
      ))}
    </div>
  );
};

export default EventGrid;
