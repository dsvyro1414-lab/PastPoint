import { PastPointGame } from "@/features/game/PastPointGame";
import { previewSession } from "@/features/game/scene-registry";

export default function Home() {
  return <PastPointGame session={previewSession} />;
}
