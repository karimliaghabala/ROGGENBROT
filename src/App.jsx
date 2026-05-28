import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Roggenbrot from "./components/Roggenbrot";
import Weisbrot from "./components/Weisbrot";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">

        {/* HEADER */}
        <header className="w-full bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
              Brot Rezepte Rechner
            </h1>
          </div>
        </header>

        {/* NAVIGATION */}
        <nav className="w-full bg-gray-50 border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">

              <Link
                to="/roggenbrot"
                className="flex-1 sm:flex-none text-center px-6 py-3 rounded-lg bg-gray-800 text-white
                           hover:bg-gray-700 transition"
              >
                Roggenbrot
              </Link>

              <Link
                to="/weisbrot"
                className="flex-1 sm:flex-none text-center px-6 py-3 rounded-lg bg-gray-800 text-white
                           hover:bg-gray-700 transition"
              >
                Weißbrot
              </Link>

            </div>
          </div>
        </nav>

        {/* CONTENT */}
        <main className="flex-1 w-full">
          <div className="max-w-6xl mx-auto px-4 py-10">

            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-8 min-h-[60vh]">

              <Routes>
                <Route path="/roggenbrot" element={<Roggenbrot />} />
                <Route path="/weisbrot" element={<Weisbrot />} />

                {/* Default page */}
                <Route
                  path="/"
                  element={
                    <div className="text-center text-gray-600">
                      <p className="text-lg">Bir resept seç 😄</p>
                    </div>
                  }
                />
              </Routes>

            </div>
          </div>
        </main>

      </div>
    </Router>
  );
};

export default App;