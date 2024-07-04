import NavMenu from "./NavMenu";
import useResults from "./useResults";

export default function AppSettings() {
  const { resetAll, results } = useResults();
  return (
    <div>
      <NavMenu />
      <div style={{ padding: 12 }}>
        <h1>Settings</h1>
        <p>All the results you record are stored on your computer/phone.</p>
        <button disabled={results.length === 0} onClick={resetAll}>
          Clear all results
        </button>
        <h1>About the app</h1>
        <p>
          This application was developed in about 2 days by Atropos Technologies
          Ltd. We do high quality webapps for businesses and public
          organisations. If you're interested in our work, please contact our
          Head of Everything{" "}
          <a href="mailto:duncan.thacker@atropos.co.uk">Duncan Thacker</a>.
        </p>
        <h1>Data</h1>
        <p>
          The constituency and candidate data is amalgamated from{" "}
          <a href="https://tactical.vote/">tactical.vote</a> and{" "}
          <a href="https://democracyclub.org.uk/data_apis/data/">
            democracyclub.org.uk
          </a>
          .
        </p>
        <h1>Cookies</h1>
        <p>This application does not use cookies!</p>
      </div>
    </div>
  );
}
