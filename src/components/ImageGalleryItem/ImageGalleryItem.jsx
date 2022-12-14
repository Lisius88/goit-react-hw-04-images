import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';

export const GalleryItem = ({ smallImg, id, tags, onClick }) => {
  return (
    <Item id={id} onClick={onClick}>
      <Img src={smallImg} alt={tags} width="500px" height="350px" />
    </Item>
  );
};

GalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
