import React, { useState, type SetStateAction } from "react";
import { API_BASE_URL, type Image } from "../App";

interface ImageItemFormProps {
  image: Image;
  images: Image[];
  setImages: React.Dispatch<SetStateAction<Image[]>>;
  setIsUpdating: React.Dispatch<SetStateAction<boolean>>;

  isUpdating: boolean;
}

const ImageItemForm: React.FC<ImageItemFormProps> = ({
  images,
  setImages,
  setIsUpdating,
  image,
  isUpdating,
}) => {
  const [formData, setFormData] = useState({
    name: image.name,
    description: image.description,
  });

  const addNewImage = async (name: string, description: string) => {
    const formValues = {
      name,
      description,
    };
    console.log("formValues", formValues);
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`);
      }

      const image = await response.json();
      console.log();
      const newImages = [...images, image];
      setImages(newImages);
    } catch (err) {
      console.error(err);
    }
  };

  const updateImage = async (name: string, description: string) => {
    const formValues = {
      name: name,
      description,
    };
    console.log("formValues", formValues);
    try {
      const response = await fetch(`${API_BASE_URL}/${image.id}`, {
        method: "PATCH",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`);
      }

      const updatedImage = await response.json();
      const newImages = images.map((image) => {
        if (image.id === updatedImage.id) {
          return updatedImage;
        } else {
          return image;
        }
      });
      console.log("newImages: ", newImages);
      console.log("updatedImage: ", updatedImage);
      console.log("images: ", images);
      console.log();

      setImages([...newImages]);
      setIsUpdating(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          updateImage(formData.name, formData.description);
        }}
        action="POST"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "3rem",
        }}
      >
        <h2>{isUpdating ? "Update Image" : "Add new image"}</h2>
        <label htmlFor="name">Title</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />

        <br />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
        />

        <br />

        <div style={{ display: "flex", gap: "16px" }}>
          <input
            type="submit"
            value={isUpdating ? "Update Image" : "Add image"}
          />
          {isUpdating && (
            <button type="button" onClick={() => setIsUpdating(false)}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ImageItemForm;
