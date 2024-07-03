import { shape, string, arrayOf } from "prop-types";

export default function ConstituencyControl({ constituency, result }) {
  const { heldBy } = constituency;
  if (!result)
    return (
      <>
        No result recorded. Controlled by <strong>{heldBy}</strong>
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
      {winningParty} <strong>GAIN</strong> from {heldBy}
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
