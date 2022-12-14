import { Audio } from 'react-loader-spinner';
import { Spinner } from './Loader.styled';

export const Loader = () => {
  return (
    <Spinner>
      <Audio
        height="200"
        width="200"
        radius="9"
        color="teal"
        ariaLabel="loading"
        wrapperStyle
      />
    </Spinner>
  );
};
