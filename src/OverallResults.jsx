import { arrayOf, shape, string } from "prop-types";
import CONSTITUENCIES from "./constituencyData.js";

const MAIN_PARTIES = [
  { name: "Conservative and Unionist Party", abr: "CON", startingSeats: 0 },
  { name: "Labour Party", abr: "LAB", startingSeats: 0 },
  { name: "Liberal Democrats", abr: "LDM", startingSeats: 0 },
  { name: "Scottish National Party (SNP)", abr: "SNP", startingSeats: 0 },
  { name: "Green Party", abr: "GRN", startingSeats: 0 },
  { name: "Reform UK", abr: "REF", startingSeats: 0 },
  { name: "Other", abr: "OTH", startingSeats: 0 },
];

CONSTITUENCIES.forEach((c) => {
  const party =
    MAIN_PARTIES.find((p) => p.name === c.heldBy) ?? MAIN_PARTIES.at(-1);
  party.startingSeats++;
});

function getPartyBreakdown(results) {
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

export default function OverallResults({ results }) {
  const partyBreakdown = getPartyBreakdown(results);

  return (
    <ul
      style={{
        display: "flex",
        alignItems: "center",
        listStyleType: "none",
        justifyItems: 'center',
      }}
    >
      {partyBreakdown.map((partyResult) => {
        const diff = partyResult.diff;
        const diffString = diff >= 0 ? `+${diff}` : diff;
        return (
          <li key={partyResult.name} style={{ padding: '4px 16px', borderLeft: '1px solid #aaa'}}>
            {partyResult.abr} &mdash; {partyResult.seatCount} ({diffString})
          </li>
        );
      })}
    </ul>
  );
}

OverallResults.propTypes = {
  results: arrayOf(
    shape({
      winnerName: string,
      code: string,
    })
  ).isRequired,
};
