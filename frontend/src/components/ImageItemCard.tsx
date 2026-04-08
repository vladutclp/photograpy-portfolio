import React, { type SetStateAction } from "react";
import type { Image } from "../App";

interface ItemImageCard {
  image: Image;
  isUpdating: boolean;
  deleteImage: (imageId: number) => Promise<void>;
  setIsUpdating: React.Dispatch<SetStateAction<boolean>>;
}

const ImageItemCard: React.FC<ItemImageCard> = ({
  deleteImage,
  image,
  isUpdating,
  setIsUpdating,
}) => {
  return (
    <div
      style={{ border: "1px solid white", borderRadius: "4px" }}
      key={image.id}
    >
      <h2>{image.name}</h2>
      <p>{image.description}</p>
      <img style={{ width: "300px" }} src={image.image_url} alt="" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <button onClick={() => deleteImage(image.id)}>Delete Image</button>
        <button onClick={() => setIsUpdating((prevState) => !prevState)}>
          Update image
        </button>
      </div>
    </div>
  );
};

export default ImageItemCard;
