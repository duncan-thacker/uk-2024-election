import { isMatchingParty } from "./parties";

function getWinningPartyName(result, constituency) {
    const winningCandidate = constituency.candidates.find(c => c.name === result.winnerName);
    if (!winningCandidate) throw new Error('failed to find winning candidate ' + result.winnerName);
    return winningCandidate.party;
}

function isStatusMatch(statusFilter, constituency, results) {
    if (statusFilter === 'any') return true;
    const result = results.find((r) => r.code === constituency.code);
    const isDeclared = Boolean(result);
    if (statusFilter === 'declared') return isDeclared;
    if (statusFilter === 'undeclared') return !isDeclared;
    if (statusFilter.startsWith('undeclared-')) {
        if (isDeclared) return false;
        const partyCodeToCheck = statusFilter.split('-').at(-1);
        return isMatchingParty(partyCodeToCheck, constituency.heldBy);
    }

    if (!isDeclared) return false;

    const winningPartyName = getWinningPartyName(result, constituency);
    if (statusFilter.startsWith('declared-win-')) {
        const partyCodeToCheck = statusFilter.split('-').at(-1);
        return isMatchingParty(partyCodeToCheck, winningPartyName);
    }
    if (statusFilter.startsWith('declared-loss-')) {
        const partyCodeToCheck = statusFilter.split('-').at(-1);
        return !isMatchingParty(partyCodeToCheck, winningPartyName);
    }
    return false;
}

const isImportantInParty = candidate => candidate.office || candidate.priorOffice || candidate.cabinet;
const isCabinetMinister = candidate => candidate.cabinet;

function isImportanceMatch(importanceFilter, constituency) {
    if (importanceFilter === 'party') return constituency.candidates.some(isImportantInParty);
    if (importanceFilter === 'cabinet') return constituency.candidates.some(isCabinetMinister)
    // ANY
    return true;
}

export default function filterConstituencies(allConstituencies, results, filters) {
  const lowerSearch = filters.searchString.trim().toLowerCase();
  return allConstituencies.filter((constituency) => {
    const textSearchMatch =
      lowerSearch.length === 0 ||
      constituency.name.toLowerCase().includes(lowerSearch) ||
      constituency.candidates.some((candidate) =>
        candidate.name.toLowerCase().includes(lowerSearch)
      );
    if (!textSearchMatch) return false;

    const statusMatch = isStatusMatch(filters.status, constituency, results);
    if (!statusMatch) return false;

    const importanceMatch = isImportanceMatch(filters.importance, constituency);
    if (!importanceMatch) return false;
    return true;
  });
}
