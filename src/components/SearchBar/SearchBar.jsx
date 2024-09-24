import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

const SearchBar = ({ handleSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.elements.searchValue.value;
    if (form.elements.searchValue.value.trim() === "") {
      toast.error("Please write input value!");
      return;
    }
    handleSearch(searchValue);
    form.reset();
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <input
          className={s.search}
          name="searchValue"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={s.searchBtn}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
