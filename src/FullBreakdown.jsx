import getPartyBreakdown from "./getPartyBreakdown";
import useResults from "./useResults";
import "./FullBreakdown.css";
import NavMenu from "./NavMenu";
import getControlDescription from "./getControlDescription";

function getPercentage(seatCount) {
  return `${(seatCount * 100) / 650}%`;
}

const getNumerics = (b) =>
  b.diff >= 0 ? `${b.seatCount} (+${b.diff})` : `${b.seatCount} (${b.diff})`;

export default function FullBreakdown() {
  const { results } = useResults();
  const partyBreakdown = getPartyBreakdown(results);
  return (
    <div>
      <NavMenu />
      <div style={{ padding: 12 }}>
        <h1>Results so far</h1>
        <p>{getControlDescription(partyBreakdown, results.length)}</p>
        <div className="results-full-breakdown">
          {partyBreakdown.map((b) => (
            <>
              <div style={{ justifySelf: "end" }}>{b.name}</div>
              <div style={{ display: "flex", minWidth: 750 }}>
                <div
                  className="result-bar-fill"
                  style={{
                    width: getPercentage(b.seatCount),
                    backgroundColor: b.dark,
                  }}
                >
                  {b.seatCount > 200 && <>{getNumerics(b)}&nbsp;&nbsp;</>}
                </div>
                <div
                  className="result-bar-empty"
                  style={{ flex: "1 1 0", backgroundColor: "#bbb" }}
                >
                  {b.seatCount <= 200 && <>&nbsp;&nbsp;{getNumerics(b)}</>}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
