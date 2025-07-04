
"use client";
import { useState } from "react";

type DarkDatePickerProps = {
  label?: string;
  onDateSelect: (date: string) => void;
};

export const DarkDatePicker = ({ label, onDateSelect }: DarkDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value).toISOString();
    setSelectedDate(e.target.value);
    onDateSelect(date);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-neutral-100">{label}</label>}
      <input
        type="date"
        value={selectedDate}
        onChange={handleChange}
        className="bg-neutral-900 text-neutral-100 border border-neutral-800 rounded p-2 focus:outline-none focus:ring-2 focus:ring-neutral-800"
      />
    </div>
  );
};
