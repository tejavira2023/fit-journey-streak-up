
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import TimeSlotPicker from "./TimeSlotPicker";
import { toast } from "sonner";
import { format } from "date-fns";

type Consultant = {
  name: string;
  specialty: string;
  availability: string;
  image: string;
};

interface BookingModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  consultant: Consultant;
}

const defaultSlots = [
  "09:00 - 09:30 AM",
  "10:00 - 10:30 AM",
  "11:00 - 11:30 AM",
  "02:00 - 02:30 PM",
  "03:00 - 03:30 PM",
  "05:00 - 05:30 PM",
  "07:00 - 07:30 PM"
];

export default function BookingModal({ open, onOpenChange, consultant }: BookingModalProps) {
  const [date, setDate] = React.useState<Date | undefined>();
  const [slot, setSlot] = React.useState<string>("");
  const navigate = useNavigate();

  function handleBook() {
    if (!date || !slot) {
      toast.error("Please select both date and time slot.");
      return;
    }
    toast.success(`Session booked with ${consultant.name} on ${format(date, "PPP")} at ${slot}!`);
    onOpenChange(false);
    
    // Store booking info
    const bookingInfo = {
      consultantName: consultant.name,
      date: date.toISOString(),
      slot: slot
    };
    localStorage.setItem("consultationBooking", JSON.stringify(bookingInfo));
    
    console.log("Booking info saved:", bookingInfo);
    
    // Navigate to consultation form with consultant info
    setTimeout(() => {
      navigate("/consultation-form", { 
        state: { 
          consultantName: consultant.name,
          bookingDate: format(date, "PPP"),
          bookingTime: slot
        } 
      });
    }, 500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book a Session</DialogTitle>
          <DialogDescription>Choose your date and time slot with <b>{consultant.name}</b>.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm mb-1 block font-medium">Booking Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(d: Date) => d < new Date(new Date().setHours(0,0,0,0))}
              className="p-3 pointer-events-auto rounded-md border"
            />
          </div>
          <div>
            <label className="text-sm mb-1 block font-medium">Time Slot</label>
            <TimeSlotPicker slot={slot} onSlotChange={setSlot} slots={defaultSlots} />
          </div>
          <Button
            className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
            onClick={handleBook}
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
