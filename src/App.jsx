import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListTruckComponent from "./components/ListTruckComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TruckComponent from "./components/TruckComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:3000 */}
          <Route
            path="/"
            element={<ListTruckComponent />}
          ></Route>
          {/* //http://localhost:3000/trucks */}
          <Route
            path="/trucks"
            element={<ListTruckComponent />}
          ></Route>
          {/* //http://localhost:3000/add-truck */}
          <Route
            path="/add-truck"
            element={<TruckComponent />}
          ></Route>
          {/* //http://localhost:3000/edit-truck/1 */}
          <Route
            path="/edit-truck/:id"
            element={<TruckComponent />}
          ></Route>
        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
