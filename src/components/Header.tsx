import React, { useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  onSearch?: (term: string) => void;
  onCategorySelect?: (category: string) => void;
  categories?: string[];
  selectedCategory?: string;
}

const Header = ({
  onSearch = () => {},
  onCategorySelect = () => {},
  categories = ["All", "Tech", "Music", "Sports"],
  selectedCategory = "",
}: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 w-full"
          />
        </div>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`cursor-pointer px-4 py-2 text-sm ${selectedCategory === category ? "bg-primary" : "hover:bg-secondary/80"}`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Header;
