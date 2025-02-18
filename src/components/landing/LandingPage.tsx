import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  BarChart,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Event Management",
    description:
      "Create and manage events with ease. Track attendance and program items in real-time.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Attendee Engagement",
    description:
      "Connect with your audience through interactive features and real-time updates.",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Analytics",
    description:
      "Get insights into your event's performance with detailed analytics and reports.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Up to 3 events",
      "Basic analytics",
      "Email support",
      "Community access",
    ],
  },
  {
    name: "Pro",
    price: "Coming Soon",
    description: "Ideal for growing organizations",
    features: [
      "Unlimited events",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    price: "Coming Soon",
    description: "For large-scale operations",
    features: [
      "Unlimited everything",
      "Custom solutions",
      "Dedicated support",
      "SLA guarantee",
    ],
  },
];

export default function LandingPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-white overflow-hidden">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Digi-Pro
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection("features")}
                >
                  Features
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection("pricing")}
                >
                  Pricing
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  asChild
                >
                  <Link to="/">Browse Events</Link>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/5"
                >
                  Log in
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center lg:pt-32 relative">
        <div
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <Badge className="mb-4 relative 
          bg-purple-500/20 
          text-purple-700 
          border-purple-300 
          hover:bg-purple-500/30 
          transition-all 
          duration-300 
          ease-in-out 
          shadow-lg 
          shadow-purple-500/50 
          hover:shadow-xl 
          hover:shadow-purple-500/70" 
          variant="secondary">
          Now in Beta
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-7xl mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          The Modern Way to
          <span className="block">handle events</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Streamline your event management process with our powerful platform.
          Create, manage, and track events with ease.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="hover:bg-primary/5">
            View Demo
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="py-24 bg-white/50 backdrop-blur-sm scroll-mt-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to run successful events
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
                  relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-purple-500/10 
                  before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                  after:absolute after:inset-0 after:border-2 after:border-transparent 
                  after:hover:border-primary/30 after:transition-all after:duration-300"
              >
                <CardContent className="pt-6 relative z-10">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary mb-4 ring-1 ring-primary/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24 relative overflow-hidden scroll-mt-16">
        <div
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+15rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className="border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
                  relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-purple-500/10 
                  before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                  after:absolute after:inset-0 after:border-2 after:border-transparent 
                  after:hover:border-primary/30 after:transition-all after:duration-300"
              >
                <CardContent className="pt-6 relative z-10">
                  <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                      {tier.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${index === 0 ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" : ""}`}
                    variant={index === 0 ? "default" : "outline"}
                  >
                    {index === 0 ? "Get Started" : "Coming Soon"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary/10 to-purple-500/10 py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-4">
                Digi-Pro
              </div>
              <p className="text-gray-600">Revolutionizing event management with cutting-edge technology.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Cookies Policy</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
              <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button 
                  className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-r-md hover:from-primary/90 hover:to-purple-600/90 transition-all"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Digi-Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
