import { useCallback, useState } from "react";
import CONSTITUENCIES from "./constituencyData.js";
import { useNavigate } from "react-router-dom";
import filterConstituencies from "./filterConstituencies.js";

export const INITIAL_FILTERS = {
  searchString: "",
  status: "any",
  importance: "any",
};

export default function useConstituencyFilters(selectedConstituency, results) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const filteredConstituences = filterConstituencies(CONSTITUENCIES, results, filters);
  const navigate = useNavigate();
  const handleChangeFilters = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      if (selectedConstituency) {
        const filteredConCodes = filterConstituencies(
          CONSTITUENCIES,
          results,
          newFilters
        ).map((c) => c.code);
        if (!filteredConCodes.includes(selectedConstituency.code)) {
          navigate("/");
        }
      }
    },
    [selectedConstituency, results, navigate]
  );
  return { filteredConstituences, filters, handleChangeFilters, setFilters }
}
