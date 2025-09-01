import { useBingo } from "@/app/games/[id]/bingo/components/bingo-context-provider";
import Progress from "@/app/games/[id]/bingo/components/progress";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function BingoHistory() {
  const historyDivRef = useRef<HTMLDivElement>(null);
  const { bingo, winnerState } = useBingo();
  const history = bingo?.history || [];

  useEffect(() => {
    if (historyDivRef.current) {
      historyDivRef.current.scrollTo({
        left: historyDivRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [history]);

  if (winnerState) return null;

  return (
    <div
      className="w-[288px] flex px-2 py-4 mb-4 gap-2 mx-auto overflow-x-auto no-scrollbar border rounded-full"
      ref={historyDivRef}
    >
      {history.length < 2 && <div className="w-12 h-12 shrink-0" />}
      {history.length < 3 && <div className="w-12 h-12 shrink-0" />}
      {history.map((item, index) => (
        <p
          key={item}
          className={cn(
            "capitalize font-semibold h-12 w-12 rounded-full border-2 shrink-0 flex justify-center items-center",
            {
              "border-primary/50 animate-bounce bg-primary/10":
                index === history.length - 1,
            }
          )}
        >
          {`${item[0]} ${item.substring(1)}`}
        </p>
      ))}
      <Progress key={history[history.length - 1]} />
      <div className="capitalize font-semibold text-xl h-12 w-12 rounded-full border-2 border-dashed shrink-0 flex justify-center items-center animate-pulse">
        ?
      </div>
      {history.length === 0 && (
        <div className="capitalize font-semibold text-xl h-12 w-12 rounded-full border-2 border-dashed shrink-0 flex justify-center items-center animate-pulse">
          ?
        </div>
      )}
    </div>
  );
}
