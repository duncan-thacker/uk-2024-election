import { shape, string, bool } from "prop-types";
import "./ConstituencySummary.css";
import { Link } from "react-router-dom";

function getSubtext(constituency, searchTerm) {
  if (searchTerm.length > 0) {
    const lower = searchTerm.toLowerCase();
    const matchesConstituencyName = constituency.name.toLowerCase().includes(lower);
    if (!matchesConstituencyName) {
      const matchingCandidate = constituency.candidates.find(c => c.name.toLowerCase().includes(lower));
      if (matchingCandidate) return matchingCandidate.name;
    }
  }
  const numCandidates = constituency.candidates.length;
  return numCandidates === 1 ? '1 candidate standing' : `${numCandidates} candidates standing`
}

export default function ConstituencySummary({ value, selected, searchTerm }) {
  const subtext = getSubtext(value, searchTerm);
  return (
    <Link
      className="constituency-summary"
      data-selected={selected}
      to={`/constituency/${value.code}`}
    >
      <div
        className="special-marker"
        data-special={value.candidates.some((c) => c.office || c.priorOffice)}
      />
      <div>
        <h3>{value.name}</h3>
        <p>{subtext}</p>
      </div>
    </Link>
  );
}

ConstituencySummary.propTypes = {
  value: shape({ name: string }),
  selected: bool,
  searchTerm: string,
};
