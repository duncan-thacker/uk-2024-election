import { arrayOf, shape, string } from "prop-types";
import getPartyBreakdown from "./getPartyBreakdown";
import getControlDescription from "./getControlDescription";

export default function OverallResults({ results }) {
  const partyBreakdown = getPartyBreakdown(results);

  return (
    <div style={{ padding: 12 }}>
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
            padding: '4px 16px', borderLeft: `8px solid ${partyResult.dark}`
          };
          return (
            <li key={partyResult.name} style={style}>
              {partyResult.abr} &mdash; {partyResult.seatCount} ({diffString})
            </li>
          );
        })}
      </ul>
      <p>{getControlDescription(partyBreakdown, results.length)}</p>
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
