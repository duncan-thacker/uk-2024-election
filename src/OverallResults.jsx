import { arrayOf, shape, string } from "prop-types";
import getPartyBreakdown from "./getPartyBreakdown";
import getControlDescription from "./getControlDescription";

export default function OverallResults({ results }) {
  const partyBreakdown = getPartyBreakdown(results);

  return (
    <div>
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
