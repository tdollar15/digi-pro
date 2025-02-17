import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import EventGrid from "./EventGrid";
import { Plus } from "lucide-react";

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

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const events: Record<string, Event[]> = {
    upcoming: [
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
    ],
    live: [
      {
        id: "2",
        title: "Music Festival",
        date: "Today",
        status: "live",
        imageUrl:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop",
        organizer: {
          name: "John Doe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
      },
    ],
    completed: [
      {
        id: "3",
        title: "Sports Tournament",
        date: "March 10, 2024",
        status: "completed",
        imageUrl:
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
        organizer: {
          name: "John Doe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Events</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <EventGrid events={events.upcoming} />
            </TabsContent>

            <TabsContent value="live">
              <EventGrid events={events.live} />
            </TabsContent>

            <TabsContent value="completed">
              <EventGrid events={events.completed} />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
};

export default OrganizerDashboard;
