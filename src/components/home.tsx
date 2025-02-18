import React from 'react';
import { Button } from './ui/button';
import EventGrid from "./EventGrid";

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

interface HomeProps {
  events: Event[];
  onLoadMore?: () => void;
  hasMoreEvents?: boolean;
}

const Home: React.FC<HomeProps> = ({ events, onLoadMore, hasMoreEvents }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <EventGrid events={events} />
      {onLoadMore && hasMoreEvents && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={onLoadMore}
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
          >
            Load More Events
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
