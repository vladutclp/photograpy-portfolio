import React from "react";
import { API_BASE_URL, type Image } from "../App";
import ImageItem from "./ImageItem";

interface ImageListProps {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}

const ImageList: React.FC<ImageListProps> = ({ images, setImages }) => {
  const deleteImage = async (imageId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${imageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`);
      }
      const newImages = images.filter((image) => image.id !== imageId);
      setImages(newImages);
      console.log(`Image with id ${imageId} deleted successfully`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {images.map((image) => (
        <ImageItem
          key={image.id}
          image={image}
          deleteImage={deleteImage}
          setImages={setImages}
          images={images}
        />
      ))}
    </div>
  );
};

export default ImageList;
