
import { useState } from "react";
import { Button } from "@/components/ui/button";
import BookingModal from "./BookingModal";

type Consultant = {
  name: string;
  specialty: string;
  availability: string;
  image: string;
};

export default function ConsultBookButton({ consultant }: { consultant: Consultant }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
        onClick={() => setOpen(true)}
      >
        Schedule Session
      </Button>
      <BookingModal open={open} onOpenChange={setOpen} consultant={consultant} />
    </>
  );
}
