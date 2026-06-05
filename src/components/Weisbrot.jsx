
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
    }, 800);
  };

  const reset = () => {
    setBroetchen("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-orange-50 to-emerald-50 p-3 sm:p-6">

      <style>{`
        @keyframes sectionSlide {
          from {
            opacity: 0;
            transform: translateY(-24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes resultSlide {
          from {
            opacity: 0;
            transform: translateY(-18px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .section-slide {
          animation: sectionSlide .6s ease forwards;
        }

        .result-slide {
          animation: resultSlide .45s ease forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-8">

        <div className="section-slide bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">

          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 sm:p-8 text-white">

            <h1 className="text-3xl sm:text-5xl font-black">
              Brot Rezept Rechner
            </h1>

            <p className="mt-3 text-base sm:text-xl text-emerald-50">
              Weißbrot & Kaviarbrot – Mengenberechnung
            </p>

          </div>

          <div className="p-6 sm:p-8">

            <Input
              label="Wie viele Brote?"
              value={broetchen}
              onChange={(e) => setBroetchen(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

              <button
                onClick={calculate}
                className="flex-1 bg-emerald-700 text-white py-4 rounded-2xl text-lg sm:text-xl font-bold hover:bg-emerald-600 transition"
              >
                Berechnen
              </button>

              <button
                onClick={reset}
                className="flex-1 bg-red-500 text-white py-4 rounded-2xl text-lg sm:text-xl font-bold hover:bg-red-400 transition"
              >
                Zurücksetzen
              </button>

            </div>
          </div>
        </div>

        {result && (
          <div className="section-slide bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">

            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              <span className="inline-block w-3 h-8 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500 mr-3 align-middle" />
              Zutaten für {result.count} Brote
            </h2>

            <div className="space-y-3">

              <Result
                title="Weizenmehl (550)"
                value={`${result.flour} g`}
                color="bg-yellow-50 text-yellow-800"
              />

              <Result
                title="Hefe"
                value={`${result.yeast} g`}
                color="bg-purple-50 text-purple-800"
              />

              <Result
                title="Salz"
                value={`${result.salt} g`}
                color="bg-slate-100 text-slate-800"
              />

              <Result
                title="Malzbackmittel"
                value={`${result.malt} g`}
                color="bg-orange-50 text-orange-800"
              />

              <Result
                title="Vollmilchpulver"
                value={`${result.milkPowder} g`}
                color="bg-pink-50 text-pink-800"
              />

              <Result
                title="Backmargarine"
                value={`${result.margarine} g`}
                color="bg-cyan-50 text-cyan-800"
              />

              <Result
                title="Wasser"
                value={`${result.water} g`}
                color="bg-sky-50 text-sky-800"
              />

              <Result
                title="Gesamtteig"
                value={`${result.totalDough} g`}
                color="bg-emerald-50 text-emerald-800"
              />

            </div>

            <div className="mt-8 bg-gray-950 border border-gray-800 rounded-2xl p-5 text-green-300 font-mono shadow-inner">

              <div className="text-amber-300 font-bold mb-3">
                Erklärung:
              </div>

              <div>
                &gt; Gesamtteig = Summe aller Zutaten
              </div>

              <div>
                &gt; {result.totalDough} g
              </div>

            </div>

            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-5">

              <h3 className="font-bold text-xl mb-4">
                Zubereitung
              </h3>

              <div className="space-y-2 text-gray-700">

                <p>• Knetung: 4 Min Stufe 1, 3 Min Stufe 2</p>
                <p>• Teigtemperatur: 26°C</p>
                <p>• Teigruhe: 15 Minuten</p>
                <p>• Rundwirken und formen</p>
                <p>• Stückgare: 35 Min bei 32°C und 72% Luftfeuchtigkeit</p>
                <p>• Backen: 220°C für ca. 35 Minuten</p>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-700">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={onChange}
        className="
          w-full
          border
          border-gray-300
          rounded-xl
          px-4
          py-3
          text-lg
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-600
        "
      />
    </div>
  );
}

function Result({ title, value, color }) {
  return (
    <div
      className={`
        result-slide
        flex
        flex-col
        sm:flex-row
        sm:justify-between
        sm:items-center
        gap-2
        rounded-xl
        px-5
        py-4
        ${color}
      `}
    >
      <span className="font-semibold">
        {title}
      </span>

      <span className="font-black text-xl">
        {value}
      </span>
    </div>
  );
}
