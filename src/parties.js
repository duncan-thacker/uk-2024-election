import CONSTITUENCIES from "./constituencyData.js";

export const MAIN_PARTIES = [
  { name: "Conservative and Unionist Party", abr: "CON", startingSeats: 0, dark: '#096d92' },
  { name: "Labour Party", abr: "LAB", startingSeats: 0, dark: '#920943' },
  { name: "Liberal Democrats", abr: "LDM", startingSeats: 0, dark: '#925609' },
  { name: "Scottish National Party (SNP)", abr: "SNP", startingSeats: 0, dark: '#928909' },
  { name: "Green Party", abr: "GRN", startingSeats: 0, dark: '#219209' },
  { name: "Reform UK", abr: "REF", startingSeats: 0, dark: '#098c92' },
  { name: "Other", abr: "OTH", startingSeats: 0, dark: '#444' },
];

CONSTITUENCIES.forEach((c) => {
  const party =
    MAIN_PARTIES.find((p) => p.name === c.heldBy) ?? MAIN_PARTIES.at(-1);
  party.startingSeats++;
});

export const isMajorPartyName = (partyName) => partyName !== 'other' && MAIN_PARTIES.some(p => p.name === partyName);

export function getPartyByCode(code) {
  const party = MAIN_PARTIES.find(
    (p) => p.abr.toLowerCase() === code.toLowerCase()
  );
  if (!party) throw new Error("No such party with code " + code);
  return party;
}

export function isMatchingParty(code, partyName) {
  const party = getPartyByCode(code);
  console.log(code, partyName, party, isMajorPartyName(partyName), partyName === party.name);
  if (isMajorPartyName(partyName)) {
    return partyName === party.name;
  }
  return code.toLowerCase() === 'oth';
}
