import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Calendar from "./pages/Calendar";
import SeriesPortal from "./pages/SeriesPortal";
import SeriesPage from "./pages/SeriesPage";
import IssuesPortal from "./pages/IssuesPortal";
import IssueLayout from "./pages/IssueLayout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/series/:series_id" element={<SeriesPage />} />
        <Route path="/series-portal" element={<SeriesPortal />} />
        <Route path="/issue/:issue_id" element={<IssueLayout />} />
        <Route path="/issues-portal/:series_id" element={<IssuesPortal />} />
      </Routes>
      <p style={{ textAlign: "center" }}>
        Data provided by Marvel.{" "}
        <a
          href="https://www.marvel.com/"
          style={{ color: " #c92427" }}
          target="_blank"
        >
          ©2014 Marvel
        </a>
      </p>
    </BrowserRouter>
  );
}

export default App;
