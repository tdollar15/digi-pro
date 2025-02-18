import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { CalendarDays, MapPin, Clock, Check, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface ProgramItem {
  time: string;
  title: string;
  description: string;
  isCompleted?: boolean;
}

interface TaskItem {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
  responsiblePerson?: string;
  isCompleted?: boolean;
}

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
    category: "Tech",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    organizer: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      isCurrentUser: true,
    },
    program: [
      {
        time: "9:00 AM",
        title: "Registration & Breakfast",
        description: "Check-in and enjoy breakfast",
        isCompleted: false,
      },
      {
        time: "10:00 AM",
        title: "Keynote Speech",
        description: "Opening remarks and industry insights",
        isCompleted: false,
      },
      {
        time: "12:00 PM",
        title: "Lunch Break",
        description: "Networking lunch",
        isCompleted: false,
      },
      {
        time: "1:00 PM",
        title: "Workshop Sessions",
        description: "Choose from multiple tracks",
        isCompleted: false,
      },
      {
        time: "4:00 PM",
        title: "Closing Remarks",
        description: "Event wrap-up and next steps",
        isCompleted: false,
      },
    ],
    tasks: [] as TaskItem[],
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
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop",
    organizer: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      isCurrentUser: false,
    },
    program: [
      {
        time: "2:00 PM",
        title: "Gates Open",
        description: "Welcome and security check",
        isCompleted: true,
      },
      {
        time: "3:00 PM",
        title: "Opening Act",
        description: "Rising stars performance",
        isCompleted: true,
      },
      {
        time: "5:00 PM",
        title: "Main Stage",
        description: "Headliner performance",
        isCompleted: false,
      },
      {
        time: "8:00 PM",
        title: "Special Guest",
        description: "Surprise artist performance",
        isCompleted: false,
      },
      {
        time: "10:00 PM",
        title: "Closing Act",
        description: "Grand finale",
        isCompleted: false,
      },
    ],
    tasks: [] as TaskItem[],
  },
};

const EventDetails = () => {
  const { id } = useParams();
  const event = mockEvents[id || "1"];
  const [program, setProgram] = React.useState<ProgramItem[]>(event.program);
  const [tasks, setTasks] = React.useState<TaskItem[]>(event.tasks || []);
  const isOrganizer = event.organizer.isCurrentUser;

  const statusColors = {
    live: "bg-green-500",
    upcoming: "bg-blue-500",
    completed: "bg-gray-500",
  };

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<TaskItem, 'id'>>({
    startTime: '',
    endTime: '',
    description: '',
    responsiblePerson: ''
  });

  const handleAddTask = () => {
    const taskToAdd = {
      ...newTask,
      id: `task-${Date.now()}`, // Generate unique ID
      isCompleted: false // Initialize as not completed
    };

    const updatedTasks = [...tasks, taskToAdd];
    setTasks(updatedTasks);
    
    // Update mockEvents (in a real app, this would be a backend call)
    event.tasks = updatedTasks;

    // Reset modal state
    setNewTask({
      startTime: '',
      endTime: '',
      description: '',
      responsiblePerson: ''
    });
    setIsTaskModalOpen(false);
  };

  const handleProgramItemComplete = (index: number) => {
    const updatedProgram = [...program];
    updatedProgram[index] = {
      ...updatedProgram[index],
      isCompleted: !updatedProgram[index].isCompleted,
    };
    setProgram(updatedProgram);
    // In a real app, you would save this to your backend
  };

  const handleTaskComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: !task.isCompleted } 
        : task
    );

    setTasks(updatedTasks);
    
    // Update mockEvents (in a real app, this would be a backend call)
    event.tasks = updatedTasks;
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
              {program.map((item, index) => (
                <div
                  key={index}
                  className={`flex space-x-4 p-4 border rounded-lg ${item.isCompleted ? "bg-gray-50" : ""}`}
                >
                  <div className="w-24 font-semibold text-gray-600">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-semibold ${item.isCompleted ? "text-gray-500" : ""}`}
                      >
                        {item.title}
                      </h3>
                      {isOrganizer && event.status === "live" && (
                        <Checkbox
                          checked={item.isCompleted}
                          onCheckedChange={() =>
                            handleProgramItemComplete(index)
                          }
                        />
                      )}
                      {!isOrganizer && item.isCompleted && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <p
                      className={`text-gray-600 ${item.isCompleted ? "text-gray-400" : ""}`}
                    >
                      {item.description}
                    </p>
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
                {!isOrganizer && (
                  <Button variant="link" className="p-0">
                    Contact Organizer
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Event Tasks</h2>
              {isOrganizer && (
                <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startTime" className="text-right">
                          Start Time
                        </Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={newTask.startTime}
                          onChange={(e) => setNewTask({...newTask, startTime: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endTime" className="text-right">
                          End Time
                        </Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={newTask.endTime}
                          onChange={(e) => setNewTask({...newTask, endTime: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          value={newTask.description}
                          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                          className="col-span-3"
                          placeholder="Enter task description"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="responsiblePerson" className="text-right">
                          Responsible Person
                        </Label>
                        <Input
                          id="responsiblePerson"
                          value={newTask.responsiblePerson || ''}
                          onChange={(e) => setNewTask({...newTask, responsiblePerson: e.target.value})}
                          className="col-span-3"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsTaskModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddTask}
                        disabled={!newTask.startTime || !newTask.endTime || !newTask.description}
                      >
                        Add Task
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            {tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`flex space-x-4 p-4 border rounded-lg ${task.isCompleted ? "bg-gray-50" : ""}`}
                  >
                    <div className="w-24 font-semibold text-gray-600">
                      {task.startTime} - {task.endTime}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${task.isCompleted ? "text-gray-500 line-through" : ""}`}>
                          {task.description}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {task.responsiblePerson && (
                            <span className={`text-sm ${task.isCompleted ? "text-gray-400" : "text-gray-500"}`}>
                              {task.responsiblePerson}
                            </span>
                          )}
                          {isOrganizer && event.status === "live" && (
                            <Checkbox
                              checked={task.isCompleted}
                              onCheckedChange={() => handleTaskComplete(task.id)}
                            />
                          )}
                          {!isOrganizer && task.isCompleted && (
                            <Check className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No tasks added yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;
