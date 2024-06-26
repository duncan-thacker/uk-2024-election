import { shape, string, bool } from 'prop-types';
import './ConstituencySummary.css'
import { Link } from 'react-router-dom';

export default function ConstituencySummary({ value, selected }) {
  return <Link className='constituency-summary' data-selected={selected} to={`/constituency/${value.code}`}>
    <div className='special-marker' data-special={value.candidates.some(c => c.office || c.priorOffice)} />
    <h3>{ value.name }</h3>
  </Link>
}

ConstituencySummary.propTypes = {
  value: shape({ name: string }),
  selected: bool,
}
