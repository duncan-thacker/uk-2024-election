import { shape, string, arrayOf, func } from 'prop-types';
import './ConstituencyCard.css'
import ConstituencyControl from './ConstituencyControl';

export default function ConstituencyCard({ value, result, onAddResult, onClearResult }) {
  const { name, heldBy, candidates } = value;
  const notes = [value.notes, ...candidates.map(c => c.notes)].filter(Boolean);
  return (
    <div className='constituency-card'>
      <h1>{ name }</h1>
      <div className='constituency-status'>
        <p>
          <ConstituencyControl constituency={value} result={result} onClearResult={onClearResult} />
        </p>
        {result ? <button onClick={onClearResult}>Clear result</button> : <span />}
      </div>
      {notes.map(n => <p key={n}><em>{n}</em></p>)}
      <table>
        <thead>
          <tr>
            <th>Candidate name</th>
            <th>Party</th>
          </tr>
        </thead>
        <tbody>
        {candidates.map((cand) => {
            const office = cand.office ?? cand.priorOffice;
            return <tr key={cand.id} data-winner={result?.winnerName === cand.name} data-incumbent={cand.party === heldBy}>
                <td><div>{cand.name}</div>{office && <div>{office}</div>}</td>
                <td>{cand.party}</td>
                {!result && <td><button className='record-winner-btn' onClick={() => onAddResult(cand.name)}><span>Record winner</span></button></td>}
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
