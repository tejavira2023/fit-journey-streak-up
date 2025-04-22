
type TimeSlotPickerProps = {
  slots: string[];
  slot: string;
  onSlotChange: (s: string) => void;
};

export default function TimeSlotPicker({ slots, slot, onSlotChange }: TimeSlotPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {slots.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSlotChange(s)}
          className={`px-3 py-2 rounded-lg text-sm border
            ${slot === s
              ? "bg-fitness-primary text-white border-fitness-primary"
              : "bg-white text-fitness-primary border-gray-200 hover:bg-fitness-primary/10"}
            focus:outline-none focus:ring-2 focus:ring-fitness-primary transition
          `}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
