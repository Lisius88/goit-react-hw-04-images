import PropTypes from 'prop-types';
import { Load, ButtonContainer } from './Button.styled';

export const Button = ({ onClick }) => (
  <ButtonContainer>
    <Load onClick={onClick} type="button">
      Next
    </Load>
  </ButtonContainer>
);

export const ButtonPerv = ({ onClick }) => (
  <ButtonContainer>
    <Load onClick={onClick} type="button">
      Previous
    </Load>
  </ButtonContainer>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

ButtonPerv.propTypes = {
  onClick: PropTypes.func.isRequired,
};
