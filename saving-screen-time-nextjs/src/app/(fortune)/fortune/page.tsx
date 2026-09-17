import FortuneView from "../components/FortuneView";
import { FORTUNES } from "../../../lib/fortune/data";

// Opened by the NFC tag on the box (/fortune?src=tap). Served from the edge
// cache and re-drawn in the background after each visit, so a tap never waits
// on a cold function. Visits a few seconds apart can share a fortune.
export const revalidate = 1;

export default function FortunePage() {
  const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  return <FortuneView fortune={fortune} />;
}
