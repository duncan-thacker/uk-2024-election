import { useLocalStorage } from "@uidotdev/usehooks";

export default function useResults() {
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