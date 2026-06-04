
import React, { useState } from "react";

export default function App() {
  const emptyDirekt = {
    teigtemperatur: "",
    kneterwaermung: "",
    mehltemperatur: "",
  };

  const emptyIndirekt = {
    teigtemperatur: "",
    kneterwaermung: "",
    mehltemperatur: "",
    vorteigtemperatur: "",
  };

  const [direktForm, setDirektForm] = useState(emptyDirekt);
  const [indirektForm, setIndirektForm] = useState(emptyIndirekt);

  const [direktResult, setDirektResult] = useState(null);
  const [indirektResult, setIndirektResult] = useState(null);

  const berechneDirekt = () => {
    const teig = Number(direktForm.teigtemperatur);
    const knet = Number(direktForm.kneterwaermung);
    const mehl = Number(direktForm.mehltemperatur);

    const wasser = (teig - knet) * 2 - mehl;

    setDirektResult({
      wasser,
      teig,
      knet,
      mehl,
    });
  };

  const berechneIndirekt = () => {
    const teig = Number(indirektForm.teigtemperatur);
    const knet = Number(indirektForm.kneterwaermung);
    const mehl = Number(indirektForm.mehltemperatur);
    const vorteig = Number(indirektForm.vorteigtemperatur);

    const wasser =
      (teig - knet) * 3 - mehl - vorteig;

    setIndirektResult({
      wasser,
      teig,
      knet,
      mehl,
      vorteig,
    });
  };

  const resetDirekt = () => {
    setDirektForm(emptyDirekt);
    setDirektResult(null);
  };

  const resetIndirekt = () => {
    setIndirektForm(emptyIndirekt);
    setIndirektResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-orange-50 to-emerald-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Wassertemperatur Rechner
          </h1>

          <p className="text-gray-600 mt-2">
            Direkte und indirekte Teigführung
          </p>
        </div>

        {/* Direkte Teigführung */}
        <Section title="Direkte Teigführung">

          <div className="grid md:grid-cols-3 gap-5">
            <Input
              label="Gewünschte Teigtemperatur (°C)"
              value={direktForm.teigtemperatur}
              onChange={(e) =>
                setDirektForm({
                  ...direktForm,
                  teigtemperatur: e.target.value,
                })
              }
            />

            <Input
              label="Kneterwärmung (°C)"
              value={direktForm.kneterwaermung}
              onChange={(e) =>
                setDirektForm({
                  ...direktForm,
                  kneterwaermung: e.target.value,
                })
              }
            />

            <Input
              label="Mehltemperatur (°C)"
              value={direktForm.mehltemperatur}
              onChange={(e) =>
                setDirektForm({
                  ...direktForm,
                  mehltemperatur: e.target.value,
                })
              }
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={berechneDirekt}
              className="flex-1 bg-emerald-700 text-white py-4 rounded-2xl text-xl font-bold hover:bg-emerald-600 transition"
            >
              Berechnen
            </button>

            <button
              onClick={resetDirekt}
              className="flex-1 bg-red-500 text-white py-4 rounded-2xl text-xl font-bold hover:bg-red-400 transition"
            >
              Zurücksetzen
            </button>
          </div>

          {direktResult && (
            <div className="mt-6 space-y-4">
              <Result
                title="Wassertemperatur"
                value={`${direktResult.wasser.toFixed(1)} °C`}
                color="bg-emerald-50 text-emerald-800"
              />

              <div className="bg-gray-950 text-green-300 p-4 rounded-xl font-mono">
                ({direktResult.teig} - {direktResult.knet}) × 2 -{" "}
                {direktResult.mehl}
                <br />
                = {direktResult.wasser.toFixed(1)} °C
              </div>
            </div>
          )}
        </Section>

        {/* Indirekte Teigführung */}
        <Section title="Indirekte Teigführung">

          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Gewünschte Teigtemperatur (°C)"
              value={indirektForm.teigtemperatur}
              onChange={(e) =>
                setIndirektForm({
                  ...indirektForm,
                  teigtemperatur: e.target.value,
                })
              }
            />

            <Input
              label="Kneterwärmung (°C)"
              value={indirektForm.kneterwaermung}
              onChange={(e) =>
                setIndirektForm({
                  ...indirektForm,
                  kneterwaermung: e.target.value,
                })
              }
            />

            <Input
              label="Mehltemperatur (°C)"
              value={indirektForm.mehltemperatur}
              onChange={(e) =>
                setIndirektForm({
                  ...indirektForm,
                  mehltemperatur: e.target.value,
                })
              }
            />

            <Input
              label="Vorteigtemperatur (°C)"
              value={indirektForm.vorteigtemperatur}
              onChange={(e) =>
                setIndirektForm({
                  ...indirektForm,
                  vorteigtemperatur: e.target.value,
                })
              }
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={berechneIndirekt}
              className="flex-1 bg-blue-700 text-white py-4 rounded-2xl text-xl font-bold hover:bg-blue-600 transition"
            >
              Berechnen
            </button>

            <button
              onClick={resetIndirekt}
              className="flex-1 bg-red-500 text-white py-4 rounded-2xl text-xl font-bold hover:bg-red-400 transition"
            >
              Zurücksetzen
            </button>
          </div>

          {indirektResult && (
            <div className="mt-6 space-y-4">
              <Result
                title="Wassertemperatur"
                value={`${indirektResult.wasser.toFixed(1)} °C`}
                color="bg-blue-50 text-blue-800"
              />

              <div className="bg-gray-950 text-green-300 p-4 rounded-xl font-mono">
                ({indirektResult.teig} - {indirektResult.knet}) × 3 -{" "}
                {indirektResult.mehl} -{" "}
                {indirektResult.vorteig}
                <br />
                = {indirektResult.wasser.toFixed(1)} °C
              </div>
            </div>
          )}
        </Section>

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
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        {title}
      </h2>

      {children}
    </div>
  );
}

function Result({ title, value, color }) {
  return (
    <div
      className={`flex justify-between items-center rounded-xl px-5 py-4 ${color}`}
    >
      <span className="font-semibold text-lg">
        {title}
      </span>

      <span className="font-black text-2xl">
        {value}
      </span>
    </div>
  );
}
