import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HomeIcon, ActivityIcon, TrendingUpIcon, UserIcon, MenuIcon } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon },
    { id: "assessment", label: "Assessment", icon: ActivityIcon },
    { id: "analytics", label: "Analytics", icon: TrendingUpIcon },
    { id: "profile", label: "Profile", icon: UserIcon },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-energy rounded-lg flex items-center justify-center">
              <span className="text-background font-black text-lg">SAI</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-foreground">Sports Authority India</h1>
              <p className="text-sm text-muted-foreground">Talent Assessment Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => setActiveSection(item.id)}
                  className={
                    isActive 
                      ? "btn-energy px-4 py-2" 
                      : "hover:bg-surface px-4 py-2 transition-all duration-200"
                  }
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Status & Profile */}
          <div className="flex items-center space-x-4">
            <Badge className="bg-success/20 text-success border-success/30 hidden sm:flex">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
              AI Active
            </Badge>
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
            
            <div className="hidden sm:block w-8 h-8 bg-gradient-performance rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
};