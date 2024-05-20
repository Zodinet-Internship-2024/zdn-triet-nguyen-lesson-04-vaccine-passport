import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";

import HomePage from "./pages/HomePage/HomePage";
import PageResult from "./pages/PageResult/PageResult";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/:id" element={<PageResult />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
