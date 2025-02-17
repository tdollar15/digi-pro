import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  id?: string;
  title?: string;
  date?: string;
  status?: "live" | "upcoming" | "completed";
  imageUrl?: string;
  organizer?: {
    name: string;
    avatar: string;
  };
}

const EventCard = ({
  id = "1",
  title = "Tech Conference 2024",
  date = "April 15, 2024",
  status = "upcoming",
  imageUrl = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
  organizer = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
}: EventCardProps) => {
  const navigate = useNavigate();
  const statusColors = {
    live: "bg-green-500",
    upcoming: "bg-blue-500",
    completed: "bg-gray-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-white cursor-pointer"
      onClick={() => navigate(`/event/${id}`)}
      data-testid="event-card"
    >
      <Card className="overflow-hidden h-[400px] flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <Badge
              className={`absolute top-4 right-4 ${statusColors[status]} text-white`}
              variant="secondary"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{date}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0 border-t">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={organizer.avatar} />
              <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">{organizer.name}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EventCard;
