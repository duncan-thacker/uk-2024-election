const TOTAL_SEATS = 650;
const OVERALL_CONTROL_THRESHOLD = 326;

export default function getControlDescription(breakdown, numberOfSeatsDeclared) {
  const partyWithOverallControl = breakdown.find(b => b.seatCount >= OVERALL_CONTROL_THRESHOLD);
  if (partyWithOverallControl) return `${partyWithOverallControl.name} has overall control, with a majority of ${partyWithOverallControl.seatCount - OVERALL_CONTROL_THRESHOLD}`;
  const undeclaredSeats = TOTAL_SEATS - numberOfSeatsDeclared;
  const hungParliament = breakdown.every(b => {
    const cannotGetOverallControl = b.seatCount + undeclaredSeats < OVERALL_CONTROL_THRESHOLD;
    return cannotGetOverallControl;
  });
  if (hungParliament) return "Hung parliament - no party can gain an overall majority";
  return `No party has overall control — ${undeclaredSeats} constituencies are still undeclared.`;
}