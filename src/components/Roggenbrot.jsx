import React, { useState } from "react";

export default function App() {

  /*
    SABİT:
    TOTAL FLOUR = 1000g
  */

  const TOTAL_FLOUR = 1000;

  const emptyForm = {
    roggenPercent: "",
    weizenPercent: "",
    ta: "",
    hefe: "",
    salz: "",
    brotAnzahl: "",
    brotGewicht: "",
  };

  const [form, setForm] = useState(emptyForm);

  const [result, setResult] = useState(null);

  const [brotResult, setBrotResult] =
    useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /*
    GRUNDREZEPTUR HESABLA
  */

  const hesapla = () => {

    const roggenPercent =
      Number(form.roggenPercent);

    const weizenPercent =
      Number(form.weizenPercent);

    const ta =
      Number(form.ta);

    const hefePercent =
      Number(form.hefe);

    const salzPercent =
      Number(form.salz);

    /*
      ROGGENMEHL
    */

    const roggenmehl =
      (TOTAL_FLOUR * roggenPercent) / 100;

    /*
      WEIZENMEHL
    */

    const weizenmehl =
      (TOTAL_FLOUR * weizenPercent) / 100;

    /*
      TA

      181 -> 81% su
    */

    const wasser =
      TOTAL_FLOUR *
      ((ta - 100) / 100);

    /*
      HEFE
    */

    const hefe =
      (TOTAL_FLOUR * hefePercent) / 100;

    /*
      SALZ
    */

    const salz =
      (TOTAL_FLOUR * salzPercent) / 100;

    /*
      TOTAL TEIG
    */

    const teig =
      roggenmehl +
      weizenmehl +
      wasser +
      hefe +
      salz;

    setResult({
      roggenmehl,
      weizenmehl,
      wasser,
      hefe,
      salz,
      teig,
    });
  };

  /*
    BROT MENGE HESABLA

    məsələn:
    9 brot
    hər biri 600g

    9 × 600 = 5400g
  */

  const brotHesapla = () => {

    const anzahl =
      Number(form.brotAnzahl);

    const gewicht =
      Number(form.brotGewicht);

    const totalTeig =
      anzahl * gewicht;

    setBrotResult(totalTeig);
  };

  /*
    SIFIRLA
  */

  const sifirla = () => {
    setForm(emptyForm);
    setResult(null);
    setBrotResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* ================================= */}
        {/* GRUNDREZEPTUR */}
        {/* ================================= */}

        <div className="bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

          {/* LEFT */}
          <div className="p-8">

            <h1 className="text-4xl font-bold mb-8">
              Brot Rechner
            </h1>

            <div className="space-y-5">

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
                label="TA"
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

            <div className="flex gap-4 mt-8">

              <button
                onClick={hesapla}
                className="flex-1 bg-black text-white py-4 rounded-2xl text-xl font-bold hover:opacity-90 transition"
              >
                Hesabla
              </button>

              <button
                onClick={sifirla}
                className="flex-1 bg-red-500 text-white py-4 rounded-2xl text-xl font-bold hover:opacity-90 transition"
              >
                Sıfırla
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-gray-50 p-8 border-l border-gray-200">

            <h2 className="text-3xl font-bold mb-8">
              Grundrezeptur
            </h2>

            {result ? (
              <div className="space-y-4 text-lg">

                <Result
                  title="Roggenmehl"
                  value={`${result.roggenmehl.toFixed(0)} g`}
                />

                <Result
                  title="Weizenmehl"
                  value={`${result.weizenmehl.toFixed(0)} g`}
                />

                <Result
                  title="Wasser"
                  value={`${result.wasser.toFixed(0)} g`}
                />

                <Result
                  title="Hefe"
                  value={`${result.hefe.toFixed(0)} g`}
                />

                <Result
                  title="Salz"
                  value={`${result.salz.toFixed(0)} g`}
                />

                <Result
                  title="Teig"
                  value={`${result.teig.toFixed(0)} g`}
                />

              </div>
            ) : (
              <div className="text-gray-400 text-lg">
                Hesablama nəticəsi burada görünəcək
              </div>
            )}

          </div>

        </div>

        {/* ================================= */}
        {/* BROT MENGE RECHNER */}
        {/* ================================= */}

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Brot Menge Rechner
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <Input
              label="Brot Anzahl"
              name="brotAnzahl"
              value={form.brotAnzahl}
              onChange={handleChange}
            />

            <Input
              label="Bir Brot Gewicht (g)"
              name="brotGewicht"
              value={form.brotGewicht}
              onChange={handleChange}
            />

          </div>

          <button
            onClick={brotHesapla}
            className="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl text-xl font-bold hover:opacity-90 transition"
          >
            Brot Hesabla
          </button>

          {brotResult && (

            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">

              <div className="flex justify-between items-center text-xl">

                <span className="font-semibold">
                  Lazım olan ümumi xəmir:
                </span>

                <span className="font-bold">
                  {brotResult.toFixed(0)} g
                </span>

              </div>

            </div>

          )}

        </div>



{/* ================================= */}
{/* FAKTOR RECHNER */}
{/* ================================= */}

<div className="bg-white rounded-3xl shadow-2xl p-8">

  <h2 className="text-3xl font-bold mb-8">
    Faktor Rechner
  </h2>

  <p className="text-gray-500 mb-6">
    Ümumi xəmir / Grundrezeptur Teig
  </p>

  <button
    onClick={() => {

      /*
        məsələn:

        Brot Menge Rechner:
        5400g

        Grundrezeptur:
        1880g

        Faktor:
        5400 / 1880 = 2.87
      */

      if (!result || !brotResult) return;

      const faktor =
        brotResult / result.teig;

      setResult((prev) => ({
        ...prev,
        faktor,
      }));

    }}
    className="w-full bg-green-600 text-white py-4 rounded-2xl text-xl font-bold hover:opacity-90 transition"
  >
    Faktor Hesabla
  </button>

  {result?.faktor && (

    <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">

      <div className="flex justify-between items-center text-2xl">

        <span className="font-semibold">
          Faktor:
        </span>

        <span className="font-bold">
          {result.faktor.toFixed(2)}
        </span>

      </div>

      <div className="mt-4 text-gray-500">
        Formula:
        {" "}
        {brotResult.toFixed(0)}
        {" / "}
        {result.teig.toFixed(0)}
      </div>

    </div>

  )}

</div>

{/* ================================= */}
{/* SAUERTEIG RECHNER */}
{/* ================================= */}

<div className="bg-white rounded-3xl shadow-2xl p-8">

  <h2 className="text-3xl font-bold mb-8">
    Sauerteig Rechner
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

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

  <button
    onClick={() => {

      /*
        əvvəlcə Grundrezeptur hesablanmalıdır
      */

      if (!result) return;

      /*
        Grundrezepturdan gələn Roggenmehl
      */

      const roggenmehl =
        result.roggenmehl;

      /*
        məsələn:

        Roggenmehl = 700g

        Zu versauernde Mehlmenge = 50%

        700 × 50% = 350g
      */

      const versauerndePercent =
        Number(form.versauerndeMehlmenge);

      const sauerMehl =
        roggenmehl *
        (versauerndePercent / 100);

      /*
        əvvəlcə unu göstər
      */

      setResult((prev) => ({
        ...prev,

        sauerteig: {
          roggenmehl,
          sauerMehl,
          loading: true,
        },
      }));

      /*
        2 saniyə sonra
        Anstellgut hesabla
      */

      setTimeout(() => {

        /*
          məsələn:

          Sauermehl = 350g

          Anstellgut = 10%

          350 × 10% = 35g
        */

        const anstellgutPercent =
          Number(form.anstellgutmenge);

        const anstellgut =
          sauerMehl *
          (anstellgutPercent / 100);

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
    className="w-full mt-6 bg-orange-600 text-white py-4 rounded-2xl text-xl font-bold hover:opacity-90 transition"
  >
    Sauerteig Hesabla
  </button>

  {result?.sauerteig && (

    <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">

      <h3 className="text-2xl font-bold mb-6">
        Sauerteig Ergebnis
      </h3>

      <div className="space-y-4 text-lg">

        <Result
          title="Grundrezeptur Roggenmehl"
          value={`${result.sauerteig.roggenmehl.toFixed(0)} g`}
        />

        <Result
          title="Zu versauernde Mehlmenge"
          value={`${result.sauerteig.sauerMehl.toFixed(0)} g`}
        />

        {/* 2 saniyə sonra görünəcək */}

        {result.sauerteig.loading ? (

          <div className="text-orange-500 font-semibold">
            Anstellgut hesablanır...
          </div>

        ) : (

          <Result
            title="Anstellgut"
            value={`${result.sauerteig.anstellgut.toFixed(0)} g`}
          />

        )}

      </div>

    </div>

  )}

</div>

{/* ================================= */}
{/* SAUERTEIG TA RECHNER */}
{/* ================================= */}

<div className="bg-white rounded-3xl shadow-2xl p-8">

  <h2 className="text-3xl font-bold mb-8">
    Sauerteig TA Rechner
  </h2>

  <div className="grid md:grid-cols-1 gap-5">

    <Input
      label="Sauerteig TA"
      name="sauerTa"
      value={form.sauerTa}
      onChange={handleChange}
    />

  </div>

  <button
    onClick={() => {

      /*
        əvvəlcə Sauerteig hesablanmalıdır
      */

      if (!result?.sauerteig) return;

      /*
        yuxarıda hesablanan Sauermehl
      */

      const sauerMehl =
        result.sauerteig.sauerMehl;

      /*
        məsələn:

        TA 190

        190 - 100 = 90%

        deməli:
        su = unun 90%-i
      */

      const ta =
        Number(form.sauerTa);

      /*
        su faizi
      */

      const wasserPercent =
        ta - 100;

      /*
        məsələn:

        Sauermehl = 350g

        350 × 90%
      */

      const wasser =
        sauerMehl *
        (wasserPercent / 100);

      /*
        əvvəlcə suyu göstər
      */

      setResult((prev) => ({
        ...prev,

        sauerTaResult: {
          wasser,
          loading: true,
        },
      }));

      /*
        1 saniyə sonra
        resepti göstər
      */

      setTimeout(() => {

        setResult((prev) => ({
          ...prev,

          sauerTaResult: {
            ...prev.sauerTaResult,

            loading: false,

            rezept: {
              mehl: sauerMehl,
              wasser,
              anstellgut:
                prev.sauerteig.anstellgut,
            },
          },
        }));

      }, 1000);

    }}
    className="w-full mt-6 bg-cyan-600 text-white py-4 rounded-2xl text-xl font-bold hover:opacity-90 transition"
  >
    Sauerteig TA Hesabla
  </button>

  {result?.sauerTaResult && (

    <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">

      <h3 className="text-2xl font-bold mb-6">
        Sauerteig Wasser
      </h3>

      <div className="space-y-4 text-lg">

        <Result
          title="Sauerteig Wasser"
          value={`${result.sauerTaResult.wasser.toFixed(0)} g`}
        />

      </div>

      {/* loading */}

      {result.sauerTaResult.loading ? (

        <div className="mt-6 text-cyan-600 font-semibold">
          Sauerteig Rezepti hazırlanır...
        </div>

      ) : (

        <div className="mt-8">

          <h3 className="text-2xl font-bold mb-6">
            Sauerteig Rezept
          </h3>

          <div className="space-y-4 text-lg">

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

        </div>

      )}

    </div>

  )}

</div>

{/* ================================= */}
{/* BROTTEIG RECHNER */}
{/* ================================= */}

<div className="bg-white rounded-3xl shadow-2xl p-8">

  <h2 className="text-3xl font-bold mb-8">
    Brotteig Rechner
  </h2>

  <p className="text-gray-500 mb-6">
    Grundrezepturdan Sauerteig çıxılır və əsas Brotteig hesablanır
  </p>

  <button
    onClick={() => {

      /*
        lazım olanlar:

        1. Grundrezeptur
        2. Sauerteig Rechner
        3. Sauerteig TA Rechner
      */

      if (
        !result ||
        !result?.sauerteig ||
        !result?.sauerTaResult
      ) return;

      /*
        GRUNDREZEPTUR
      */

      const grundRoggen =
        result.roggenmehl;

      const grundWeizen =
        result.weizenmehl;

      const grundWasser =
        result.wasser;

      const grundHefe =
        result.hefe;

      const grundSalz =
        result.salz;

      /*
        SAUERTEIG
      */

      const sauerMehl =
        result.sauerteig.sauerMehl;

      const sauerWasser =
        result.sauerTaResult.wasser;

      /*
        BROTTEIG

        Grund - Sauerteig
      */

      const brotRoggen =
        grundRoggen - sauerMehl;

      const brotWasser =
        grundWasser - sauerWasser;

      /*
        ümumi brotteig
      */

      const brotteigGesamt =
        brotRoggen +
        grundWeizen +
        brotWasser +
        grundHefe +
        grundSalz;

      /*
        nəticə
      */

      setResult((prev) => ({
        ...prev,

        brotteig: {
          roggen: brotRoggen,
          weizen: grundWeizen,
          wasser: brotWasser,
          hefe: grundHefe,
          salz: grundSalz,
          gesamt: brotteigGesamt,
        },
      }));

    }}
    className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-xl font-bold hover:opacity-90 transition"
  >
    Brotteig Hesabla
  </button>

  {result?.brotteig && (

    <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">

      <h3 className="text-2xl font-bold mb-6">
        Brotteig Rezept
      </h3>

      <div className="space-y-4 text-lg">

        <Result
          title="Roggenmehl"
          value={`${result.brotteig.roggen.toFixed(0)} g`}
        />

        <Result
          title="Weizenmehl"
          value={`${result.brotteig.weizen.toFixed(0)} g`}
        />

        <Result
          title="Wasser"
          value={`${result.brotteig.wasser.toFixed(0)} g`}
        />

        <Result
          title="Hefe"
          value={`${result.brotteig.hefe.toFixed(0)} g`}
        />

        <Result
          title="Salz"
          value={`${result.brotteig.salz.toFixed(0)} g`}
        />

        <Result
          title="Brotteig Gesamt"
          value={`${result.brotteig.gesamt.toFixed(0)} g`}
        />

      </div>

    </div>

  )}

</div>

{/* ================================= */}
{/* PRODUKTIONS REZEPT */}
{/* ================================= */}

<div className="bg-white rounded-3xl shadow-2xl p-8">

  <h2 className="text-3xl font-bold mb-8">
    Produktions Rezept
  </h2>

  <p className="text-gray-500 mb-6">
    Faktor ilə Sauerteig və Brotteig ümumi Rezept hesablanır
  </p>

  <button
    onClick={() => {

      /*
        lazım olanlar:

        1. Faktor
        2. Brotteig
        3. Sauerteig
      */

      if (
        !result?.faktor ||
        !result?.brotteig ||
        !result?.sauerteig ||
        !result?.sauerTaResult
      ) return;

      const faktor =
        result.faktor;

      /*
        =================================
        SAUERTEIG
        =================================
      */

      const sauerMehl =
        result.sauerteig.sauerMehl * faktor;

      const sauerWasser =
        result.sauerTaResult.wasser * faktor;

      const anstellgut =
        result.sauerteig.anstellgut * faktor;

      /*
        GESAMT SAUERTEIG

        anstellgut çıxılır
      */

      const sauerGesamt =
        sauerMehl +
        sauerWasser;

      /*
        əvvəlcə Sauerteig göstər
      */

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

      /*
        =================================
        1 SANİYƏ SONRA
        BROTTEIG
        =================================
      */

      setTimeout(() => {

        const brotRoggen =
          result.brotteig.roggen * faktor;

        const brotWeizen =
          result.brotteig.weizen * faktor;

        const brotWasser =
          result.brotteig.wasser * faktor;

        const brotHefe =
          result.brotteig.hefe * faktor;

        const brotSalz =
          result.brotteig.salz * faktor;

        /*
          GESAMT BROTTEIG
        */

        const brotGesamt =
          brotRoggen +
          brotWeizen +
          brotWasser +
          brotHefe +
          brotSalz;

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
    className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-xl font-bold hover:opacity-90 transition"
  >
    Produktions Rezept Hesabla
  </button>

  {result?.produktion && (

    <div className="mt-10 space-y-10">

      {/* ================================= */}
      {/* SAUERTEIG */}
      {/* ================================= */}

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">

        <h3 className="text-2xl font-bold mb-6">
          Sauerteig Rezept
        </h3>

        <div className="space-y-4 text-lg">

          <Result
            title="Sauermehl"
            value={`${result.produktion.sauerteig.mehl.toFixed(0)} g`}
          />

          <Result
            title="Wasser"
            value={`${result.produktion.sauerteig.wasser.toFixed(0)} g`}
          />

          <Result
            title="Anstellgut"
            value={`${result.produktion.sauerteig.anstellgut.toFixed(0)} g`}
          />

          <Result
            title="Gesamt Sauerteig"
            value={`${result.produktion.sauerteig.gesamt.toFixed(0)} g`}
          />

        </div>

      </div>

      {/* ================================= */}
      {/* LOADING */}
      {/* ================================= */}

      {result.produktion.loading ? (

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-yellow-700 font-semibold">
          Brotteig Rezept hazırlanır...
        </div>

      ) : (

        /* ================================= */
        /* BROTTEIG */
        /* ================================= */

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">

          <h3 className="text-2xl font-bold mb-6">
            Brotteig Rezept
          </h3>

          <div className="space-y-4 text-lg">

            <Result
              title="Roggenmehl"
              value={`${result.produktion.brotteig.roggen.toFixed(0)} g`}
            />

            <Result
              title="Weizenmehl"
              value={`${result.produktion.brotteig.weizen.toFixed(0)} g`}
            />

            <Result
              title="Wasser"
              value={`${result.produktion.brotteig.wasser.toFixed(0)} g`}
            />

            <Result
              title="Hefe"
              value={`${result.produktion.brotteig.hefe.toFixed(0)} g`}
            />

            <Result
              title="Salz"
              value={`${result.produktion.brotteig.salz.toFixed(0)} g`}
            />

            <Result
              title="Gesamt Brotteig"
              value={`${result.produktion.brotteig.gesamt.toFixed(0)} g`}
            />

          </div>

        </div>

      )}

    </div>

  )}

</div>

{/* ================================= */}
{/* GESAMTTEIG RECHNER (OHNE ANSTELLGUT) */}
{/* ================================= */}

<div className="bg-white rounded-3xl shadow-2xl p-8">

  <h2 className="text-3xl font-bold mb-8">
    Gesamtteig Rechner
  </h2>

  <p className="text-gray-500 mb-6">
    Gesamt Sauerteig + Gesamt Brotteig (ohne Anstellgut)
  </p>

  <button
    onClick={() => {

      if (!result?.produktion) return;

      /*
        =================================
        SAUERTEIG (OHNE ANSTELLGUT)
        =================================
      */

      const sauerMehl =
        result.produktion.sauerteig.mehl;

      const sauerWasser =
        result.produktion.sauerteig.wasser;

      /*
        yalnız un + su
      */

      const gesamtSauerteig =
        sauerMehl + sauerWasser;

      /*
        =================================
        BROTTEIG
        =================================
      */

      const brotGesamt =
        result.produktion.brotteig.gesamt;

      /*
        =================================
        GESAMTTEIG
        =================================
      */

      const gesamtTeig =
        gesamtSauerteig + brotGesamt;

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
    className="w-full bg-pink-600 text-white py-4 rounded-2xl text-xl font-bold hover:opacity-90 transition"
  >
    Gesamtteig Hesabla
  </button>

  {result?.gesamtteig && (

    <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">

      <h3 className="text-2xl font-bold mb-6">
        Gesamtteig Ergebnis
      </h3>

      <div className="space-y-4 text-lg">

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

      </div>

    </div>

  )}

</div>
        

      </div>

    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-700">
        {label}
      </label>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

function Result({ title, value }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
      <span>{title}</span>

      <span className="font-bold">
        {value}
      </span>
    </div>
  );
}