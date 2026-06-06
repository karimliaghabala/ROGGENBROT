import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Roggenbrot from "./components/Roggenbrot";
import RoggenbrotA from "./components/RoggenbrotA";
import Weisbrot from "./components/Weisbrot";
import Wassertemperatur from "./components/Wassertemperatur";

const App = () => {
  const [showMore, setShowMore] = useState(false);

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
                className="w-full sm:w-auto text-center px-4 py-3 rounded-lg bg-green-700 text-white hover:bg-green-600 transition text-sm sm:text-base"
              >
                Zur Startseite
              </Link>

              <Link
                to="/roggenbrot"
                className="w-full sm:w-auto text-center px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition text-sm sm:text-base"
              >
                Roggenbrot(Manuell)
              </Link>

              <Link
                to="/roggenbrota"
                className="w-full sm:w-auto text-center px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition text-sm sm:text-base"
              >
                Roggenbrot(Automatisch)
              </Link>

              <Link
                to="/wassertempuratur"
                className="w-full sm:w-auto text-center px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition text-sm sm:text-base"
              >
                Wassertemperatur
              </Link>

              <Link
                to="/weisbrot"
                className="w-full sm:w-auto text-center px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition text-sm sm:text-base"
              >
                Weisbrot Resepturmenge
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
                <Route
                  path="/wassertempuratur"
                  element={<Wassertemperatur />}
                />

                {/* Default page */}
                <Route
                  path="/"
                  element={
                    <section className="overflow-hidden rounded-2xl bg-amber-50 ">
                      <div className="relative min-h-[80vh] overflow-hidden p-4">
                        <img
                          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=80"
                          alt="Frisch gebackenes deutsches Brot"
                          className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/55" />

                        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
                          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                            Deutsche Backkunst
                          </p>

                          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl p-2 ">
                            Die Geschichte des deutschen B&auml;ckerhandwerks
                          </h1>

                          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-100 md:text-xl">
                            Das deutsche B&auml;ckerhandwerk hat eine
                            jahrhundertealte Tradition. Schon im Mittelalter war
                            Brot ein wichtiger Bestandteil des t&auml;glichen
                            Lebens. Aus Roggen, Weizen und Sauerteig entstanden
                            regionale Brotsorten, die bis heute f&uuml;r
                            Qualit&auml;t, Vielfalt und echten Geschmack stehen.
                          </p>

                          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-200 md:text-lg">
                            Heute gilt Deutschland als eines der L&auml;nder mit
                            der gr&ouml;&szlig;ten Brotvielfalt der Welt.
                            Besonders bekannt sind Roggenbrot, Brezeln,
                            Vollkornbrot und Brote mit Saaten.
                          </p>

                          <button
                            onClick={() => setShowMore(!showMore)}
                            className="mt-8 rounded-full bg-amber-500 px-8 py-3 font-semibold text-amber-950 transition hover:bg-amber-400"
                          >
                            {showMore ? "Weniger anzeigen" : "Mehr erfahren"}
                          </button>
                        </div>
                      </div>

                      <div
                        className={`transition-all duration-700 ease-in-out ${
                          showMore
                            ? "max-h-[900px] opacity-100"
                            : "max-h-0 opacity-0"
                        } overflow-hidden`}
                      >
                        <div className="grid gap-5 bg-amber-50 px-5 py-8 text-gray-800 md:grid-cols-3 md:px-10">
                          <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h2 className="mb-3 text-xl font-bold text-amber-900">
                              Mittelalterliche Tradition
                            </h2>
                            <p className="leading-7">
                              Im Mittelalter entstanden in deutschen St&auml;dten
                              erste B&auml;ckerz&uuml;nfte. Sie regelten die
                              Qualit&auml;t des Brotes, die Ausbildung der
                              B&auml;cker und die Arbeit in den Backstuben.
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h2 className="mb-3 text-xl font-bold text-amber-900">
                              Sauerteig und Roggen
                            </h2>
                            <p className="leading-7">
                              Roggenbrot und Sauerteig geh&ouml;ren zu den
                              wichtigsten Merkmalen der deutschen Brotkultur.
                              Der Sauerteig gibt dem Brot ein kr&auml;ftiges
                              Aroma und macht es lange haltbar.
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h2 className="mb-3 text-xl font-bold text-amber-900">
                              Vielfalt bis heute
                            </h2>
                            <p className="leading-7">
                              Deutschland ist f&uuml;r seine gro&szlig;e
                              Brotvielfalt bekannt. Von Brezeln &uuml;ber
                              Vollkornbrot bis zu K&ouml;rnerbrot gibt es viele
                              regionale Spezialit&auml;ten.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  }
                />
              </Routes>

              {/* BOTTOM HOME BUTTON */}
              <div className="mt-8 text-center">
                <Link
                  to="/"
                  className="inline-block px-5 py-3 rounded-lg bg-green-700 text-white hover:bg-green-600 transition text-sm sm:text-base"
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