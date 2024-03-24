import { useParams } from "react-router-dom";

export function Bingo() {
  const { id } = useParams();
  return <div>Bingo {id}</div>;
}
