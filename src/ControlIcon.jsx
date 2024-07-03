import "./ControlIcon.css";
import { getPartyByName } from "./parties";

export default function ControlIcon({ constituency, result }) {
  const holdingParty = getPartyByName(constituency.heldBy);
  const start = holdingParty.letter;
  const winningParty = result
    ? getPartyByName(
        constituency.candidates.find((c) => c.name == result.winnerName).party
      )
    : undefined;

  const winnerStyle = winningParty
    ? { backgroundColor: winningParty.dark, color: "#fff" }
    : {};

  const end = winningParty ? winningParty.letter : "?";
  return (
    <div className="control-icon">
      <div
        className="party-icon"
        style={{ backgroundColor: holdingParty.dark, color: "#fff" }}
      >
        {start}
      </div>
      🡒
      <div className="party-icon" style={winnerStyle}>
        {end}
      </div>
    </div>
  );
}
