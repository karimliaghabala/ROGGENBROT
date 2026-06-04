import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Roggenbrot from "./components/Roggenbrot";
import RoggenbrotA from "./components/RoggenbrotA";
import Weisbrot from "./components/Weisbrot";
import Wassertemperatur from "./components/Wassertemperatur";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">

        {/* HEADER */}
        <header className="w-full bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-3 py-4 sm:px-4 sm:py-6">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 text-center">
              Brot Rezepte Rechner (DBA 042)
            </h1>
          </div>
        </header>

        {/* NAVIGATION */}
        <nav className="w-full bg-gray-50 border-b">
          <div className="max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">

              <Link
                to="/"
                className="w-full sm:w-auto text-center px-4 py-3 rounded-lg bg-green-700 text-white
                           hover:bg-green-600 transition text-sm sm:text-base"
              >
                Zur Startseite
              </Link>

              <Link
                to="/roggenbrot"
                className="w-full sm:w-auto text-center px-4 py-3 rounded-lg bg-gray-800 text-white
                           hover:bg-gray-700 transition text-sm sm:text-base"
              >
                Roggenbrot(Manuell)
              </Link>

              <Link
                to="/roggenbrota"
                className="w-full sm:w-auto text-center px-4 py-3 rounded-lg bg-gray-800 text-white
                           hover:bg-gray-700 transition text-sm sm:text-base"
              >
                Roggenbrot(Automatisch)
              </Link>

                            <Link
                to="/wassertempuratur"
                className="w-full sm:w-auto text-center px-4 py-3 rounded-lg bg-gray-800 text-white
                           hover:bg-gray-700 transition text-sm sm:text-base"
              >
                Wassertemperatur
              </Link>

            </div>
          </div>
        </nav>

        {/* CONTENT */}
        <main className="flex-1 w-full">
          <div className="max-w-6xl mx-auto px-3 py-6 sm:px-4 sm:py-10">

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-8 min-h-[60vh]">

              <Routes>
                <Route path="/roggenbrot" element={<Roggenbrot />} />
                <Route path="/roggenbrota" element={<RoggenbrotA />} />
                <Route path="/weisbrot" element={<Weisbrot />} />
                <Route path="/wassertempuratur" element={<Wassertemperatur/>} />

                {/* Default page */}
                <Route
                  path="/"
                  element={
                    <div className="text-center text-gray-600">
                      <p className="text-lg">Lass uns berechnen, welches Brotrezept wir nehmen 😄</p>
                    </div>
                  }
                />
              </Routes>

              {/* BOTTOM HOME BUTTON */}
              <div className="mt-8 text-center">
                <Link
                  to="/"
                  className="inline-block px-5 py-3 rounded-lg bg-green-700 text-white
                             hover:bg-green-600 transition text-sm sm:text-base"
                >
                  Zur Startseite
                </Link>
              </div>

            </div>
          </div>
        </main>

      </div>
    </Router>
  );
};

export default App;