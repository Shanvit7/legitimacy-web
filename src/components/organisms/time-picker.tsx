"use client";
// HOOKS
import { useState } from "react";
// COMPONENTS
import { Input } from "@/components/atoms/input";
// UTILS
import { calculateExpiryDate } from "@/utils/time-picker";

interface TimePickerProps {
  setDate: (date: Date | undefined) => void;
}

const TimePicker = ({ setDate }: TimePickerProps) => {
  const [hours, setHours] = useState<number>(1);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(24, Math.max(1, parseInt(e.target.value) || 1));
    setHours(value);
    setDate(calculateExpiryDate(value));
  };

  return (
    <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-600 rounded-md px-3 h-12">
      <Input
        id="hours"
        type="number"
        min={1}
        max={24}
        value={hours}
        onChange={handleHoursChange}
        className="w-[64px] text-center font-mono text-base tabular-nums text-slate-100 bg-transparent border-0 focus:border-0 focus:ring-0 p-0"
      />
      <span className="text-slate-300 text-sm">hours</span>
    </div>
  );
};

export default TimePicker;