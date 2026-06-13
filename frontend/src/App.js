import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0B1F2A",
            color: "#F1EFE7",
            border: "2px solid #C1442D",
            borderRadius: 0,
            fontFamily: "IBM Plex Mono, monospace",
          },
        }}
      />
    </div>
  );
}

export default App;
