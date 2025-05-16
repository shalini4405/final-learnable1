
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, X, Minimize, Maximize } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock AI responses for demonstration purposes
const mockResponses = [
  "I recommend starting with the fundamentals of JavaScript before diving into React.",
  "For your career path in full-stack development, consider learning these technologies in order: HTML/CSS, JavaScript, React, Node.js, and then a database like MongoDB or PostgreSQL.",
  "Based on your interests, a Data Science roadmap would include: Python basics, pandas for data manipulation, matplotlib/seaborn for visualization, and then machine learning with scikit-learn.",
  "To become a DevOps engineer, focus on: Linux fundamentals, networking basics, one cloud provider (AWS/Azure/GCP), containerization with Docker, and orchestration with Kubernetes.",
  "For mobile development, you could start with React Native if you already know JavaScript, or explore native development with Swift (iOS) or Kotlin (Android).",
];

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const ChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your SkillSprint AI assistant. Ask me about learning paths, career roadmaps, or specific skills you want to develop.",
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const newAiMessage = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isUser: false,
      };

      setMessages((prev) => [...prev, newAiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <Button
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg flex items-center justify-center p-0 z-50"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chatbot container */}
      {isOpen && (
        <Card className={`fixed bottom-6 right-6 w-80 md:w-96 shadow-lg z-50 transition-all duration-300 ${
          isMinimized ? "h-14" : "h-[480px]"
        }`}>
          <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-5 w-5" />
              SkillSprint AI
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMinimize}>
                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleChatbot}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-4 overflow-y-auto h-[350px]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                        <p className="text-sm flex items-center gap-2">
                          <span className="inline-block h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                          <span className="inline-block h-2 w-2 bg-primary rounded-full animate-pulse delay-150"></span>
                          <span className="inline-block h-2 w-2 bg-primary rounded-full animate-pulse delay-300"></span>
                        </p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-2 border-t">
                <form 
                  className="flex w-full gap-2" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about learning paths..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default ChatbotUI;
