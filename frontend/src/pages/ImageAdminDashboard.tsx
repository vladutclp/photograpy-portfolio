import React, { useEffect, useState } from "react";
import AddNewImageForm from "../components/AddNewImageForm";
import ImageList from "../components/ImageList";
import type { Image } from "../App";

const ImageAdminDashboard: React.FC = () => {
  useEffect(() => {
    const fetchImages = async () => {
      const url = "http://localhost:3000/images";
      try {
        const response = await fetch(url);
        response.json().then((res) => setImages(res));
      } catch (err) {
        console.error("Something went wrong: ", err);
      }
    };

    fetchImages();
  }, []);

  const [images, setImages] = useState<Image[]>([]);
  console.log("images: ", images);
  return (
    <div>
      <AddNewImageForm images={images} setImages={setImages} />
      <ImageList images={images} setImages={setImages} />
    </div>
  );
};

export default ImageAdminDashboard;
