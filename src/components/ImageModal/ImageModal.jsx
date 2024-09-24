import s from "./ImageModal.module.css";
import { IoCloseOutline } from "react-icons/io5";

const ImageModal = ({ closeModal, selectedImage }) => {
  return (
    <div className={s.modalWrapper}>
      <button onClick={closeModal} className={s.modalCloseBtn}>
        <IoCloseOutline className={s.modalIcon} />
      </button>
      <img
        src={selectedImage.urls.regular}
        alt={selectedImage.alt_description}
        className={s.image}
      />
      <p className={s.imageDescription}>{selectedImage.alt_description}</p>
    </div>
  );
};

export default ImageModal;
