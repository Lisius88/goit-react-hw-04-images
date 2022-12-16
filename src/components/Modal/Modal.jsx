import { BackDrop, OurModal } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector(`#modal-root`);

export const Modal = ({ onClose, imageUrl }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
      }
      onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleCloseOnClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };

  return createPortal(
    <BackDrop onClick={handleCloseOnClick}>
      <OurModal>
        <img src={imageUrl} alt="" />
      </OurModal>
    </BackDrop>,
    modalRoot
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
