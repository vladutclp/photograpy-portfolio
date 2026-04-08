import React, { type SetStateAction } from "react";
import { API_BASE_URL, type Image } from "../App";

interface AddNewImageFormProps {
  images: Image[];
  setImages: React.Dispatch<SetStateAction<Image[]>>;
}

const AddNewImageForm: React.FC<AddNewImageFormProps> = ({
  images,
  setImages,
}) => {
  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          // const formData = new FormData();
          console.log(formData);
          console.log("event: ", event);
          const image = formData.get("image");
          console.log("image: ", image);
          const formValues = {
            name: formData.get("name"),
            description: formData.get("description"),
            image,
          };
          console.log("formValues", formValues);
          try {
            const response = await fetch(API_BASE_URL, {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              throw new Error(`HTTP Error! Status ${response.status}`);
            }

            const image = await response.json();
            console.log();
            const newImages = [...images, image];
            event.target.reset();
            setImages(newImages);
          } catch (err) {
            console.error(err);
          }
        }}
        action="POST"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "3rem",
        }}
      >
        <h2>Add new image</h2>
        <label htmlFor="name">Title</label>
        <input type="text" name="image[name]" id="name" />

        <br />

        <label htmlFor="description">Description</label>
        <textarea name="image[description]" id="description" />

        <label htmlFor="image">Image</label>
        <input type="file" name="image[image]" id="image" accept="image" />

        <br />

        <input type="submit" value="Add image" />
      </form>
    </div>
  );
};

export default AddNewImageForm;
