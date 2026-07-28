import { PastPointGame } from "@/features/game/PastPointGame";
import { bostonTeaPartyScene } from "@/features/game/boston-tea-party";

export default function Home() {
  return <PastPointGame scene={bostonTeaPartyScene} />;
}
