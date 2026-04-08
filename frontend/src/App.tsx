import ImageAdminDashboard from "./pages/ImageAdminDashboard";

export interface Image {
  name: string;
  description: string;
  id: number;
  image_url?: string;
}
export const API_BASE_URL = "http://localhost:3000/images";

/*

TODO: 
- Add react router
- Create admin page

*/

function App() {
  return (
    <>
      <ImageAdminDashboard />
    </>
  );
}

export default App;
