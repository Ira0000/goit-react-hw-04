import { Toaster } from "react-hot-toast";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { fetchImagesWithValue } from "./services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("false");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchImagesWithValue(page, query);
        setImages((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);

  const handleSearch = (searchValue) => {
    setImages([]);
    setQuery(searchValue);
    setPage(0);
    setTotalPages(0);
  };

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
      <SearchBar handleSearch={handleSearch} />
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== page && (
        <LoadMoreBtn handleChangePage={handleChangePage} />
      )}
      {/* {isError && <h2>Something went wrong! Try again!</h2>} */}
      <h2>{totalPages}</h2>
    </>
  );
}

export default App;
