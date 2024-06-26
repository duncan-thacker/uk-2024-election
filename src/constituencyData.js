import TACTICAL_CONSTITUENCIES from './assets/tactical-vote.json';
import CANDIDATES from './assets/candidates.json';

function getCandidates(constituencyName) {
    return CANDIDATES.filter(candidate => candidate.constituency === constituencyName);
}

const CONSTITUENCES = Object.entries(TACTICAL_CONSTITUENCIES).map(([key, tacticalConsituency]) => ({
    name: tacticalConsituency.constituency,
    heldBy: tacticalConsituency.winner_2019,
    code: key,
    candidates: getCandidates(tacticalConsituency.constituency)
  }))

const withNoCandidates = CONSTITUENCES.filter(c => c.candidates.length === 0);
if (withNoCandidates.length > 0) {
    throw new Error('The following constituencies have no candidates: ' + withNoCandidates.map(c => `"${c.name}"`).join(', '));
}

const withNoConstituency = CANDIDATES.filter(c => !CONSTITUENCES.find(con => con.name === c.constituency));

if (withNoConstituency.length > 0) {
    throw new Error('The following candidates do not have a valid constituency: ' + withNoConstituency.map(c => `"${c.name}, ${c.party}"`))
}

export default CONSTITUENCES;