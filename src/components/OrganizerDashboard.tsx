import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import EventGrid from "./EventGrid";
import { Plus, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: "live" | "upcoming" | "completed";
  imageUrl: string;
  category: string;
  organizer: {
    name: string;
    avatar: string;
    isCurrentUser: boolean;
  };
}

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id' | 'organizer'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    category: ''
  });

  const [events, setEvents] = useState<Record<string, Event[]>>({
    upcoming: [
      {
        id: "1",
        title: "Tech Conference 2024",
        date: "April 15, 2024",
        time: "9:00 AM - 5:00 PM",
        location: "Convention Center, New York",
        description: "Join us for the biggest tech conference of the year",
        status: "upcoming",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
        category: "Tech",
        organizer: {
          name: "John Doe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
          isCurrentUser: true
        }
      },
      {
        id: "2",
        title: "Music Festival 2024",
        date: "May 1, 2024",
        time: "2:00 PM - 11:00 PM",
        location: "Central Park, New York",
        description: "A day of amazing music featuring top artists",
        status: "live",
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop",
        category: "Music",
        organizer: {
          name: "John Doe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
          isCurrentUser: true
        }
      },
      {
        id: "3",
        title: "Art Exhibition",
        date: "March 10, 2024",
        time: "10:00 AM - 6:00 PM",
        location: "Modern Art Museum",
        description: "Annual contemporary art showcase",
        status: "completed",
        imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
        category: "Art",
        organizer: {
          name: "John Doe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
          isCurrentUser: true
        }
      }
    ],
    live: [],
    completed: []
  });

  const handleCreateEvent = () => {
    // Get current date in local timezone
    const currentDate = new Date();
    const selectedDate = new Date(`${newEvent.date}T${newEvent.time || '00:00'}`);

    // Validate that the event is in the future or today
    if (selectedDate < currentDate) {
      alert("Events must be scheduled for today or a future date.");
      return;
    }

    // Determine status based on date
    let eventStatus: "upcoming" | "live" | "completed" = "upcoming";

    // Generate a unique ID (in a real app, this would come from backend)
    const newEventWithId: Event = {
      ...newEvent,
      id: `event-${Date.now()}`,
      status: eventStatus,
      organizer: {
        name: "John Doe", // Current user's name
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John", // Current user's avatar
        isCurrentUser: true
      }
    };

    // Add to the upcoming events array
    const updatedEvents = {...events};
    updatedEvents.upcoming.push(newEventWithId);
    
    setEvents(updatedEvents);

    // Reset form and close modal
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      status: 'upcoming',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
      category: ''
    });
    setIsCreateEventModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Events</h1>
        <Dialog open={isCreateEventModalOpen} onOpenChange={setIsCreateEventModalOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Event Title
                </Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="col-span-3"
                  placeholder="Enter event title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="col-span-3"
                  min={new Date().toISOString().split('T')[0]} // Restrict to current or future dates
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  type="text"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g. 9:00 AM - 5:00 PM"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="col-span-3"
                  placeholder="Enter event location"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="col-span-3"
                  placeholder="Describe your event"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select 
                  value={newEvent.category} 
                  onValueChange={(value) => setNewEvent({...newEvent, category: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select event category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Art">Art</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsCreateEventModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateEvent}
                disabled={!newEvent.title || !newEvent.date || !newEvent.location}
              >
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white hover:bg-orange-400"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white hover:bg-orange-400"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="live" 
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white hover:bg-green-400"
              >
                Live
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-400"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <EventGrid events={[...events.upcoming, ...events.live, ...events.completed]} />
            </TabsContent>
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
