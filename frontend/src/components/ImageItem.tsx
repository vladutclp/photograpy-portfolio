import React, { useState } from "react";
import type { Image } from "../App";
import ImageItemCard from "./ImageItemCard";
import ImageItemForm from "./ImageItemForm";

interface ImageItemProps {
  image: Image;
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;

  deleteImage: (imageId: number) => Promise<void>;
}

const ImageItem: React.FC<ImageItemProps> = ({
  image,
  images,
  deleteImage,
  setImages,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  console.log("isUpdating", isUpdating);
  return isUpdating ? (
    <ImageItemForm
      image={image}
      images={images}
      isUpdating
      setImages={setImages}
      setIsUpdating={setIsUpdating}
    />
  ) : (
    <ImageItemCard
      deleteImage={deleteImage}
      image={image}
      isUpdating={isUpdating}
      setIsUpdating={setIsUpdating}
    />
  );
};

export default ImageItem;
