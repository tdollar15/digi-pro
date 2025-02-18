import { Button } from "@/components/ui/button";
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
              Event Platform
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
        <Badge className="mb-4" variant="secondary">
          Now in Beta
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          The Modern Way to
          <span className="block">Manage Events</span>
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
                className="border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary mb-4 ring-1 ring-primary/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
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
            Simple, transparent pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className="border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <CardContent className="pt-6">
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
    </div>
  );
}
