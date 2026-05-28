import React, { useEffect, useState } from "react";

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
  const [animationKey, setAnimationKey] = useState(0);

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

    const grundTeig = roggenmehl + weizenmehl + wasser + hefe + salz;

    const benoetigterTeig = brotAnzahl * brotGewicht;
    const faktor = benoetigterTeig / grundTeig;

    const sauerMehl = roggenmehl * (versauerndePercent / 100);
    const anstellgut = sauerMehl * (anstellgutPercent / 100);
    const sauerWasser = sauerMehl * ((sauerTa - 100) / 100);
    const sauerGesamt = sauerMehl + sauerWasser;

    const brotRoggen = roggenmehl - sauerMehl;
    const brotWasser = wasser - sauerWasser;

    const brotteigGesamt =
      brotRoggen + weizenmehl + brotWasser + hefe + salz;

    const produktionSauerMehl = sauerMehl * faktor;
    const produktionSauerWasser = sauerWasser * faktor;
    const produktionAnstellgut = anstellgut * faktor;
    const produktionSauerGesamt = produktionSauerMehl + produktionSauerWasser;

    const produktionBrotRoggen = brotRoggen * faktor;
    const produktionBrotWeizen = weizenmehl * faktor;
    const produktionBrotWasser = brotWasser * faktor;
    const produktionBrotHefe = hefe * faktor;
    const produktionBrotSalz = salz * faktor;

    const produktionBrotGesamt =
      produktionBrotRoggen +
      produktionBrotWeizen +
      produktionBrotWasser +
      produktionBrotHefe +
      produktionBrotSalz;

    const gesamtTeig = produktionSauerGesamt + produktionBrotGesamt;

    setAnimationKey(Date.now());

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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-orange-50 to-emerald-50 p-3 sm:p-6">
      <style>
        {`
          @keyframes sectionSlide {
            from {
              opacity: 0;
              transform: translateY(-28px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes resultSlide {
            from {
              opacity: 0;
              transform: translateY(-18px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes cursorBlink {
            0%, 45% {
              opacity: 1;
            }
            46%, 100% {
              opacity: 0;
            }
          }

          .section-slide {
            opacity: 0;
            animation: sectionSlide 0.65s ease forwards;
          }

          .result-slide {
            opacity: 0;
            animation: resultSlide 0.45s ease forwards;
          }

          .typing-cursor {
            display: inline-block;
            width: 8px;
            height: 18px;
            margin-left: 3px;
            background: #22c55e;
            vertical-align: middle;
            animation: cursorBlink 0.8s infinite;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 border border-orange-100">
          <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-900">
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
              className="flex-1 bg-emerald-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:bg-emerald-600 transition"
            >
              Alles berechnen
            </button>

            <button
              onClick={zuruecksetzen}
              className="flex-1 bg-red-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:bg-red-400 transition"
            >
              Zurücksetzen
            </button>
          </div>
        </div>

        {result && (
          <div key={animationKey} className="space-y-6 sm:space-y-10">
            <Section title="1. Grundrezeptur" color="from-orange-500 to-amber-500" delay={0}>
              <Result delay={250} title="Roggenmehl" value={`${result.roggenmehl.toFixed(0)} g`} color="bg-orange-50 text-orange-800" />
              <Result delay={380} title="Weizenmehl" value={`${result.weizenmehl.toFixed(0)} g`} color="bg-yellow-50 text-yellow-800" />
              <Result delay={510} title="Wasser" value={`${result.wasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />
              <Result delay={640} title="Hefe" value={`${result.hefe.toFixed(0)} g`} color="bg-purple-50 text-purple-800" />
              <Result delay={770} title="Salz" value={`${result.salz.toFixed(0)} g`} color="bg-slate-100 text-slate-800" />
              <Result delay={900} title="Gesamtteig" value={`${result.grundTeig.toFixed(0)} g`} color="bg-emerald-50 text-emerald-800" />

              <Explanation delay={1100} lines={[
                `Roggenmehl: 1000 × ${result.roggenPercent}% = ${result.roggenmehl.toFixed(0)} g`,
                `Weizenmehl: 1000 × ${result.weizenPercent}% = ${result.weizenmehl.toFixed(0)} g`,
                `Wasser: 1000 × (${result.ta} - 100)% = ${result.wasser.toFixed(0)} g`,
                `Hefe: 1000 × ${result.hefePercent}% = ${result.hefe.toFixed(0)} g`,
                `Salz: 1000 × ${result.salzPercent}% = ${result.salz.toFixed(0)} g`,
                `Gesamtteig: ${result.roggenmehl.toFixed(0)} + ${result.weizenmehl.toFixed(0)} + ${result.wasser.toFixed(0)} + ${result.hefe.toFixed(0)} + ${result.salz.toFixed(0)} = ${result.grundTeig.toFixed(0)} g`,
              ]} />
            </Section>

            <Section title="2. Benötigte Teigmenge und Faktor" color="from-emerald-500 to-teal-500" delay={1500}>
              <Result delay={1750} title="Benötigte Teigmenge" value={`${result.benoetigterTeig.toFixed(0)} g`} color="bg-emerald-50 text-emerald-800" />
              <Result delay={1880} title="Faktor" value={result.faktor.toFixed(2)} color="bg-teal-50 text-teal-800" />

              <Explanation delay={2050} lines={[
                `Benötigte Teigmenge: ${result.brotAnzahl} × ${result.brotGewicht} g = ${result.benoetigterTeig.toFixed(0)} g`,
                `Faktor: ${result.benoetigterTeig.toFixed(0)} ÷ ${result.grundTeig.toFixed(0)} = ${result.faktor.toFixed(2)}`,
              ]} />
            </Section>

            <Section title="3. Sauerteig" color="from-rose-500 to-orange-500" delay={2500}>
              <Result delay={2750} title="Sauermehl" value={`${result.sauerMehl.toFixed(0)} g`} color="bg-rose-50 text-rose-800" />
              <Result delay={2880} title="Wasser" value={`${result.sauerWasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />
              <Result delay={3010} title="Anstellgut" value={`${result.anstellgut.toFixed(0)} g`} color="bg-orange-50 text-orange-800" />

              <Explanation delay={3200} lines={[
                `Sauermehl: ${result.roggenmehl.toFixed(0)} × ${result.versauerndePercent}% = ${result.sauerMehl.toFixed(0)} g`,
                `Wasser: ${result.sauerMehl.toFixed(0)} × (${result.sauerTa} - 100)% = ${result.sauerWasser.toFixed(0)} g`,
                `Anstellgut: ${result.sauerMehl.toFixed(0)} × ${result.anstellgutPercent}% = ${result.anstellgut.toFixed(0)} g`,
                `Gesamt Sauerteig: ${result.sauerMehl.toFixed(0)} + ${result.sauerWasser.toFixed(0)} = ${result.sauerGesamt.toFixed(0)} g`,
              ]} />
            </Section>

            <Section title="4. Brotteig" color="from-indigo-500 to-blue-500" delay={3900}>
              <Result delay={4150} title="Roggenmehl" value={`${result.brotRoggen.toFixed(0)} g`} color="bg-indigo-50 text-indigo-800" />
              <Result delay={4280} title="Weizenmehl" value={`${result.weizenmehl.toFixed(0)} g`} color="bg-yellow-50 text-yellow-800" />
              <Result delay={4410} title="Wasser" value={`${result.brotWasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />
              <Result delay={4540} title="Hefe" value={`${result.hefe.toFixed(0)} g`} color="bg-purple-50 text-purple-800" />
              <Result delay={4670} title="Salz" value={`${result.salz.toFixed(0)} g`} color="bg-slate-100 text-slate-800" />
              <Result delay={4800} title="Gesamt Brotteig" value={`${result.brotteigGesamt.toFixed(0)} g`} color="bg-blue-50 text-blue-800" />

              <Explanation delay={5000} lines={[
                `Roggenmehl im Brotteig: ${result.roggenmehl.toFixed(0)} - ${result.sauerMehl.toFixed(0)} = ${result.brotRoggen.toFixed(0)} g`,
                `Wasser im Brotteig: ${result.wasser.toFixed(0)} - ${result.sauerWasser.toFixed(0)} = ${result.brotWasser.toFixed(0)} g`,
                `Gesamt Brotteig: ${result.brotRoggen.toFixed(0)} + ${result.weizenmehl.toFixed(0)} + ${result.brotWasser.toFixed(0)} + ${result.hefe.toFixed(0)} + ${result.salz.toFixed(0)} = ${result.brotteigGesamt.toFixed(0)} g`,
              ]} />
            </Section>

            <Section title="5. Produktionsrezept Sauerteig" color="from-fuchsia-500 to-pink-500" delay={5700}>
              <Result delay={5950} title="Sauermehl" value={`${result.produktionSauerMehl.toFixed(0)} g`} color="bg-fuchsia-50 text-fuchsia-800" />
              <Result delay={6080} title="Wasser" value={`${result.produktionSauerWasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />
              <Result delay={6210} title="Anstellgut" value={`${result.produktionAnstellgut.toFixed(0)} g`} color="bg-pink-50 text-pink-800" />
              <Result delay={6340} title="Gesamt Sauerteig ohne Anstellgut" value={`${result.produktionSauerGesamt.toFixed(0)} g`} color="bg-emerald-50 text-emerald-800" />

              <Explanation delay={6550} lines={[
                `Sauermehl: ${result.sauerMehl.toFixed(0)} × ${result.faktor.toFixed(2)} = ${result.produktionSauerMehl.toFixed(0)} g`,
                `Wasser: ${result.sauerWasser.toFixed(0)} × ${result.faktor.toFixed(2)} = ${result.produktionSauerWasser.toFixed(0)} g`,
                `Anstellgut: ${result.anstellgut.toFixed(0)} × ${result.faktor.toFixed(2)} = ${result.produktionAnstellgut.toFixed(0)} g`,
              ]} />
            </Section>

            <Section title="6. Produktionsrezept Brotteig" color="from-cyan-500 to-blue-500" delay={7200}>
              <Result delay={7450} title="Roggenmehl" value={`${result.produktionBrotRoggen.toFixed(0)} g`} color="bg-cyan-50 text-cyan-800" />
              <Result delay={7580} title="Weizenmehl" value={`${result.produktionBrotWeizen.toFixed(0)} g`} color="bg-yellow-50 text-yellow-800" />
              <Result delay={7710} title="Wasser" value={`${result.produktionBrotWasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />
              <Result delay={7840} title="Hefe" value={`${result.produktionBrotHefe.toFixed(0)} g`} color="bg-purple-50 text-purple-800" />
              <Result delay={7970} title="Salz" value={`${result.produktionBrotSalz.toFixed(0)} g`} color="bg-slate-100 text-slate-800" />
              <Result delay={8100} title="Gesamt Brotteig" value={`${result.produktionBrotGesamt.toFixed(0)} g`} color="bg-blue-50 text-blue-800" />

              <Explanation delay={8300} lines={[
                `Alle Brotteigwerte werden mit dem Faktor ${result.faktor.toFixed(2)} multipliziert.`,
                `Gesamt Brotteig: ${result.produktionBrotRoggen.toFixed(0)} + ${result.produktionBrotWeizen.toFixed(0)} + ${result.produktionBrotWasser.toFixed(0)} + ${result.produktionBrotHefe.toFixed(0)} + ${result.produktionBrotSalz.toFixed(0)} = ${result.produktionBrotGesamt.toFixed(0)} g`,
              ]} />
            </Section>

            <Section title="7. Gesamtteig" color="from-green-600 to-emerald-500" delay={9000}>
              <Result delay={9250} title="Gesamt Sauerteig" value={`${result.produktionSauerGesamt.toFixed(0)} g`} color="bg-green-50 text-green-800" />
              <Result delay={9380} title="Gesamt Brotteig" value={`${result.produktionBrotGesamt.toFixed(0)} g`} color="bg-emerald-50 text-emerald-800" />
              <Result delay={9510} title="Gesamtteig" value={`${result.gesamtTeig.toFixed(0)} g`} color="bg-lime-50 text-lime-800" />

              <Explanation delay={9700} lines={[
                `Gesamtteig: ${result.produktionSauerGesamt.toFixed(0)} + ${result.produktionBrotGesamt.toFixed(0)} = ${result.gesamtTeig.toFixed(0)} g`,
                "Das Anstellgut wird beim Gesamtteig nicht extra dazugerechnet.",
              ]} />
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children, color, delay }) {
  return (
    <div
      className="section-slide bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 border border-white"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="text-xl sm:text-3xl font-bold mb-5 sm:mb-8 text-gray-900">
        <span className={`inline-block w-3 h-8 rounded-full bg-gradient-to-b ${color} mr-3 align-middle`} />
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
        className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
      />
    </div>
  );
}

function Result({ title, value, color, delay }) {
  return (
    <div
      className={`result-slide flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 rounded-xl px-4 py-3 ${color}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="font-semibold">{title}</span>

      <span className="font-black text-lg sm:text-xl">
        {value}
      </span>
    </div>
  );
}

function Explanation({ lines, delay }) {
  const [started, setStarted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    const timer = setTimeout(() => {
      if (charIndex < currentLine.length) {
        setCharIndex(charIndex + 1);
      } else {
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }
    }, charIndex < currentLine.length ? 18 : 350);

    return () => clearTimeout(timer);
  }, [started, charIndex, lineIndex, lines]);

  return (
    <div
      className="result-slide mt-5 rounded-xl bg-gray-950 border border-gray-800 p-4 text-sm sm:text-base text-green-300 leading-relaxed font-mono shadow-inner"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="font-bold text-amber-300 mb-2">
        Erklärung:
      </div>

      {!started && (
        <div>
          <span className="text-sky-300">&gt;</span>{" "}
          <span className="typing-cursor" />
        </div>
      )}

      {started && (
        <>
          {lines.slice(0, lineIndex).map((line, index) => (
            <div key={index} className="mb-1">
              <span className="text-sky-300">&gt;</span>{" "}
              {line}
            </div>
          ))}

          {lineIndex < lines.length && (
            <div>
              <span className="text-sky-300">&gt;</span>{" "}
              {lines[lineIndex].slice(0, charIndex)}
              <span className="typing-cursor" />
            </div>
          )}
        </>
      )}
    </div>
  );
}