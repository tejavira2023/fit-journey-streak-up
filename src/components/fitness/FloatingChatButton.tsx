
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AIChat from "./AIChat";

const FloatingChatButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-fitness-primary hover:bg-fitness-primary/90"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] h-[600px] p-0">
          <AIChat />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FloatingChatButton;
