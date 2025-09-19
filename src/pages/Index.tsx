import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { AssessmentCard } from "@/components/AssessmentCard";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { AIAnalysis } from "@/components/AIAnalysis";
import { ActivityIcon, TrendingUpIcon, ZapIcon, AwardIcon, UsersIcon, VideoIcon } from "lucide-react";
import heroSports from "@/assets/hero-sports.jpg";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const assessmentCategories = [
    {
      id: "fitness",
      title: "Fitness Assessment",
      description: "Comprehensive fitness evaluation tests",
      tests: ["Vertical Jump", "Sprint Test", "Endurance Run", "Flexibility Test"],
      icon: ActivityIcon,
      color: "from-primary to-primary-glow"
    },
    {
      id: "strength", 
      title: "Strength Testing",
      description: "Power and strength measurement protocols",
      tests: ["Push-ups", "Pull-ups", "Sit-ups", "Plank Hold"],
      icon: ZapIcon,
      color: "from-accent to-primary"
    },
    {
      id: "agility",
      title: "Agility & Speed",
      description: "Movement efficiency and reaction testing",
      tests: ["Shuttle Run", "Cone Drill", "Reaction Time", "Balance Test"],
      icon: TrendingUpIcon,
      color: "from-success to-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === "dashboard" && (
        <>
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroSports})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 font-medium">
                    Sports Authority of India
                  </Badge>
                  <h1 className="text-6xl font-black leading-tight">
                    <span className="text-transparent bg-gradient-to-r from-foreground to-primary bg-clip-text">
                      AI-Powered
                    </span>
                    <br />
                    <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                      Talent Assessment
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Democratizing sports talent discovery with cutting-edge AI verification, 
                    performance analytics, and mobile-first assessment protocols.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="btn-energy px-8 py-4 text-lg"
                    onClick={() => setActiveSection("assessment")}
                  >
                    <VideoIcon className="mr-2 h-5 w-5" />
                    Start Assessment
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-border hover:bg-surface px-8 py-4 text-lg"
                    onClick={() => setActiveSection("analytics")}
                  >
                    <TrendingUpIcon className="mr-2 h-5 w-5" />
                    View Analytics
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="card-athletic p-6">
                  <CardContent className="space-y-2 p-0">
                    <div className="flex items-center justify-between">
                      <UsersIcon className="h-8 w-8 text-primary" />
                      <span className="metric-display">50K+</span>
                    </div>
                    <p className="font-semibold text-foreground">Athletes Assessed</p>
                    <p className="text-sm text-muted-foreground">Across 28 states</p>
                  </CardContent>
                </Card>
                
                <Card className="card-athletic p-6">
                  <CardContent className="space-y-2 p-0">
                    <div className="flex items-center justify-between">
                      <AwardIcon className="h-8 w-8 text-accent" />
                      <span className="metric-display">98%</span>
                    </div>
                    <p className="font-semibold text-foreground">AI Accuracy</p>
                    <p className="text-sm text-muted-foreground">Verified performance</p>
                  </CardContent>
                </Card>
                
                <Card className="card-athletic p-6 col-span-2">
                  <CardContent className="space-y-2 p-0">
                    <div className="flex items-center justify-between">
                      <ZapIcon className="h-8 w-8 text-warning" />
                      <span className="metric-display">24/7</span>
                    </div>
                    <p className="font-semibold text-foreground">Real-time Analysis</p>
                    <p className="text-sm text-muted-foreground">Instant performance feedback</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Assessment Categories */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-4xl font-black text-transparent bg-gradient-to-r from-foreground to-primary bg-clip-text">
                  Assessment Categories
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive talent evaluation across multiple athletic domains with AI-powered verification
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {assessmentCategories.map((category) => (
                  <AssessmentCard 
                    key={category.id}
                    category={category}
                    onSelect={() => setActiveSection("assessment")}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {activeSection === "assessment" && (
        <AIAnalysis />
      )}

      {activeSection === "analytics" && (
        <PerformanceDashboard />
      )}
    </div>
  );
};

export default Index;