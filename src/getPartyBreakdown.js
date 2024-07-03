import CONSTITUENCIES from "./constituencyData.js";
import { MAIN_PARTIES } from "./parties.js";

export default function getPartyBreakdown(results) {
  const breakdown = MAIN_PARTIES.map((p) => ({ ...p, seatCount: 0, diff: 0 }));
  const otherPartyBreakdown = breakdown.at(-1);
  results.forEach((result) => {
    const con = CONSTITUENCIES.find((c) => c.code === result.code);
    if (!con)
      throw new Error('No constituency found with code "' + result.code + '"');
    const candidate = con.candidates.find((c) => c.name === result.winnerName);
    if (!candidate)
      throw new Error(
        'No candidate found with name "' +
          result.winnerName +
          "' in constituency '" +
          con.name +
          '"'
      );
    const winningPartyBreakdown =
      breakdown.find((b) => b.name === candidate.party) ?? otherPartyBreakdown;
    const heldPartyBreakdown = breakdown.find((b) => b.name === con.heldBy) ?? otherPartyBreakdown;
    if (!winningPartyBreakdown) throw new Error("no breakdown exists for party " + candidate.party);
    if (!heldPartyBreakdown) throw new Error("no breakdown exists for party " + con.heldBy);
    
    winningPartyBreakdown.seatCount++;
    winningPartyBreakdown.diff++;
    heldPartyBreakdown.diff--;
  });
  return breakdown;
}