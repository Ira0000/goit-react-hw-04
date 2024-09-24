import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.galleryList}>
      {images.map((image) => (
        <li
          key={image.id}
          className={s.galleryItem}
          onClick={() => openModal(image)}
          id={image.id}
        >
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
