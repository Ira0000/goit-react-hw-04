import { Toaster } from "react-hot-toast";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { fetchImagesWithValue } from "./services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setIsError] = useState("false");

  // console.log(images);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      try {
        setIsError(false);
        const data = await fetchImagesWithValue(query);
        setImages((prev) => [...prev, ...data.results]);
      } catch {
        setIsError(true);
      } finally {
        console.log("complete");
      }
    };

    fetchImages();
  }, [query]);

  const handleSearch = (searchValue) => {
    setQuery(searchValue);
    console.log(searchValue);
  };

  return (
    <>
      <div>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
      <SearchBar handleSearch={handleSearch} />
      <ImageGallery images={images} />
    </>
  );
}

export default App;
