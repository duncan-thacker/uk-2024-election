import { shape, string, bool } from "prop-types";
import "./ConstituencySummary.css";
import { Link } from "react-router-dom";
import ControlIcon from "./ControlIcon";

function getSubtext(constituency, searchTerm) {
  if (searchTerm.length > 0) {
    const lower = searchTerm.toLowerCase();
    const matchesConstituencyName = constituency.name
      .toLowerCase()
      .includes(lower);
    if (!matchesConstituencyName) {
      const matchingCandidate = constituency.candidates.find((c) =>
        c.name.toLowerCase().includes(lower)
      );
      if (matchingCandidate) return matchingCandidate.name;
    }
  }
  const numCandidates = constituency.candidates.length;
  return numCandidates === 1
    ? "1 candidate standing"
    : `${numCandidates} candidates standing`;
}

export default function ConstituencySummary({
  value,
  selected,
  searchTerm,
  result,
}) {
  const subtext = getSubtext(value, searchTerm);
  const isSpecial = value.candidates.some((c) => c.office || c.priorOffice);
  return (
    <Link
      className="constituency-summary"
      data-selected={selected}
      to={`/constituency/${value.code}`}
    >
      <ControlIcon constituency={value} result={result} />
      <div>
        <h3>{value.name}</h3>
        <p>{subtext}</p>
      </div>
      <div className="special-marker" data-special={isSpecial}>
        {isSpecial ? "★" : ""}
      </div>
    </Link>
  );
}

ConstituencySummary.propTypes = {
  value: shape({ name: string }),
  selected: bool,
  searchTerm: string,
  result: shape({}),
};
