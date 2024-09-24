import { useEffect, useState } from "react";
import { fetchImagesWithValue } from "./services/api";
import { Toaster } from "react-hot-toast";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Modal from "react-modal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

Modal.setAppElement("#root");
const customStyles = {
  overlay: {
    backgroundColor: "rgb(7 7 7 / 80%)",
  },
  content: {
    padding: "0",
    borderRadius: "10px",
    backgroundColor: "#3d3d3d",
  },
};

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

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

  function openModal(image) {
    setIsOpen(true);
    setSelectedImage(image);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
      <SearchBar handleSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== page && (
        <LoadMoreBtn handleChangePage={handleChangePage} />
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        images={images}
        selectedImage={selectedImage}
        style={customStyles}
      >
        <ImageModal
          closeModal={closeModal}
          images={images}
          selectedImage={selectedImage}
        />
      </Modal>
      {isError && <ErrorMessage />}
    </>
  );
}

export default App;
