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
  const [brotResult, setBrotResult] = useState(null);
  const [animationKeys, setAnimationKeys] = useState({});

  const triggerAnimation = (name) => {
    setAnimationKeys((prev) => ({
      ...prev,
      [name]: Date.now(),
    }));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const berechneGrundrezeptur = () => {
    const roggenPercent = Number(form.roggenPercent);
    const weizenPercent = Number(form.weizenPercent);
    const ta = Number(form.ta);
    const hefePercent = Number(form.hefe);
    const salzPercent = Number(form.salz);

    const roggenmehl = (TOTAL_FLOUR * roggenPercent) / 100;
    const weizenmehl = (TOTAL_FLOUR * weizenPercent) / 100;
    const wasser = TOTAL_FLOUR * ((ta - 100) / 100);
    const hefe = (TOTAL_FLOUR * hefePercent) / 100;
    const salz = (TOTAL_FLOUR * salzPercent) / 100;

    const teig = roggenmehl + weizenmehl + wasser + hefe + salz;

    setResult({
      roggenmehl,
      weizenmehl,
      wasser,
      hefe,
      salz,
      teig,
    });

    triggerAnimation("grundrezeptur");
  };

  const berechneBrotmenge = () => {
    const anzahl = Number(form.brotAnzahl);
    const gewicht = Number(form.brotGewicht);
    const totalTeig = anzahl * gewicht;

    setBrotResult(totalTeig);
    triggerAnimation("brotmenge");
  };

  const zuruecksetzen = () => {
    setForm(emptyForm);
    setResult(null);
    setBrotResult(null);
    setAnimationKeys({});
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
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden border border-orange-100">
          <div className="p-4 sm:p-8">
            <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">
              Brotrechner
            </h1>

            <div className="space-y-4 sm:space-y-5">
              <Input label="Roggenmehl (%)" name="roggenPercent" value={form.roggenPercent} onChange={handleChange} />
              <Input label="Weizenmehl (%)" name="weizenPercent" value={form.weizenPercent} onChange={handleChange} />
              <Input label="Teigausbeute (TA)" name="ta" value={form.ta} onChange={handleChange} />
              <Input label="Hefe (%)" name="hefe" value={form.hefe} onChange={handleChange} />
              <Input label="Salz (%)" name="salz" value={form.salz} onChange={handleChange} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                onClick={berechneGrundrezeptur}
                className="flex-1 bg-emerald-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:bg-emerald-600 transition"
              >
                Berechnen
              </button>

              <button
                onClick={zuruecksetzen}
                className="flex-1 bg-red-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:bg-red-400 transition"
              >
                Zurücksetzen
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 sm:p-8 border-t md:border-t-0 md:border-l border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
              Grundrezeptur
            </h2>

            {result ? (
              <AnimatedResultBox key={animationKeys.grundrezeptur}>
                <Result delay={100} title="Roggenmehl" value={`${result.roggenmehl.toFixed(0)} g`} color="bg-orange-50 text-orange-800" />
                <Result delay={220} title="Weizenmehl" value={`${result.weizenmehl.toFixed(0)} g`} color="bg-yellow-50 text-yellow-800" />
                <Result delay={340} title="Wasser" value={`${result.wasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />
                <Result delay={460} title="Hefe" value={`${result.hefe.toFixed(0)} g`} color="bg-purple-50 text-purple-800" />
                <Result delay={580} title="Salz" value={`${result.salz.toFixed(0)} g`} color="bg-slate-100 text-slate-800" />
                <Result delay={700} title="Gesamtteig" value={`${result.teig.toFixed(0)} g`} color="bg-emerald-50 text-emerald-800" />

                <Explanation
                  delay={900}
                  lines={[
                    "Die Grundrezeptur basiert auf 1000 g Gesamtmehl.",
                    "Die Mehlanteile werden prozentual berechnet.",
                    "Die Wassermenge ergibt sich aus der Teigausbeute: TA minus 100 ergibt den Wasseranteil in Prozent.",
                  ]}
                />
              </AnimatedResultBox>
            ) : (
              <div className="text-gray-400 text-base sm:text-lg">
                Das Berechnungsergebnis wird hier angezeigt.
              </div>
            )}
          </div>
        </div>

        <Section title="Brotmengenrechner" color="from-blue-500 to-cyan-500">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            <Input label="Anzahl der Brote" name="brotAnzahl" value={form.brotAnzahl} onChange={handleChange} />
            <Input label="Gewicht pro Brot (g)" name="brotGewicht" value={form.brotGewicht} onChange={handleChange} />
          </div>

          <Button color="bg-blue-600" onClick={berechneBrotmenge}>
            Brotmenge berechnen
          </Button>

          {brotResult !== null && (
            <AnimatedResultBox key={animationKeys.brotmenge}>
              <Result delay={100} title="Benötigte Gesamtteigmenge" value={`${brotResult.toFixed(0)} g`} color="bg-blue-50 text-blue-800" />

              <Explanation
                delay={300}
                lines={[
                  `Benötigte Gesamtteigmenge: ${form.brotAnzahl} × ${form.brotGewicht} g = ${brotResult.toFixed(0)} g`,
                  "Die benötigte Teigmenge wird berechnet, indem die Anzahl der Brote mit dem gewünschten Gewicht pro Brot multipliziert wird.",
                ]}
              />
            </AnimatedResultBox>
          )}
        </Section>

        <Section title="Faktorrechner" color="from-green-500 to-emerald-500">
          <p className="text-gray-500 mb-5 sm:mb-6 text-sm sm:text-base">
            Benötigte Gesamtteigmenge geteilt durch Grundrezeptur-Gesamtteig.
          </p>

          <Button
            color="bg-green-600"
            onClick={() => {
              if (!result || brotResult === null) return;

              const faktor = brotResult / result.teig;

              setResult((prev) => ({
                ...prev,
                faktor,
              }));

              triggerAnimation("faktor");
            }}
          >
            Faktor berechnen
          </Button>

          {result?.faktor && (
            <AnimatedResultBox key={animationKeys.faktor}>
              <Result delay={100} title="Faktor" value={result.faktor.toFixed(2)} color="bg-green-50 text-green-800" />

              <Explanation
                delay={300}
                lines={[
                  `Faktor: ${brotResult.toFixed(0)} g ÷ ${result.teig.toFixed(0)} g = ${result.faktor.toFixed(2)}`,
                  "Der Faktor zeigt, wie oft die Grundrezeptur vergrößert werden muss.",
                ]}
              />
            </AnimatedResultBox>
          )}
        </Section>

        <Section title="Sauerteigrechner" color="from-orange-500 to-amber-500">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            <Input label="Zu versauernde Mehlmenge (%)" name="versauerndeMehlmenge" value={form.versauerndeMehlmenge} onChange={handleChange} />
            <Input label="Anstellgutmenge (%)" name="anstellgutmenge" value={form.anstellgutmenge} onChange={handleChange} />
          </div>

          <Button
            color="bg-orange-600"
            onClick={() => {
              if (!result) return;

              const roggenmehl = result.roggenmehl;
              const versauerndePercent = Number(form.versauerndeMehlmenge);
              const sauerMehl = roggenmehl * (versauerndePercent / 100);

              setResult((prev) => ({
                ...prev,
                sauerteig: {
                  roggenmehl,
                  sauerMehl,
                  loading: true,
                },
              }));

              triggerAnimation("sauerteig");

              setTimeout(() => {
                const anstellgutPercent = Number(form.anstellgutmenge);
                const anstellgut = sauerMehl * (anstellgutPercent / 100);

                setResult((prev) => ({
                  ...prev,
                  sauerteig: {
                    ...prev.sauerteig,
                    anstellgut,
                    loading: false,
                  },
                }));
              }, 1200);
            }}
          >
            Sauerteig berechnen
          </Button>

          {result?.sauerteig && (
            <AnimatedResultBox key={animationKeys.sauerteig}>
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                Sauerteig-Ergebnis
              </h3>

              <Result delay={100} title="Roggenmehl aus der Grundrezeptur" value={`${result.sauerteig.roggenmehl.toFixed(0)} g`} color="bg-orange-50 text-orange-800" />
              <Result delay={220} title="Zu versauernde Mehlmenge" value={`${result.sauerteig.sauerMehl.toFixed(0)} g`} color="bg-amber-50 text-amber-800" />

              {result.sauerteig.loading ? (
                <div className="result-slide rounded-xl bg-orange-50 text-orange-700 px-4 py-3 font-semibold" style={{ animationDelay: "340ms" }}>
                  Anstellgut wird berechnet...
                </div>
              ) : (
                <Result delay={340} title="Anstellgut" value={`${result.sauerteig.anstellgut.toFixed(0)} g`} color="bg-rose-50 text-rose-800" />
              )}

              <Explanation
                delay={600}
                lines={[
                  `Sauermehl: ${result.sauerteig.roggenmehl.toFixed(0)} × ${form.versauerndeMehlmenge}% = ${result.sauerteig.sauerMehl.toFixed(0)} g`,
                  "Zuerst wird berechnet, wie viel Roggenmehl versäuert wird.",
                  "Danach wird die Anstellgutmenge als Prozentwert dieser Sauermehlmenge berechnet.",
                ]}
              />
            </AnimatedResultBox>
          )}
        </Section>

        <Section title="Sauerteig-TA-Rechner" color="from-cyan-500 to-blue-500">
          <Input label="Sauerteig-TA" name="sauerTa" value={form.sauerTa} onChange={handleChange} />

          <Button
            color="bg-cyan-600"
            onClick={() => {
              if (!result?.sauerteig) return;

              const sauerMehl = result.sauerteig.sauerMehl;
              const ta = Number(form.sauerTa);
              const wasserPercent = ta - 100;
              const wasser = sauerMehl * (wasserPercent / 100);

              setResult((prev) => ({
                ...prev,
                sauerTaResult: {
                  wasser,
                  loading: true,
                },
              }));

              triggerAnimation("sauerTa");

              setTimeout(() => {
                setResult((prev) => ({
                  ...prev,
                  sauerTaResult: {
                    ...prev.sauerTaResult,
                    loading: false,
                    rezept: {
                      mehl: sauerMehl,
                      wasser,
                      anstellgut: prev.sauerteig.anstellgut,
                    },
                  },
                }));
              }, 1000);
            }}
          >
            Sauerteig-TA berechnen
          </Button>

          {result?.sauerTaResult && (
            <AnimatedResultBox key={animationKeys.sauerTa}>
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                Sauerteig-Wasser
              </h3>

              <Result delay={100} title="Wasser" value={`${result.sauerTaResult.wasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />

              {result.sauerTaResult.loading ? (
                <div className="result-slide rounded-xl bg-cyan-50 text-cyan-700 px-4 py-3 font-semibold mt-4" style={{ animationDelay: "300ms" }}>
                  Sauerteig-Rezept wird vorbereitet...
                </div>
              ) : (
                <div className="mt-6 sm:mt-8 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Sauerteig-Rezept
                  </h3>

                  <Result delay={300} title="Sauermehl" value={`${result.sauerTaResult.rezept.mehl.toFixed(0)} g`} color="bg-cyan-50 text-cyan-800" />
                  <Result delay={420} title="Wasser" value={`${result.sauerTaResult.rezept.wasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />
                  <Result delay={540} title="Anstellgut" value={`${result.sauerTaResult.rezept.anstellgut.toFixed(0)} g`} color="bg-blue-50 text-blue-800" />
                </div>
              )}

              <Explanation
                delay={750}
                lines={[
                  `Wasser: ${result.sauerteig.sauerMehl.toFixed(0)} × (${form.sauerTa} - 100)% = ${result.sauerTaResult.wasser.toFixed(0)} g`,
                  "Die Sauerteig-TA bestimmt die Wassermenge im Sauerteig.",
                  "Bei TA 190 beträgt der Wasseranteil 90 Prozent der Sauermehlmenge.",
                ]}
              />
            </AnimatedResultBox>
          )}
        </Section>

        <Section title="Brotteigrechner" color="from-emerald-500 to-teal-500">
          <p className="text-gray-500 mb-5 sm:mb-6 text-sm sm:text-base">
            Der Sauerteig wird von der Grundrezeptur abgezogen.
          </p>

          <Button
            color="bg-emerald-600"
            onClick={() => {
              if (!result || !result?.sauerteig || !result?.sauerTaResult) return;

              const brotRoggen = result.roggenmehl - result.sauerteig.sauerMehl;
              const brotWasser = result.wasser - result.sauerTaResult.wasser;

              const brotteigGesamt =
                brotRoggen +
                result.weizenmehl +
                brotWasser +
                result.hefe +
                result.salz;

              setResult((prev) => ({
                ...prev,
                brotteig: {
                  roggen: brotRoggen,
                  weizen: result.weizenmehl,
                  wasser: brotWasser,
                  hefe: result.hefe,
                  salz: result.salz,
                  gesamt: brotteigGesamt,
                },
              }));

              triggerAnimation("brotteig");
            }}
          >
            Brotteig berechnen
          </Button>

          {result?.brotteig && (
            <AnimatedResultBox key={animationKeys.brotteig}>
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                Brotteig-Rezept
              </h3>

              <Result delay={100} title="Roggenmehl" value={`${result.brotteig.roggen.toFixed(0)} g`} color="bg-emerald-50 text-emerald-800" />
              <Result delay={220} title="Weizenmehl" value={`${result.brotteig.weizen.toFixed(0)} g`} color="bg-yellow-50 text-yellow-800" />
              <Result delay={340} title="Wasser" value={`${result.brotteig.wasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />
              <Result delay={460} title="Hefe" value={`${result.brotteig.hefe.toFixed(0)} g`} color="bg-purple-50 text-purple-800" />
              <Result delay={580} title="Salz" value={`${result.brotteig.salz.toFixed(0)} g`} color="bg-slate-100 text-slate-800" />
              <Result delay={700} title="Gesamt Brotteig" value={`${result.brotteig.gesamt.toFixed(0)} g`} color="bg-teal-50 text-teal-800" />

              <Explanation
                delay={900}
                lines={[
                  `Roggenmehl im Brotteig: ${result.roggenmehl.toFixed(0)} - ${result.sauerteig.sauerMehl.toFixed(0)} = ${result.brotteig.roggen.toFixed(0)} g`,
                  `Wasser im Brotteig: ${result.wasser.toFixed(0)} - ${result.sauerTaResult.wasser.toFixed(0)} = ${result.brotteig.wasser.toFixed(0)} g`,
                  "Vom Roggenmehl und Wasser der Grundrezeptur werden die Mengen abgezogen, die bereits im Sauerteig enthalten sind.",
                ]}
              />
            </AnimatedResultBox>
          )}
        </Section>

        <Section title="Produktionsrezept" color="from-indigo-500 to-blue-500">
          <p className="text-gray-500 mb-5 sm:mb-6 text-sm sm:text-base">
            Sauerteig und Brotteig werden mit dem Faktor hochgerechnet.
          </p>

          <Button
            color="bg-indigo-600"
            onClick={() => {
              if (
                !result?.faktor ||
                !result?.brotteig ||
                !result?.sauerteig ||
                !result?.sauerTaResult
              ) {
                return;
              }

              const faktor = result.faktor;

              const sauerMehl = result.sauerteig.sauerMehl * faktor;
              const sauerWasser = result.sauerTaResult.wasser * faktor;
              const anstellgut = result.sauerteig.anstellgut * faktor;
              const sauerGesamt = sauerMehl + sauerWasser;

              setResult((prev) => ({
                ...prev,
                produktion: {
                  sauerteig: {
                    mehl: sauerMehl,
                    wasser: sauerWasser,
                    anstellgut,
                    gesamt: sauerGesamt,
                  },
                  loading: true,
                },
              }));

              triggerAnimation("produktion");

              setTimeout(() => {
                const brotRoggen = result.brotteig.roggen * faktor;
                const brotWeizen = result.brotteig.weizen * faktor;
                const brotWasser = result.brotteig.wasser * faktor;
                const brotHefe = result.brotteig.hefe * faktor;
                const brotSalz = result.brotteig.salz * faktor;

                const brotGesamt =
                  brotRoggen + brotWeizen + brotWasser + brotHefe + brotSalz;

                setResult((prev) => ({
                  ...prev,
                  produktion: {
                    ...prev.produktion,
                    brotteig: {
                      roggen: brotRoggen,
                      weizen: brotWeizen,
                      wasser: brotWasser,
                      hefe: brotHefe,
                      salz: brotSalz,
                      gesamt: brotGesamt,
                    },
                    loading: false,
                  },
                }));
              }, 1000);
            }}
          >
            Produktionsrezept berechnen
          </Button>

          {result?.produktion && (
            <div key={animationKeys.produktion} className="mt-8 sm:mt-10 space-y-6 sm:space-y-10">
              <AnimatedResultBox>
                <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                  Sauerteig-Rezept
                </h3>

                <Result delay={100} title="Sauermehl" value={`${result.produktion.sauerteig.mehl.toFixed(0)} g`} color="bg-indigo-50 text-indigo-800" />
                <Result delay={220} title="Wasser" value={`${result.produktion.sauerteig.wasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />
                <Result delay={340} title="Anstellgut" value={`${result.produktion.sauerteig.anstellgut.toFixed(0)} g`} color="bg-purple-50 text-purple-800" />
                <Result delay={460} title="Gesamt Sauerteig" value={`${result.produktion.sauerteig.gesamt.toFixed(0)} g`} color="bg-blue-50 text-blue-800" />

                <Explanation
                  delay={650}
                  lines={[
                    `Sauermehl: ${result.sauerteig.sauerMehl.toFixed(0)} × ${result.faktor.toFixed(2)} = ${result.produktion.sauerteig.mehl.toFixed(0)} g`,
                    "Alle Sauerteigwerte werden mit dem berechneten Faktor multipliziert.",
                  ]}
                />
              </AnimatedResultBox>

              {result.produktion.loading ? (
                <div className="result-slide bg-yellow-50 border border-yellow-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-yellow-700 font-semibold text-sm sm:text-base">
                  Brotteig-Rezept wird vorbereitet...
                </div>
              ) : (
                <AnimatedResultBox>
                  <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                    Brotteig-Rezept
                  </h3>

                  <Result delay={100} title="Roggenmehl" value={`${result.produktion.brotteig.roggen.toFixed(0)} g`} color="bg-cyan-50 text-cyan-800" />
                  <Result delay={220} title="Weizenmehl" value={`${result.produktion.brotteig.weizen.toFixed(0)} g`} color="bg-yellow-50 text-yellow-800" />
                  <Result delay={340} title="Wasser" value={`${result.produktion.brotteig.wasser.toFixed(0)} g`} color="bg-sky-50 text-sky-800" />
                  <Result delay={460} title="Hefe" value={`${result.produktion.brotteig.hefe.toFixed(0)} g`} color="bg-purple-50 text-purple-800" />
                  <Result delay={580} title="Salz" value={`${result.produktion.brotteig.salz.toFixed(0)} g`} color="bg-slate-100 text-slate-800" />
                  <Result delay={700} title="Gesamt Brotteig" value={`${result.produktion.brotteig.gesamt.toFixed(0)} g`} color="bg-blue-50 text-blue-800" />

                  <Explanation
                    delay={900}
                    lines={[
                      `Alle Brotteigwerte werden mit dem Faktor ${result.faktor.toFixed(2)} multipliziert.`,
                      "Auch der Brotteig wird mit dem Faktor multipliziert, damit die gewünschte Produktionsmenge entsteht.",
                    ]}
                  />
                </AnimatedResultBox>
              )}
            </div>
          )}
        </Section>

        <Section title="Gesamtteigrechner" color="from-pink-500 to-rose-500">
          <p className="text-gray-500 mb-5 sm:mb-6 text-sm sm:text-base">
            Gesamt Sauerteig plus Gesamt Brotteig, ohne Anstellgut.
          </p>

          <Button
            color="bg-pink-600"
            onClick={() => {
              if (!result?.produktion || !result.produktion.brotteig) return;

              const gesamtSauerteig =
                result.produktion.sauerteig.mehl +
                result.produktion.sauerteig.wasser;

              const brotGesamt = result.produktion.brotteig.gesamt;
              const gesamtTeig = gesamtSauerteig + brotGesamt;

              setResult((prev) => ({
                ...prev,
                gesamtteig: {
                  sauerteig: {
                    gesamt: gesamtSauerteig,
                  },
                  brotteig: {
                    gesamt: brotGesamt,
                  },
                  gesamtteig: gesamtTeig,
                },
              }));

              triggerAnimation("gesamtteig");
            }}
          >
            Gesamtteig berechnen
          </Button>

          {result?.gesamtteig && (
            <AnimatedResultBox key={animationKeys.gesamtteig}>
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                Gesamtteig-Ergebnis
              </h3>

              <Result delay={100} title="Gesamt Sauerteig" value={`${result.gesamtteig.sauerteig.gesamt.toFixed(0)} g`} color="bg-pink-50 text-pink-800" />
              <Result delay={220} title="Gesamt Brotteig" value={`${result.gesamtteig.brotteig.gesamt.toFixed(0)} g`} color="bg-rose-50 text-rose-800" />
              <Result delay={340} title="Gesamtteig" value={`${result.gesamtteig.gesamtteig.toFixed(0)} g`} color="bg-emerald-50 text-emerald-800" />

              <Explanation
                delay={550}
                lines={[
                  `Gesamtteig: ${result.gesamtteig.sauerteig.gesamt.toFixed(0)} + ${result.gesamtteig.brotteig.gesamt.toFixed(0)} = ${result.gesamtteig.gesamtteig.toFixed(0)} g`,
                  "Der Gesamtteig besteht aus dem fertigen Sauerteig ohne Anstellgut und dem berechneten Brotteig.",
                ]}
              />
            </AnimatedResultBox>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children, color }) {
  return (
    <div className="section-slide bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 border border-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">
        <span className={`inline-block w-3 h-8 rounded-full bg-gradient-to-b ${color} mr-3 align-middle`} />
        {title}
      </h2>

      {children}
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

function Button({ children, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full mt-5 sm:mt-6 ${color} text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:opacity-90 transition`}
    >
      {children}
    </button>
  );
}

function AnimatedResultBox({ children }) {
  return (
    <div className="section-slide mt-6 sm:mt-8 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
      {children}
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

      <span className="font-black text-lg sm:text-xl break-words">
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