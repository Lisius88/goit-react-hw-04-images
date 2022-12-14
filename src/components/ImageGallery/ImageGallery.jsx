import { Component } from 'react';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    showModal: false,
    modalImageUrl: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleGalleryItemClick = event => {
    const { images } = this.props;

    this.toggleModal();
    this.setState({
      modalImageUrl: images.find(
        image => image.id === Number(event.currentTarget.id)
      ).largeImageURL,
    });
  };

  render() {
    const { images } = this.props;
    return (
      <Gallery>
        {images.map(({ id, webformatURL, tags }) => (
          <GalleryItem
            smallImg={webformatURL}
            id={id}
            tags={tags}
            key={id}
            onClick={this.handleGalleryItemClick}
          />
        ))}
        {this.state.showModal && (
          <Modal
            imageUrl={this.state.modalImageUrl}
            onClose={this.toggleModal}
          />
        )}
      </Gallery>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
