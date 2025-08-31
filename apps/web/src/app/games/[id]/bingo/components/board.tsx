import Cell from "@/app/games/[id]/bingo/components/cell";
import type { Board as TBoard } from "@/schema/board";

type Props = {
  board: TBoard;
};

export default function Board({ board }: Props) {
  const cells = board.cells as string[];

  return (
    <div className="flex">
      <div className="mx-auto border rounded-sm p-2">
        <div className="mb-2 grid grid-cols-5">
          <div className="text-center text-xl select-none">B</div>
          <div className="text-center text-xl select-none">I</div>
          <div className="text-center text-xl select-none">N</div>
          <div className="text-center text-xl select-none">G</div>
          <div className="text-center text-xl select-none">O</div>
        </div>
        <div className="grid grid-cols-5 grid-rows-5 grid-flow-col w-[312px] gap-2">
          {cells.map((cell, index) => (
            <Cell key={index} text={cell} />
          ))}
        </div>
      </div>
    </div>
  );
}
