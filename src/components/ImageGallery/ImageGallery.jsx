import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(``);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const handleGalleryItemClick = event => {
    toggleModal();
    setModalImageUrl(
      images.find(image => image.id === Number(event.currentTarget.id))
        .largeImageURL
    );
  };

  return (
    <Gallery>
      {images.map(({ id, webformatURL, tags }) => (
        <GalleryItem
          smallImg={webformatURL}
          id={id}
          tags={tags}
          key={id}
          onClick={handleGalleryItemClick}
        />
      ))}
      {showModal && <Modal imageUrl={modalImageUrl} onClose={toggleModal} />}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
