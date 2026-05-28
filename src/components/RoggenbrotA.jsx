
import React, { useState } from "react";

export default function App() {
  const TOTAL_FLOUR = 1000;

  const emptyForm = {
    roggenPercent: "",
    weizenPercent: "",
    ta: "",
    hefe: "",
    salz: "",
    brotAnzahl: "",
    brotGewicht: "",
    versauerndeMehlmenge: "",
    anstellgutmenge: "",
    sauerTa: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const berechneAlles = () => {
    const roggenPercent = Number(form.roggenPercent);
    const weizenPercent = Number(form.weizenPercent);
    const ta = Number(form.ta);
    const hefePercent = Number(form.hefe);
    const salzPercent = Number(form.salz);

    const brotAnzahl = Number(form.brotAnzahl);
    const brotGewicht = Number(form.brotGewicht);

    const versauerndePercent = Number(form.versauerndeMehlmenge);
    const anstellgutPercent = Number(form.anstellgutmenge);
    const sauerTa = Number(form.sauerTa);

    const roggenmehl = (TOTAL_FLOUR * roggenPercent) / 100;
    const weizenmehl = (TOTAL_FLOUR * weizenPercent) / 100;
    const wasser = TOTAL_FLOUR * ((ta - 100) / 100);
    const hefe = (TOTAL_FLOUR * hefePercent) / 100;
    const salz = (TOTAL_FLOUR * salzPercent) / 100;

    const grundTeig =
      roggenmehl +
      weizenmehl +
      wasser +
      hefe +
      salz;

    const benoetigterTeig = brotAnzahl * brotGewicht;
    const faktor = benoetigterTeig / grundTeig;

    const sauerMehl =
      roggenmehl *
      (versauerndePercent / 100);

    const anstellgut =
      sauerMehl *
      (anstellgutPercent / 100);

    const sauerWasser =
      sauerMehl *
      ((sauerTa - 100) / 100);

    const sauerGesamt =
      sauerMehl +
      sauerWasser;

    const brotRoggen =
      roggenmehl -
      sauerMehl;

    const brotWasser =
      wasser -
      sauerWasser;

    const brotteigGesamt =
      brotRoggen +
      weizenmehl +
      brotWasser +
      hefe +
      salz;

    const produktionSauerMehl =
      sauerMehl * faktor;

    const produktionSauerWasser =
      sauerWasser * faktor;

    const produktionAnstellgut =
      anstellgut * faktor;

    const produktionSauerGesamt =
      produktionSauerMehl +
      produktionSauerWasser;

    const produktionBrotRoggen =
      brotRoggen * faktor;

    const produktionBrotWeizen =
      weizenmehl * faktor;

    const produktionBrotWasser =
      brotWasser * faktor;

    const produktionBrotHefe =
      hefe * faktor;

    const produktionBrotSalz =
      salz * faktor;

    const produktionBrotGesamt =
      produktionBrotRoggen +
      produktionBrotWeizen +
      produktionBrotWasser +
      produktionBrotHefe +
      produktionBrotSalz;

    const gesamtTeig =
      produktionSauerGesamt +
      produktionBrotGesamt;

    setResult({
      roggenPercent,
      weizenPercent,
      ta,
      hefePercent,
      salzPercent,
      brotAnzahl,
      brotGewicht,
      versauerndePercent,
      anstellgutPercent,
      sauerTa,

      roggenmehl,
      weizenmehl,
      wasser,
      hefe,
      salz,
      grundTeig,

      benoetigterTeig,
      faktor,

      sauerMehl,
      anstellgut,
      sauerWasser,
      sauerGesamt,

      brotRoggen,
      brotWasser,
      brotteigGesamt,

      produktionSauerMehl,
      produktionSauerWasser,
      produktionAnstellgut,
      produktionSauerGesamt,

      produktionBrotRoggen,
      produktionBrotWeizen,
      produktionBrotWasser,
      produktionBrotHefe,
      produktionBrotSalz,
      produktionBrotGesamt,

      gesamtTeig,
    });
  };

  const zuruecksetzen = () => {
    setForm(emptyForm);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8">
          <h1 className="text-2xl sm:text-4xl font-bold mb-6">
            Brotrechner
          </h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <Input label="Roggenmehl (%)" name="roggenPercent" value={form.roggenPercent} onChange={handleChange} />
            <Input label="Weizenmehl (%)" name="weizenPercent" value={form.weizenPercent} onChange={handleChange} />
            <Input label="Teigausbeute Grundteig (TA)" name="ta" value={form.ta} onChange={handleChange} />
            <Input label="Hefe (%)" name="hefe" value={form.hefe} onChange={handleChange} />
            <Input label="Salz (%)" name="salz" value={form.salz} onChange={handleChange} />
            <Input label="Anzahl der Brote" name="brotAnzahl" value={form.brotAnzahl} onChange={handleChange} />
            <Input label="Gewicht pro Brot (g)" name="brotGewicht" value={form.brotGewicht} onChange={handleChange} />
            <Input label="Zu versauernde Mehlmenge (%)" name="versauerndeMehlmenge" value={form.versauerndeMehlmenge} onChange={handleChange} />
            <Input label="Anstellgutmenge (%)" name="anstellgutmenge" value={form.anstellgutmenge} onChange={handleChange} />
            <Input label="Sauerteig-TA" name="sauerTa" value={form.sauerTa} onChange={handleChange} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              onClick={berechneAlles}
              className="flex-1 bg-black text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:opacity-90 transition"
            >
              Alles berechnen
            </button>

            <button
              onClick={zuruecksetzen}
              className="flex-1 bg-red-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:opacity-90 transition"
            >
              Zurücksetzen
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-6 sm:space-y-10">
            <Section title="1. Grundrezeptur">
              <Result title="Roggenmehl" value={`${result.roggenmehl.toFixed(0)} g`} />
              <Result title="Weizenmehl" value={`${result.weizenmehl.toFixed(0)} g`} />
              <Result title="Wasser" value={`${result.wasser.toFixed(0)} g`} />
              <Result title="Hefe" value={`${result.hefe.toFixed(0)} g`} />
              <Result title="Salz" value={`${result.salz.toFixed(0)} g`} />
              <Result title="Gesamtteig" value={`${result.grundTeig.toFixed(0)} g`} />

              <Explanation>
                Roggenmehl: 1000 × {result.roggenPercent}% = {result.roggenmehl.toFixed(0)} g<br />
                Weizenmehl: 1000 × {result.weizenPercent}% = {result.weizenmehl.toFixed(0)} g<br />
                Wasser: 1000 × ({result.ta} - 100)% = {result.wasser.toFixed(0)} g<br />
                Hefe: 1000 × {result.hefePercent}% = {result.hefe.toFixed(0)} g<br />
                Salz: 1000 × {result.salzPercent}% = {result.salz.toFixed(0)} g<br />
                Gesamtteig: {result.roggenmehl.toFixed(0)} + {result.weizenmehl.toFixed(0)} + {result.wasser.toFixed(0)} + {result.hefe.toFixed(0)} + {result.salz.toFixed(0)} = {result.grundTeig.toFixed(0)} g
              </Explanation>
            </Section>

            <Section title="2. Benötigte Teigmenge und Faktor">
              <Result title="Benötigte Teigmenge" value={`${result.benoetigterTeig.toFixed(0)} g`} />
              <Result title="Faktor" value={result.faktor.toFixed(2)} />

              <Explanation>
                Benötigte Teigmenge: {result.brotAnzahl} × {result.brotGewicht} g = {result.benoetigterTeig.toFixed(0)} g<br />
                Faktor: {result.benoetigterTeig.toFixed(0)} ÷ {result.grundTeig.toFixed(0)} = {result.faktor.toFixed(2)}
              </Explanation>
            </Section>

            <Section title="3. Sauerteig">
              <Result title="Sauermehl" value={`${result.sauerMehl.toFixed(0)} g`} />
              <Result title="Wasser" value={`${result.sauerWasser.toFixed(0)} g`} />
              <Result title="Anstellgut" value={`${result.anstellgut.toFixed(0)} g`} />
            

              <Explanation>
                Sauermehl: {result.roggenmehl.toFixed(0)} × {result.versauerndePercent}% = {result.sauerMehl.toFixed(0)} g<br />
                Wasser: {result.sauerMehl.toFixed(0)} × ({result.sauerTa} - 100)% = {result.sauerWasser.toFixed(0)} g<br />
                Anstellgut: {result.sauerMehl.toFixed(0)} × {result.anstellgutPercent}% = {result.anstellgut.toFixed(0)} g<br />
                Gesamt Sauerteig: {result.sauerMehl.toFixed(0)} + {result.sauerWasser.toFixed(0)} = {result.sauerGesamt.toFixed(0)} g
              </Explanation>
            </Section>

            <Section title="4. Brotteig">
              <Result title="Roggenmehl" value={`${result.brotRoggen.toFixed(0)} g`} />
              <Result title="Weizenmehl" value={`${result.weizenmehl.toFixed(0)} g`} />
              <Result title="Wasser" value={`${result.brotWasser.toFixed(0)} g`} />
              <Result title="Hefe" value={`${result.hefe.toFixed(0)} g`} />
              <Result title="Salz" value={`${result.salz.toFixed(0)} g`} />
              <Result title="Gesamt Brotteig" value={`${result.brotteigGesamt.toFixed(0)} g`} />

              <Explanation>
                Roggenmehl im Brotteig: {result.roggenmehl.toFixed(0)} - {result.sauerMehl.toFixed(0)} = {result.brotRoggen.toFixed(0)} g<br />
                Wasser im Brotteig: {result.wasser.toFixed(0)} - {result.sauerWasser.toFixed(0)} = {result.brotWasser.toFixed(0)} g<br />
                Gesamt Brotteig: {result.brotRoggen.toFixed(0)} + {result.weizenmehl.toFixed(0)} + {result.brotWasser.toFixed(0)} + {result.hefe.toFixed(0)} + {result.salz.toFixed(0)} = {result.brotteigGesamt.toFixed(0)} g
              </Explanation>
            </Section>

            <Section title="5. Produktionsrezept Sauerteig">
              <Result title="Sauermehl" value={`${result.produktionSauerMehl.toFixed(0)} g`} />
              <Result title="Wasser" value={`${result.produktionSauerWasser.toFixed(0)} g`} />
              <Result title="Anstellgut" value={`${result.produktionAnstellgut.toFixed(0)} g`} />
              <Result title="Gesamt Sauerteig ohne Anstellgut" value={`${result.produktionSauerGesamt.toFixed(0)} g`} />

              <Explanation>
                Sauermehl: {result.sauerMehl.toFixed(0)} × {result.faktor.toFixed(2)} = {result.produktionSauerMehl.toFixed(0)} g<br />
                Wasser: {result.sauerWasser.toFixed(0)} × {result.faktor.toFixed(2)} = {result.produktionSauerWasser.toFixed(0)} g<br />
                Anstellgut: {result.anstellgut.toFixed(0)} × {result.faktor.toFixed(2)} = {result.produktionAnstellgut.toFixed(0)} g
              </Explanation>
            </Section>

            <Section title="6. Produktionsrezept Brotteig">
              <Result title="Roggenmehl" value={`${result.produktionBrotRoggen.toFixed(0)} g`} />
              <Result title="Weizenmehl" value={`${result.produktionBrotWeizen.toFixed(0)} g`} />
              <Result title="Wasser" value={`${result.produktionBrotWasser.toFixed(0)} g`} />
              <Result title="Hefe" value={`${result.produktionBrotHefe.toFixed(0)} g`} />
              <Result title="Salz" value={`${result.produktionBrotSalz.toFixed(0)} g`} />
              <Result title="Gesamt Brotteig" value={`${result.produktionBrotGesamt.toFixed(0)} g`} />

              <Explanation>
                Alle Brotteigwerte werden mit dem Faktor {result.faktor.toFixed(2)} multipliziert.<br />
                Gesamt Brotteig: {result.produktionBrotRoggen.toFixed(0)} + {result.produktionBrotWeizen.toFixed(0)} + {result.produktionBrotWasser.toFixed(0)} + {result.produktionBrotHefe.toFixed(0)} + {result.produktionBrotSalz.toFixed(0)} = {result.produktionBrotGesamt.toFixed(0)} g
              </Explanation>
            </Section>

            <Section title="7. Gesamtteig">
              <Result title="Gesamt Sauerteig" value={`${result.produktionSauerGesamt.toFixed(0)} g`} />
              <Result title="Gesamt Brotteig" value={`${result.produktionBrotGesamt.toFixed(0)} g`} />
              <Result title="Gesamtteig" value={`${result.gesamtTeig.toFixed(0)} g`} />

              <Explanation>
                Gesamtteig: {result.produktionSauerGesamt.toFixed(0)} + {result.produktionBrotGesamt.toFixed(0)} = {result.gesamtTeig.toFixed(0)} g<br />
                Das Anstellgut wird beim Gesamtteig nicht extra dazugerechnet.
              </Explanation>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8">
      <h2 className="text-xl sm:text-3xl font-bold mb-5 sm:mb-8">
        {title}
      </h2>

      <div className="space-y-3 sm:space-y-4 text-base sm:text-lg">
        {children}
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">
        {label}
      </label>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

function Result({ title, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 border-b border-gray-200 pb-3">
      <span className="text-gray-700">{title}</span>

      <span className="font-bold text-gray-900">
        {value}
      </span>
    </div>
  );
}

function Explanation({ children }) {
  return (
    <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm sm:text-base text-gray-600 leading-relaxed">
      <span className="font-bold text-gray-800">
        Erklärung:
      </span>{" "}
      {children}
    </div>
  );
}