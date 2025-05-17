
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useUser();

  return (
    <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
