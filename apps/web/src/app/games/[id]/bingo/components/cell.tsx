"use client";

import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Cell({ text }: { text: string }) {
  const [label, isMarkedString] = text.split("_");
  const value = label.slice(1);
  const { theme } = useTheme();
  const isMarked = isMarkedString === "1";
  const starFill = theme === "light" ? "dark-gray" : "white";

  return (
    <div
      className={cn(
        "h-14 w-14 border rounded grid place-content-center select-none",
        {
          "bg-primary/20": isMarked,
        }
      )}
    >
      {value === "ree" ? (
        <StarIcon size={16} fill={starFill} />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}
