import PlayerInfo from "@/app/games/[id]/components/player-info";
import type { Player } from "@/schema/player";

type Props = {
  gameId: string;
  hostId: string;
  players: Player[];
};

export default function PlayerList({ gameId, hostId, players }: Props) {
  // const [playerList, setPlayerList] = useState(players);

  // useEffect(() => {
  //   const channel = pusherClient.subscribe(`game-${gameId}`);

  //   channel.bind("player-joined", ({ data }: { data: Player }) => {
  //     const exists = playerList.find((p) => p.id === data.id);

  //     if (exists) return;

  //     setPlayerList((prev) => [...prev, data]);
  //   });
  // }, [gameId]);

  return (
    <div className="w-full flex justify-center gap-4 overflow-x-auto">
      {players.map((player) => (
        <PlayerInfo key={player.id} hostId={hostId} player={player} />
      ))}
    </div>
  );
}
