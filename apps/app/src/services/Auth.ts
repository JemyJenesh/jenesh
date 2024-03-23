import { Player } from "@/store";
import Storage from "./Storage";

class Auth {
  key = "auth";

  getPlayerData() {
    return Storage.get<Player>(this.key);
  }

  setPlayerData(data: Player) {
    Storage.set(this.key, data);
  }
}

export default new Auth();
