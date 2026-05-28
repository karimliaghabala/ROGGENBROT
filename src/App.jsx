import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Roggenbrot from "./components/Roggenbrot"
import Weisbrot from "./components/Weisbrot"

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">

        {/* Başlıq */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-wide text-center">
          Brot Rezepte Rechner
        </h1>

        {/* Linklər konteyneri */}
        <div className="
          w-full 
          max-w-[90%]        /* Kompüterdə 90% */
          md:max-w-3xl       /* Orta ekranlarda geniş */
          bg-white 
          shadow-lg 
          rounded-xl 
          p-8
        ">
          <ul className="space-y-4">
            <li>
              <Link
                to="/roggenbrot"
                className="block w-full text-center py-3 bg-gray-800 text-white rounded-md 
                           hover:bg-gray-700 transition-all duration-200 text-lg"
              >
                Roggenbrot
              </Link>
            </li>

            <li>
              <Link
                to="/weisbrot"
                className="block w-full text-center py-3 bg-gray-800 text-white rounded-md 
                           hover:bg-gray-700 transition-all duration-200 text-lg"
              >
                Weißbrot
              </Link>
            </li>
          </ul>
        </div>

        {/* Marşrutlar */}
        <div className="
          w-full 
          max-w-[90%] 
          md:max-w-4xl 
          mt-10
        ">
          <Routes>
            <Route path="/roggenbrot" element={<Roggenbrot />} />
            <Route path="/weisbrot" element={<Weisbrot />} />
          </Routes>
        </div>

      </div>
    </Router>
  )
}

export default App
