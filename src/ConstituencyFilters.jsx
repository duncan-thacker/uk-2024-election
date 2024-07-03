import { useCallback } from "react";
import { shape, string, func, oneOf } from "prop-types";
import "./ConstituencyFilters.css";

export default function ConstituencyFilters({ value, onChange }) {
  const handlePatch = useCallback(
    (patch) => {
      onChange({ ...value, ...patch });
    },
    [onChange, value]
  );
  return (
    <div className="constituency-filters">
      <input
        placeholder="Find constituencies & candidates"
        value={value.searchString}
        onChange={(evt) => handlePatch({ searchString: evt.target.value })}
      />
      <div className="selects">
        <select
          name="status"
          value={value.status}
          style={{ fontFamily: "Josefin Sans", fontSize: 20 }}
          onChange={(evt) => handlePatch({ status: evt.target.value })}
        >
          <option value="any">Declared and undeclared</option>
          <option value="declared">All declared</option>
          <option value="undeclared">All undeclared</option>
          <option value="declared-win-con">Declared Conservative win</option>
          <option value="declared-win-lab">Declared Labour win</option>
          <option value="declared-win-ldm">
            Declared Liberal Democrat win
          </option>
          <option value="declared-win-snp">Declared SNP win</option>
          <option value="declared-win-grn">Declared Green win</option>
          <option value="declared-win-ref">Declared Reform win</option>
          <option value="declared-win-oth">Declared Other win</option>
          <option value="declared-loss-con">Declared Conservative loss</option>
          <option value="declared-loss-lab">Declared Labour loss</option>
          <option value="declared-loss-ldm">
            Declared Liberal Democrat loss
          </option>
          <option value="declared-loss-snp">Declared SNP loss</option>
          <option value="declared-loss-grn">Declared Green loss</option>
          <option value="declared-loss-ref">Declared Reform loss</option>
          <option value="declared-loss-oth">Declared Other loss</option>
          <option value="declared-loss-con">Undeclared Conservative</option>
          <option value="undeclared-lab">Undeclared Labour</option>
          <option value="undeclared-ldm">Undeclared Liberal Democrat</option>
          <option value="undeclared-snp">Undeclared SNP</option>
          <option value="undeclared-grn">Undeclared Green</option>
          <option value="undeclared-ref">Undeclared Reform</option>
          <option value="undeclared-oth">Undeclared Other</option>
        </select>
        <select
          name="importance"
          value={value.importance}
          style={{ fontFamily: "Josefin Sans", fontSize: 20 }}
          onChange={(evt) => handlePatch({ importance: evt.target.value })}
        >
          <option value="any">Any importance</option>
          <option value="cabinet">Cabinet ministers</option>
          <option value="party">Important party figures</option>
        </select>
      </div>
    </div>
  );
}

ConstituencyFilters.propTypes = {
  value: shape({
    searchString: string,
    status: oneOf(["any", "declared", "undeclared"]),
  }).isRequired,
  onChange: func.isRequired,
};
