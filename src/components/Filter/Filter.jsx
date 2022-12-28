import PropTypes from 'prop-types';
import { Label } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <Label>
      <span>Find contacts by name</span>

      <input type="text" value={value} onChange={onChange} />
    </Label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
