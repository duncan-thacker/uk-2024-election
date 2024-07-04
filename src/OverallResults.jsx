import { arrayOf, shape, string } from "prop-types";
import getPartyBreakdown from "./getPartyBreakdown";
import getControlDescription from "./getControlDescription";

export default function OverallResults({ results }) {
  const partyBreakdown = getPartyBreakdown(results);

  return (
    <div style={{ padding: "0px 16px" }}>
      <ul
        style={{
          padding: 0,
          margin: "12px 0px",
          display: "flex",
          alignItems: "center",
          listStyleType: "none",
          justifyItems: 'center',
        }}
      >
        {partyBreakdown.map((partyResult) => {
          const diff = partyResult.diff;
          const diffString = diff >= 0 ? `+${diff}` : diff;
          const style = {
            padding: 4, borderLeft: `10px solid ${partyResult.dark}`, width: 175
          };
          return (
            <li key={partyResult.name} style={style}>
              {partyResult.abr} &mdash; {partyResult.seatCount} ({diffString})
            </li>
          );
        })}
      </ul>
      <p style={{ margin: 0, marginTop: 12 }}>{getControlDescription(partyBreakdown, results.length)}</p>
    </div>
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
