import { PastPointGame } from "@/features/game/PastPointGame";
import { scenes } from "@/features/game/scenes";

export default function Home() {
  return <PastPointGame scenes={scenes} />;
}
