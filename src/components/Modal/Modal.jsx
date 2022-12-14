import { BackDrop, OurModal } from './Modal.styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector(`#modal-root`);

export class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
    }
    this.props.onClose();
  };

  handleCloseOnClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.props.onClose();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { imageUrl } = this.props;
    const { handleCloseOnClick } = this;
    return createPortal(
      <BackDrop onClick={handleCloseOnClick}>
        <OurModal>
          <img src={imageUrl} alt="" />
        </OurModal>
      </BackDrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
