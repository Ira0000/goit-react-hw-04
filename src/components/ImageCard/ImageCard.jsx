import s from "./ImageCard.module.css";

const ImageCard = ({ image }) => {
  return (
    <div className={s.imageWrapper}>
      <img src={image.urls.small} alt={image.description} className={s.image} />
    </div>
  );
};

export default ImageCard;
