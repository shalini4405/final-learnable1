
import { Link, useLocation } from "react-router-dom";
import { LucideHome, BarChart3, Trophy, BookOpen, Compass, Users, Map } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { pathname } = useLocation();

  const navItems = [
    { path: "/", name: "Home", icon: LucideHome },
    { path: "/courses", name: "Courses", icon: BookOpen },
    { path: "/roadmap", name: "Roadmaps", icon: Map },
    { path: "/skill-graph", name: "Skill Graph", icon: BarChart3 },
    { path: "/leaderboard", name: "Leaderboard", icon: Trophy },
    { path: "/hackbuddies", name: "HackBuddies", icon: Users },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 sticky top-0">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-white">
            <span>LA</span>
          </div>
          <span>SkillSprint</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
              pathname === item.path
                ? "bg-primary/10 text-primary"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Link 
          to="/profile" 
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <span className="text-gray-500">U</span>
          </div>
          <span>Profile</span>
        </Link>
      </div>
    </aside>
  );
}
