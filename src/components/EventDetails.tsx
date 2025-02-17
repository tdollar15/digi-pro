import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { useParams } from "react-router-dom";

const mockEvents = {
  "1": {
    id: "1",
    title: "Tech Conference 2024",
    date: "April 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, New York",
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
    status: "upcoming",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    organizer: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    program: [
      {
        time: "9:00 AM",
        title: "Registration & Breakfast",
        description: "Check-in and enjoy breakfast",
      },
      {
        time: "10:00 AM",
        title: "Keynote Speech",
        description: "Opening remarks and industry insights",
      },
      {
        time: "12:00 PM",
        title: "Lunch Break",
        description: "Networking lunch",
      },
      {
        time: "1:00 PM",
        title: "Workshop Sessions",
        description: "Choose from multiple tracks",
      },
      {
        time: "4:00 PM",
        title: "Closing Remarks",
        description: "Event wrap-up and next steps",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Music Festival",
    date: "May 1, 2024",
    time: "2:00 PM - 11:00 PM",
    location: "Central Park, New York",
    description:
      "A day of amazing music featuring top artists and emerging talent.",
    status: "live",
    imageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop",
    organizer: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    program: [
      {
        time: "2:00 PM",
        title: "Gates Open",
        description: "Welcome and security check",
      },
      {
        time: "3:00 PM",
        title: "Opening Act",
        description: "Rising stars performance",
      },
      {
        time: "5:00 PM",
        title: "Main Stage",
        description: "Headliner performance",
      },
      {
        time: "8:00 PM",
        title: "Special Guest",
        description: "Surprise artist performance",
      },
      {
        time: "10:00 PM",
        title: "Closing Act",
        description: "Grand finale",
      },
    ],
  },
};

const EventDetails = () => {
  const { id } = useParams();
  const event = mockEvents[id || "1"];

  const statusColors = {
    live: "bg-green-500",
    upcoming: "bg-blue-500",
    completed: "bg-gray-500",
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <div className="relative h-[300px] w-full">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <Badge
            className={`absolute top-4 right-4 ${statusColors[event.status]} text-white`}
            variant="secondary"
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
        <CardContent className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <CalendarDays className="h-5 w-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">About the Event</h2>
            <p className="text-gray-600">{event.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Event Program</h2>
            <div className="space-y-4">
              {event.program.map((item, index) => (
                <div
                  key={index}
                  className="flex space-x-4 p-4 border rounded-lg"
                >
                  <div className="w-24 font-semibold text-gray-600">
                    {item.time}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Event Organizer</h2>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <Avatar>
                <AvatarImage src={event.organizer.avatar} />
                <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{event.organizer.name}</h3>
                <Button variant="link" className="p-0">
                  Contact Organizer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;
