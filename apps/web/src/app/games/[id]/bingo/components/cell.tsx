"use client";

import { useBingo } from "@/app/games/[id]/bingo/components/bingo-context-provider";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

type Props = {
  text: string;
  onMark: (cell: string) => void;
};

export default function Cell({ text, onMark }: Props) {
  const { bingo } = useBingo();
  const history = bingo?.history || [];

  const [label, isMarkedString] = text.split("_");
  const value = label.slice(1);
  const { theme } = useTheme();
  const [marked, setMarked] = useState(isMarkedString === "1");
  const starFill = theme === "light" ? "dark-gray" : "white";
  const isClickAble = history.includes(label) && !marked;

  const onClick = () => {
    if (!isClickAble) return;

    onMark(text);
    setMarked(true);
  };

  return (
    <div
      className={cn(
        "h-14 w-14 border rounded grid place-content-center select-none",
        {
          "bg-primary/20": marked,
          "cursor-pointer": isClickAble,
        }
      )}
      onClick={onClick}
    >
      {value === "ree" ? (
        <StarIcon size={16} fill={starFill} />
      ) : (
        <p
          className={cn({
            "text-primary animate-pulse duration-100": isClickAble,
          })}
        >
          {value}
        </p>
      )}
    </div>
  );
}
