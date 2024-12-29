// src/router.jsx

import { createBrowserRouter } from "react-router-dom";
//import TruckComponent from "./components/TruckComponent";
import App from "./App";
//import ListTruckComponent from "./components/ListTruckComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  /*
  {
    path: "/edittruck/:id",
    element: <TruckComponent />,
  },
  {
    path: "/deletetruck/:id/:op",
    element: <TruckComponent />,
  }, */
]);

export default router;
