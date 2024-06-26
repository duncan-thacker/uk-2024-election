import { shape, string, arrayOf } from "prop-types";

export default function ConstituencyControl({ constituency, result }) {
  const { heldBy } = constituency;
  if (!result)
    return (
      <>
        Controlled by <strong>{heldBy}</strong>
      </>
    );
  const winningParty = constituency.candidates.find(
    (c) => c.name == result.winnerName
  ).party;
  if (heldBy === winningParty)
    return (
      <>
        {heldBy} <strong>HOLD</strong>
      </>
    );
  return (
    <>
      <strong>{heldBy}</strong> lost to <strong>{winningParty}</strong>
    </>
  );
}

ConstituencyControl.propTypes = {
  constituency: shape({
    heldBy: string,
    candidates: arrayOf(
      shape({
        name: string,
      })
    ),
  }),
  result: shape({
    winnerName: string,
  }),
};
