import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleChangePage }) => {
  return (
    <div className={s.loadMoreWrapper}>
      <button
        onClick={handleChangePage}
        type="button"
        className={s.loadMoreBtn}
      >
        Show more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
