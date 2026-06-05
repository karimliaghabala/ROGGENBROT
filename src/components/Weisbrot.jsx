import React, { useState } from "react";

export default function App() {
  const [broetchen, setBroetchen] = useState("");
  const [result, setResult] = useState(null);

  const baseRecipe = {
    flour: 1345,
    yeast: 55,
    salt: 25,
    malt: 25,
    milkPowder: 40,
    margarine: 25,
    water: 805,
  };

  const calculate = () => {
    setResult(null);

    setTimeout(() => {
      const count = Number(broetchen);

      if (!count || count <= 0) return;

      const factor = count / 4;

      const scaled = Object.fromEntries(
        Object.entries(baseRecipe).map(([key, value]) => [
          key,
          +(value * factor).toFixed(1),
        ])
      );

      const totalDough =
        scaled.flour +
        scaled.yeast +
        scaled.salt +
        scaled.malt +
        scaled.milkPowder +
        scaled.margarine +
        scaled.water;

      setResult({
        ...scaled,
        totalDough: totalDough.toFixed(1),
        count,
      });
    }, 1000);
  };

  const reset = () => {
    setBroetchen("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-orange-50 to-emerald-50 px-3 py-4 sm:p-4">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            Brot Rezept Rechner
          </h1>

          <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Weißbrot & Kaviarbrot – Mengenberechnung
          </p>
        </div>

        <Section title="Rezept Berechnung">

          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Wie viele Brote?"
              value={broetchen}
              onChange={(e) => setBroetchen(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={calculate}
              className="flex-1 bg-emerald-700 py-3 sm:py-4 rounded-2xl hover:bg-emerald-600 transition text-lg sm:text-2xl font-bold text-white"
            >
              Berechnen
            </button>

            <button
              onClick={reset}
              className="flex-1 bg-red-500 py-3 sm:py-4 rounded-2xl hover:bg-red-400 transition text-lg sm:text-2xl font-bold text-white"
            >
              Zurücksetzen
            </button>
          </div>

          {result && (
            <div className="mt-6 space-y-4 animate-chatSlide">

              <Result
                title={`Zutaten für ${result.count} Brote`}
                value=""
                color="bg-emerald-50 text-emerald-800"
              />

              <div className="bg-white rounded-2xl shadow p-4 sm:p-5 space-y-2 text-gray-800 text-sm sm:text-base">

                <p>Weizenmehl (550): <b>{result.flour} g</b></p>

                <p>Hefe: <b>{result.yeast} g</b></p>

                <p>Salz: <b>{result.salt} g</b></p>

                <p>Malzbackmittel: <b>{result.malt} g</b></p>

                <p>Vollmilchpulver: <b>{result.milkPowder} g</b></p>

                <p>Backmargarine: <b>{result.margarine} g</b></p>

                <p>Wasser: <b>{result.water} g</b></p>

              </div>

              <Result
                title="Gesamtteig"
                value={`${result.totalDough} g`}
                color="bg-yellow-50 text-yellow-800"
              />

              <div className="bg-gray-950 text-green-300 p-4 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto">
                Gesamtteig = Summe aller Zutaten
                <br />
                = {result.totalDough} g
              </div>

              <div className="bg-gray-100 p-4 rounded-2xl shadow text-gray-800 leading-relaxed text-sm sm:text-base">
                <h3 className="font-bold text-base sm:text-lg mb-2">
                  Zubereitung:
                </h3>

                <p>
                  Knetung: 4 Min Stufe 1, 3 Min Stufe 2.
                  <br />
                  Teigtemperatur: 26°C
                  <br />
                  Teigruhe: 15 Min.
                  <br />
                  Rundwirken, entspannen lassen, formen.
                  <br />
                  Stückgare: 35 Min bei 32°C & 72% Luftfeuchtigkeit.
                  <br />
                  Backen: 220°C für ca. 35 Min.
                </p>
              </div>

            </div>
          )}
        </Section>

      </div>

      <style>
        {`
          .animate-chatSlide {
            animation: chatSlide 0.45s ease-out forwards;
          }

          @keyframes chatSlide {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-900">
        {title}
      </h2>

      {children}
    </div>
  );
}

function Result({ title, value, color }) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 rounded-xl px-4 sm:px-5 py-4 ${color}`}
    >
      <span className="font-semibold text-base sm:text-lg">
        {title}
      </span>

      {value && (
        <span className="font-black text-xl sm:text-2xl break-words">
          {value}
        </span>
      )}
    </div>
  );
}