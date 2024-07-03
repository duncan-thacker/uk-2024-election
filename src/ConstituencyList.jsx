import CONSTITUENCIES from "./constituencyData.js";
import ConstituencySummary from "./ConstituencySummary.jsx";
import { useParams } from "react-router-dom";
import ConstituencyCard from "./ConstituencyCard.jsx";
import OverallResults from "./OverallResults.jsx";
import ConstituencyFilters from "./ConstituencyFilters.jsx";
import useResults from "./useResults.js";
import NavMenu from "./NavMenu.jsx";
import useConstituencyFilters, {
  INITIAL_FILTERS,
} from "./useConstituencyFilters.js";
import "./ConstituencyList.css";

export default function ConstituencyList() {
  const { code } = useParams();
  const selectedConstituency = code
    ? CONSTITUENCIES.find((c) => c.code === code)
    : undefined;
  if (code && !selectedConstituency)
    throw new Error("Invalid constituency code: " + code);

  const { results, getResult, addResult, resetResult } = useResults();
  const { filteredConstituences, filters, handleChangeFilters } =
    useConstituencyFilters(selectedConstituency, results);

  return (
    <div className="constituency-list-container">
      <NavMenu />
      <OverallResults results={results} />
      <div className="constituency-list-grid">
        <div className="constituency-list-with-search">
          <ConstituencyFilters value={filters} onChange={handleChangeFilters} />
          <div className="constituency-count">
            {filteredConstituences.length === 0 ? (
              <>
                <em>No constituencies match your filters</em>{" "}
                <button onClick={() => handleChangeFilters(INITIAL_FILTERS)}>
                  Clear filters
                </button>
              </>
            ) : (
              <em>Showing {filteredConstituences.length} out of 650 seats</em>
            )}
          </div>
          <div className="constituency-list">
            {filteredConstituences.map((con) => (
              <ConstituencySummary
                key={con.name}
                value={con}
                selected={con === selectedConstituency}
                searchTerm={filters.searchString}
                result={getResult(con.code)}
              />
            ))}
          </div>
        </div>
        {selectedConstituency && (
          <ConstituencyCard
            value={selectedConstituency}
            result={getResult(selectedConstituency.code)}
            onAddResult={(winnerName) =>
              addResult(selectedConstituency.code, winnerName)
            }
            onClearResult={() => resetResult(selectedConstituency.code)}
          />
        )}
      </div>
    </div>
  );
}
