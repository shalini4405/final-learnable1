
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LucideHome, BarChart3, Trophy, BookOpen, Compass, Users, Map, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  
  const navItems = [
    { path: "/", name: "Home", icon: LucideHome },
    { path: "/courses", name: "Courses", icon: BookOpen },
    { path: "/roadmap", name: "Roadmaps", icon: Map },
    { path: "/resources", name: "Resources", icon: FileText },
    { path: "/skill-graph", name: "Skill Graph", icon: BarChart3 },
    { path: "/leaderboard", name: "Leaderboard", icon: Trophy },
    { path: "/hackbuddies", name: "HackBuddies", icon: Users },
  ];

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-white">
            <span>LA</span>
          </div>
          <span>LearnAble</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-10"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <nav className="fixed inset-0 top-16 bg-background z-50 p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium",
                pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-border">
            <Link 
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-foreground/80 hover:bg-muted"
            >
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                <span className="text-foreground/70">U</span>
              </div>
              <span>Profile</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
