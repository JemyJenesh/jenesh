import axios from "axios";
import Auth from "./Auth";

const player = Auth.getPlayerData();
axios.defaults.headers.common["Authorization"] = player
  ? JSON.stringify(player)
  : "";

export default axios;
