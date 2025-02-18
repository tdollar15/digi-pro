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
}

function Home({ events }: HomeProps) {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <EventGrid events={events} />
    </div>
  );
}

export default Home;
