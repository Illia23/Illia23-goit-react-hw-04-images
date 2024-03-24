import { Overlay } from './Modal.styled';
import { useEffect } from 'react';

const Modal = ({ closeModal, url }) => {
 

  useEffect(() => {

    const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
      }
  };
    window.addEventListener('keydown', handleKeyDown);
  return ()=> window.removeEventListener('keydown', handleKeyDown);
    
  }, [closeModal])
  
   const handleClick = e => {
    if (e.target === e.currentTarget) {
     closeModal();
    }
  };

 

  

  

    return (
      <Overlay onClick={handleClick}>
        <img src={url} alt="modal_img" />
      </Overlay>
    );
  
}

export default Modal;