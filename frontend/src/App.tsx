import { useEffect, useState } from "react";

interface Image {
  name: string;
  description: string;
  id: number;
}

function App() {
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
  console.log(images);
  return (
    <>
      <h1>Current DB images: </h1>
      {images.map((image) => (
        <div key={image.id}>
          <h2>{image.name}</h2>
          <p>{image.description}</p>
        </div>
      ))}
    </>
  );
}

export default App;
