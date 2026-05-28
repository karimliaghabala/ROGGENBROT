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
  const [brotResult, setBrotResult] = useState(null);

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
  };

  const berechneBrotmenge = () => {
    const anzahl = Number(form.brotAnzahl);
    const gewicht = Number(form.brotGewicht);
    const totalTeig = anzahl * gewicht;

    setBrotResult(totalTeig);
  };

  const zuruecksetzen = () => {
    setForm(emptyForm);
    setResult(null);
    setBrotResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl grid md:grid-cols-2 overflow-hidden">
          <div className="p-4 sm:p-8">
            <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">
              Brotrechner
            </h1>

            <div className="space-y-4 sm:space-y-5">
              <Input
                label="Roggenmehl (%)"
                name="roggenPercent"
                value={form.roggenPercent}
                onChange={handleChange}
              />

              <Input
                label="Weizenmehl (%)"
                name="weizenPercent"
                value={form.weizenPercent}
                onChange={handleChange}
              />

              <Input
                label="Teigausbeute (TA)"
                name="ta"
                value={form.ta}
                onChange={handleChange}
              />

              <Input
                label="Hefe (%)"
                name="hefe"
                value={form.hefe}
                onChange={handleChange}
              />

              <Input
                label="Salz (%)"
                name="salz"
                value={form.salz}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                onClick={berechneGrundrezeptur}
                className="flex-1 bg-black text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:opacity-90 transition"
              >
                Berechnen
              </button>

              <button
                onClick={zuruecksetzen}
                className="flex-1 bg-red-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:opacity-90 transition"
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
              <div className="space-y-4 text-base sm:text-lg">
                <Result title="Roggenmehl" value={`${result.roggenmehl.toFixed(0)} g`} />
                <Result title="Weizenmehl" value={`${result.weizenmehl.toFixed(0)} g`} />
                <Result title="Wasser" value={`${result.wasser.toFixed(0)} g`} />
                <Result title="Hefe" value={`${result.hefe.toFixed(0)} g`} />
                <Result title="Salz" value={`${result.salz.toFixed(0)} g`} />
                <Result title="Gesamtteig" value={`${result.teig.toFixed(0)} g`} />

                <Explanation>
                  Die Grundrezeptur basiert auf 1000 g Gesamtmehl. Die Mehlanteile
                  werden prozentual berechnet. Die Wassermenge ergibt sich aus der
                  Teigausbeute: TA minus 100 ergibt den Wasseranteil in Prozent.
                </Explanation>
              </div>
            ) : (
              <div className="text-gray-400 text-base sm:text-lg">
                Das Berechnungsergebnis wird hier angezeigt.
              </div>
            )}
          </div>
        </div>

        <Section title="Brotmengenrechner">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            <Input
              label="Anzahl der Brote"
              name="brotAnzahl"
              value={form.brotAnzahl}
              onChange={handleChange}
            />

            <Input
              label="Gewicht pro Brot (g)"
              name="brotGewicht"
              value={form.brotGewicht}
              onChange={handleChange}
            />
          </div>

          <Button color="bg-blue-600" onClick={berechneBrotmenge}>
            Brotmenge berechnen
          </Button>

          {brotResult !== null && (
            <ResultBox>
              <Result
                title="Benötigte Gesamtteigmenge"
                value={`${brotResult.toFixed(0)} g`}
              />

              <Explanation>
                Die benötigte Teigmenge wird berechnet, indem die Anzahl der Brote
                mit dem gewünschten Gewicht pro Brot multipliziert wird.
              </Explanation>
            </ResultBox>
          )}
        </Section>

        <Section title="Faktorrechner">
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
            }}
          >
            Faktor berechnen
          </Button>

          {result?.faktor && (
            <ResultBox>
              <Result title="Faktor" value={result.faktor.toFixed(2)} />

              <Explanation>
                Der Faktor zeigt, wie oft die Grundrezeptur vergrößert werden muss.
                Formel: {brotResult.toFixed(0)} g / {result.teig.toFixed(0)} g.
              </Explanation>
            </ResultBox>
          )}
        </Section>

        <Section title="Sauerteigrechner">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            <Input
              label="Zu versauernde Mehlmenge (%)"
              name="versauerndeMehlmenge"
              value={form.versauerndeMehlmenge}
              onChange={handleChange}
            />

            <Input
              label="Anstellgutmenge (%)"
              name="anstellgutmenge"
              value={form.anstellgutmenge}
              onChange={handleChange}
            />
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
              }, 2000);
            }}
          >
            Sauerteig berechnen
          </Button>

          {result?.sauerteig && (
            <ResultBox>
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                Sauerteig-Ergebnis
              </h3>

              <div className="space-y-4 text-base sm:text-lg">
                <Result
                  title="Roggenmehl aus der Grundrezeptur"
                  value={`${result.sauerteig.roggenmehl.toFixed(0)} g`}
                />

                <Result
                  title="Zu versauernde Mehlmenge"
                  value={`${result.sauerteig.sauerMehl.toFixed(0)} g`}
                />

                {result.sauerteig.loading ? (
                  <div className="text-orange-500 font-semibold">
                    Anstellgut wird berechnet...
                  </div>
                ) : (
                  <Result
                    title="Anstellgut"
                    value={`${result.sauerteig.anstellgut.toFixed(0)} g`}
                  />
                )}
              </div>

              <Explanation>
                Zuerst wird berechnet, wie viel Roggenmehl versäuert wird. Danach
                wird die Anstellgutmenge als Prozentwert dieser Sauermehlmenge
                berechnet.
              </Explanation>
            </ResultBox>
          )}
        </Section>

        <Section title="Sauerteig-TA-Rechner">
          <Input
            label="Sauerteig-TA"
            name="sauerTa"
            value={form.sauerTa}
            onChange={handleChange}
          />

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
            <ResultBox>
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                Sauerteig-Wasser
              </h3>

              <Result
                title="Wasser"
                value={`${result.sauerTaResult.wasser.toFixed(0)} g`}
              />

              {result.sauerTaResult.loading ? (
                <div className="mt-5 sm:mt-6 text-cyan-600 font-semibold">
                  Sauerteig-Rezept wird vorbereitet...
                </div>
              ) : (
                <div className="mt-6 sm:mt-8 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Sauerteig-Rezept
                  </h3>

                  <Result
                    title="Sauermehl"
                    value={`${result.sauerTaResult.rezept.mehl.toFixed(0)} g`}
                  />

                  <Result
                    title="Wasser"
                    value={`${result.sauerTaResult.rezept.wasser.toFixed(0)} g`}
                  />

                  <Result
                    title="Anstellgut"
                    value={`${result.sauerTaResult.rezept.anstellgut.toFixed(0)} g`}
                  />
                </div>
              )}

              <Explanation>
                Die Sauerteig-TA bestimmt die Wassermenge im Sauerteig. Bei TA 190
                beträgt der Wasseranteil 90 Prozent der Sauermehlmenge.
              </Explanation>
            </ResultBox>
          )}
        </Section>

        <Section title="Brotteigrechner">
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
            }}
          >
            Brotteig berechnen
          </Button>

          {result?.brotteig && (
            <ResultBox>
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                Brotteig-Rezept
              </h3>

              <Result title="Roggenmehl" value={`${result.brotteig.roggen.toFixed(0)} g`} />
              <Result title="Weizenmehl" value={`${result.brotteig.weizen.toFixed(0)} g`} />
              <Result title="Wasser" value={`${result.brotteig.wasser.toFixed(0)} g`} />
              <Result title="Hefe" value={`${result.brotteig.hefe.toFixed(0)} g`} />
              <Result title="Salz" value={`${result.brotteig.salz.toFixed(0)} g`} />
              <Result title="Gesamt Brotteig" value={`${result.brotteig.gesamt.toFixed(0)} g`} />

              <Explanation>
                Vom Roggenmehl und Wasser der Grundrezeptur werden die Mengen
                abgezogen, die bereits im Sauerteig enthalten sind.
              </Explanation>
            </ResultBox>
          )}
        </Section>

        <Section title="Produktionsrezept">
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
            <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-10">
              <ResultBox>
                <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                  Sauerteig-Rezept
                </h3>

                <Result title="Sauermehl" value={`${result.produktion.sauerteig.mehl.toFixed(0)} g`} />
                <Result title="Wasser" value={`${result.produktion.sauerteig.wasser.toFixed(0)} g`} />
                <Result title="Anstellgut" value={`${result.produktion.sauerteig.anstellgut.toFixed(0)} g`} />
                <Result title="Gesamt Sauerteig" value={`${result.produktion.sauerteig.gesamt.toFixed(0)} g`} />

                <Explanation>
                  Alle Sauerteigwerte werden mit dem berechneten Faktor
                  multipliziert.
                </Explanation>
              </ResultBox>

              {result.produktion.loading ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-yellow-700 font-semibold text-sm sm:text-base">
                  Brotteig-Rezept wird vorbereitet...
                </div>
              ) : (
                <ResultBox>
                  <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                    Brotteig-Rezept
                  </h3>

                  <Result title="Roggenmehl" value={`${result.produktion.brotteig.roggen.toFixed(0)} g`} />
                  <Result title="Weizenmehl" value={`${result.produktion.brotteig.weizen.toFixed(0)} g`} />
                  <Result title="Wasser" value={`${result.produktion.brotteig.wasser.toFixed(0)} g`} />
                  <Result title="Hefe" value={`${result.produktion.brotteig.hefe.toFixed(0)} g`} />
                  <Result title="Salz" value={`${result.produktion.brotteig.salz.toFixed(0)} g`} />
                  <Result title="Gesamt Brotteig" value={`${result.produktion.brotteig.gesamt.toFixed(0)} g`} />

                  <Explanation>
                    Auch der Brotteig wird mit dem Faktor multipliziert, damit die
                    gewünschte Produktionsmenge entsteht.
                  </Explanation>
                </ResultBox>
              )}
            </div>
          )}
        </Section>

        <Section title="Gesamtteigrechner">
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
            }}
          >
            Gesamtteig berechnen
          </Button>

          {result?.gesamtteig && (
            <ResultBox>
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                Gesamtteig-Ergebnis
              </h3>

              <Result
                title="Gesamt Sauerteig"
                value={`${result.gesamtteig.sauerteig.gesamt.toFixed(0)} g`}
              />

              <Result
                title="Gesamt Brotteig"
                value={`${result.gesamtteig.brotteig.gesamt.toFixed(0)} g`}
              />

              <Result
                title="Gesamtteig"
                value={`${result.gesamtteig.gesamtteig.toFixed(0)} g`}
              />

              <Explanation>
                Der Gesamtteig besteht aus dem fertigen Sauerteig ohne Anstellgut
                und dem berechneten Brotteig.
              </Explanation>
            </ResultBox>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
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
        className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-black"
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

function ResultBox({ children }) {
  return (
    <div className="mt-6 sm:mt-8 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
      {children}
    </div>
  );
}

function Explanation({ children }) {
  return (
    <div className="mt-5 sm:mt-6 rounded-xl bg-white border border-gray-200 p-4 text-sm sm:text-base text-gray-600 leading-relaxed">
      <span className="font-bold text-gray-800">Erklärung: </span>
      {children}
    </div>
  );
}

function Result({ title, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 border-b border-gray-200 pb-3 text-base sm:text-lg">
      <span className="text-gray-700">{title}</span>

      <span className="font-bold text-gray-900 break-words">
        {value}
      </span>
    </div>
  );
}