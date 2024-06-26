import { useCallback, useState } from "react";
import "./ConstituencyList.css";
import CONSTITUENCIES from "./constituencyData.js";
import { useLocalStorage } from "@uidotdev/usehooks";
import ConstituencySummary from "./ConstituencySummary.jsx";
import { useNavigate, useParams } from "react-router-dom";
import ConstituencyCard from "./ConstituencyCard.jsx";
import OverallResults from "./OverallResults.jsx";

function getConstitutencies(allConstituencies, searchString) {
  if (searchString.trim().length === 0) return allConstituencies;
  const lowerSearch = searchString.toLowerCase();
  return allConstituencies.filter((constituency) => {
    return (
      constituency.name.toLowerCase().includes(lowerSearch) ||
      constituency.candidates.some((candidate) =>
        candidate.name.toLowerCase().includes(lowerSearch)
      )
    );
  });
}

function useResults() {
  const [results, saveResults] = useLocalStorage("results", []);
  return {
    results,
    addResult: (code, winnerName) =>
      saveResults((old) => [...old, { code, winnerName }]),
    resetAll: () => saveResults([]),
    resetResult: (constituencyCode) =>
      saveResults((old) => old.filter((r) => r.code !== constituencyCode)),
    getResult: (constituencyCode) =>
      results.find((r) => r.code === constituencyCode),
  };
}

export default function ConstituencyList() {
  const { results, getResult, addResult, resetResult, resetAll } = useResults();
  const { code } = useParams();
  const selectedConstituency = code
    ? CONSTITUENCIES.find((c) => c.code === code)
    : undefined;
  if (code && !selectedConstituency)
    throw new Error("Invalid constituency code: " + code);
  const [searchString, setSearchString] = useState("");
  const toDisplay = getConstitutencies(CONSTITUENCIES, searchString);
  const navigate = useNavigate();
  const handleChangeSearchString = useCallback(
    (event) => {
      const newSearchString = event.target.value;
      setSearchString(newSearchString);
      if (code) {
        const filteredConCodes = getConstitutencies(
          CONSTITUENCIES,
          newSearchString
        ).map((c) => c.code);
        if (!filteredConCodes.includes(code)) {
          navigate("/");
        }
      }
    },
    [code, navigate]
  );
  return (
    <div className="constituency-list-container">
      <div>
        <button onClick={resetAll}>reset</button>
        <OverallResults results={results} />
      </div>
      <div className="constituency-list-grid">
        <div className="constituency-list-with-search">
          <input
            id="search-box"
            placeholder="Find constituencies & candidates"
            value={searchString}
            onChange={handleChangeSearchString}
          />
          <div className="constituency-list">
            {toDisplay.map((con) => (
              <ConstituencySummary
                key={con.name}
                value={con}
                selected={con === selectedConstituency}
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
