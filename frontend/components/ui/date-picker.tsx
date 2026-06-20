"use client";

import { useState } from "react";
import { format, parseISO, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  clearable = false,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const parsed  = value ? parseISO(value) : undefined;
  const validDate = parsed && isValid(parsed) ? parsed : undefined;

  function handleSelect(date: Date | undefined) {
    onChange(date ? format(date, "yyyy-MM-dd") : "");
    if (date) setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={(o) => setOpen(o)}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full justify-start text-left font-normal h-9 px-3",
          !validDate && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
        {validDate ? format(validDate, "dd MMM yyyy") : placeholder}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={validDate}
          onSelect={handleSelect}
        />
        {clearable && validDate && (
          <div className="border-t p-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => { onChange(""); setOpen(false); }}
            >
              Clear date
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
