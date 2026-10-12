import FortuneView from "../components/FortuneView";
import OracleOverlay from "../components/OracleOverlay";
import { FORTUNES } from "../../../lib/fortune/data";

// Opened by the NFC tag on the box (/fortune?src=tap). The oracle runs first,
// then hands over to the fortune underneath it. Served from the edge cache and
// re-drawn in the background after each visit, so a tap never waits on a cold
// function. Visits a few seconds apart can share a fortune.
export const revalidate = 1;

export default function FortunePage() {
  const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];

  return (
    <>
      <FortuneView fortune={fortune} />
      <OracleOverlay />
    </>
  );
}
