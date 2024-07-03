import NavMenu from "./NavMenu";
import useResults from "./useResults"

export default function AppSettings() {
    const { resetAll, results } = useResults();
    return <div>
        <NavMenu />
        <h1>Settings</h1>
        <button disabled={results.length === 0} onClick={resetAll}>Clear all results</button>
    </div>
}