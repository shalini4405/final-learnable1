
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useUser();

  return (
    <Toggle 
      pressed={isDarkMode}
      onPressedChange={toggleDarkMode} 
      aria-label="Toggle dark mode"
      className="rounded-full p-2"
    >
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
    </Toggle>
  );
}
