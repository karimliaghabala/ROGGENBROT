import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Roggenbrot from "./components/Roggenbrot"
import Weisbrot from "./components/Weisbrot"

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">

        {/* Başlıq */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-wide">
          Almanca Reseptlərin Hesablanılması
        </h1>

        {/* Linklər */}
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/roggenbrot"
                className="block w-full text-center py-3 bg-gray-800 text-white rounded-md 
                           hover:bg-gray-700 transition-all duration-200"
              >
                Roggenbrot
              </Link>
            </li>

            <li>
              <Link
                to="/weisbrot"
                className="block w-full text-center py-3 bg-gray-800 text-white rounded-md 
                           hover:bg-gray-700 transition-all duration-200"
              >
                Weißbrot
              </Link>
            </li>
          </ul>
        </div>

        {/* Marşrutlar */}
        <div className="w-full max-w-2xl mt-10">
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
