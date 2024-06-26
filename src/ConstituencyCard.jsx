import { shape, string, arrayOf, func } from 'prop-types';
import './ConstituencyCard.css'
import ConstituencyControl from './ConstituencyControl';

export default function ConstituencyCard({ value, result, onAddResult, onClearResult }) {
  const { name, heldBy, candidates } = value;
  return (
    <div className='constituency-card'>
      <h1>{name}</h1>
      <p>
        <ConstituencyControl constituency={value} result={result} />
      </p>
      <table>
        <thead>
          <th>Candidate name</th>
          <th>Party</th>
        </thead>
        <tbody>
        {candidates.map((cand) => {
            return <tr key={cand.id} data-winner={result?.winnerName === cand.name} data-incumbent={cand.party === heldBy}>
                <td>{cand.name}</td>
                <td>{cand.party}</td>
                {!result && <td><button onClick={() => onAddResult(cand.name)}>Wins!</button></td>}
                {result?.winnerName === cand.name && <td><button onClick={onClearResult}>Reset</button></td>}
            </tr>
        })}
        </tbody>
      </table>
    </div>
  );
}

ConstituencyCard.propTypes = {
  value: shape({
    heldBy: string,
    candidates: arrayOf(shape({
      name: string,
      party: string
    }))
  }).isRequired,
  result: shape({
    winnerName: string
  }),
  onAddResult: func.isRequired,
  onClearResult: func.isRequired
}
