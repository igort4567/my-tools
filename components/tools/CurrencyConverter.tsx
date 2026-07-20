"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { CalcInput } from "@/components/tools/CalcInput";
import { UnitSelect } from "@/components/tools/UnitSelect";
import { ResultReadout } from "@/components/tools/ResultReadout";
import { SwapIcon } from "@/components/tools/SwapIcon";
import { formatConversionResult } from "@/lib/converters/format";
import {
  FALLBACK_RATES,
  FALLBACK_RATES_DATE,
} from "@/lib/converters/currency-fallback";
import type { ConversionUnit } from "@/lib/converters/types";

const BASE_CURRENCY = "RUB";
const BASE_LOWER = BASE_CURRENCY.toLowerCase();

// Основной источник — jsDelivr CDN (специально предназначен для запросов
// прямо из браузера, отдаёт корректные CORS-заголовки). Резервное зеркало —
// официальный fallback этого же проекта на Cloudflare Pages, на случай если
// jsDelivr недоступен. См. https://github.com/fawazahmed0/exchange-api
const PRIMARY_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${BASE_LOWER}.json`;
const MIRROR_URL = `https://latest.currency-api.pages.dev/v1/currencies/${BASE_LOWER}.json`;

const CURRENCY_LABELS: Record<string, string> = {
  RUB: "российский рубль, RUB",
  USD: "доллар США, USD",
  EUR: "евро, EUR",
  CNY: "юань, CNY",
  GBP: "фунт стерлингов, GBP",
  JPY: "японская йена, JPY",
  KZT: "тенге, KZT",
  BYN: "белорусский рубль, BYN",
  TRY: "турецкая лира, TRY",
  CHF: "швейцарский франк, CHF",
  AED: "дирхам ОАЭ, AED",
};

/** rates — сколько единиц каждой валюты в одном BASE_CURRENCY (рубле) */
function buildUnits(rates: Record<string, number>): ConversionUnit[] {
  return Object.keys(CURRENCY_LABELS)
    .filter((code) => code === BASE_CURRENCY || typeof rates[code] === "number")
    .map((code) => {
      const rate = code === BASE_CURRENCY ? 1 : rates[code];
      return {
        id: code,
        label: CURRENCY_LABELS[code],
        toBase: (v: number) => v / rate,
        fromBase: (v: number) => v * rate,
      };
    });
}

/**
 * Ответ API имеет вид { date: "2026-07-19", rub: { usd: 0.0113, eur: ... } } —
 * код базовой валюты и коды остальных валют в нижнем регистре. Приводим
 * коды к верхнему регистру, под которым они заведены в CURRENCY_LABELS.
 */
async function fetchRatesFrom(
  url: string,
): Promise<{ rates: Record<string, number>; date: string | null }> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("bad response");
  const data = await res.json();
  const raw = data?.[BASE_LOWER];
  if (!raw || typeof raw !== "object") throw new Error("no rates");

  const rates: Record<string, number> = {};
  for (const [code, rate] of Object.entries(raw)) {
    if (typeof rate === "number") rates[code.toUpperCase()] = rate;
  }
  return { rates, date: typeof data.date === "string" ? data.date : null };
}

type Status = "loading" | "live" | "fallback";

export function CurrencyConverter() {
  const [status, setStatus] = useState<Status>("loading");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const [value, setValue] = useState("100");
  const [fromId, setFromId] = useState("USD");
  const [toId, setToId] = useState("RUB");

  const valueId = useId();
  const fromSelectId = useId();
  const toSelectId = useId();

  async function loadRates() {
    setStatus("loading");
    try {
      let result;
      try {
        result = await fetchRatesFrom(PRIMARY_URL);
      } catch {
        result = await fetchRatesFrom(MIRROR_URL);
      }
      setRates(result.rates);
      setUpdatedAt(
        result.date
          ? new Date(result.date).toLocaleDateString("ru-RU")
          : new Date().toLocaleDateString("ru-RU"),
      );
      setStatus("live");
    } catch {
      setRates(FALLBACK_RATES);
      setUpdatedAt(FALLBACK_RATES_DATE);
      setStatus("fallback");
    }
  }

  useEffect(() => {
    // Первая загрузка курсов при монтировании; loadRates переиспользуется
    // также кнопкой "обновить".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadRates();
  }, []);

  const units = useMemo(() => (rates ? buildUnits(rates) : []), [rates]);
  const fromUnit = units.find((u) => u.id === fromId);
  const toUnit = units.find((u) => u.id === toId);

  const numericValue = parseFloat(value.replace(",", "."));
  const result =
    fromUnit && toUnit && !Number.isNaN(numericValue)
      ? toUnit.fromBase(fromUnit.toBase(numericValue))
      : null;

  function swap() {
    setFromId(toId);
    setToId(fromId);
  }

  if (status === "loading") {
    return (
      <div className="rounded-xl border border-line bg-paper p-5">
        <p className="text-sm text-ink-soft">Загружаем актуальные курсы валют…</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <CalcInput
          id={valueId}
          label="сумма"
          value={value}
          onChange={setValue}
        />
        <UnitSelect
          id={fromSelectId}
          label="из"
          value={fromId}
          onChange={setFromId}
          units={units}
        />
      </div>

      <div className="my-3 flex justify-center">
        <button
          type="button"
          onClick={swap}
          aria-label="Поменять валюты местами"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-primary hover:text-primary"
        >
          <SwapIcon />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ResultReadout
          label="результат"
          value={result === null ? "—" : formatConversionResult(result)}
        />
        <UnitSelect
          id={toSelectId}
          label="в"
          value={toId}
          onChange={setToId}
          units={units}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 font-mono text-xs text-ink-soft">
        <p>
          {status === "live"
            ? `курсы обновлены: ${updatedAt}`
            : `нет свежих данных — показаны ориентировочные курсы на ${updatedAt}`}
        </p>
        <button
          type="button"
          onClick={loadRates}
          className="shrink-0 text-primary transition-colors hover:text-primary-dark"
        >
          обновить
        </button>
      </div>
    </div>
  );
}
